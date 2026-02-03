import { notFound } from "next/navigation";
import { CatalogService } from "@/services/catalog.service";
import { BackButton } from "@/shared/components/BackButton/BackButton";
import { ItemHeader } from "@/features/catalog/components/ItemHeader/ItemHeader";
import { ItemImage } from "@/features/catalog/components/ItemImage/ItemImage";
import { ItemDescription } from "@/features/catalog/components/ItemDescription/ItemDescription";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ISR: Revalida a cada 1 hora (3600 segundos)
export const revalidate = 3600;

// Gera paths estáticos para todos os itens no build time
export async function generateStaticParams() {
  const items = CatalogService.getAllItems();
  return items.map((item) => ({
    id: item.id,
  }));
}

// Gera metadados dinâmicos para SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const item = CatalogService.getItemById(id);
    return {
      title: `${item.title} | Catálogo`,
      description: item.description,
    };
  } catch {
    return {
      title: "Item não encontrado | Catálogo",
      description: "O item solicitado não foi encontrado no catálogo",
    };
  }
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!CatalogService.itemExists(id)) {
    notFound();
  }

  const item = CatalogService.getItemById(id);

  return (
    <main>
      <BackButton />
      <article>
        <ItemHeader item={item} />
        <ItemImage item={item} />
        <ItemDescription item={item} />
      </article>
    </main>
  );
}
