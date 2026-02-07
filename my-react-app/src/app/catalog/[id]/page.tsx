import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { CatalogService } from "@/services/catalog.service";
import { BackButton } from "@/shared/components/BackButton/BackButton";
import { ItemHeader } from "@/features/catalog/components/ItemHeader/ItemHeader";
import { ItemImage } from "@/features/catalog/components/ItemImage/ItemImage";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";
import type { Metadata } from "next";

const ItemDescription = dynamic(
  () =>
    import("@/features/catalog/components/ItemDescription/ItemDescription").then(
      (mod) => ({ default: mod.ItemDescription })
    ),
  {
    loading: () => (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <LoadingSpinner size="medium" label="Carregando descrição..." />
      </div>
    ),
  }
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const items = CatalogService.getAllItems();
  return items.map((item) => ({
    id: item.id,
  }));
}

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

async function ItemDetailContent({ id }: { id: string }) {
  if (!CatalogService.itemExists(id)) {
    notFound();
  }

  const item = CatalogService.getItemById(id);

  return (
    <main id="main-content">
      <BackButton />
      <article>
        <ItemHeader item={item} />
        <ItemImage item={item} />
        <Suspense
          fallback={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <LoadingSpinner size="medium" label="Carregando descrição..." />
            </div>
          }
        >
          <ItemDescription item={item} />
        </Suspense>
      </article>
    </main>
  );
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <ProtectedRoute>
      <ItemDetailContent id={id} />
    </ProtectedRoute>
  );
}
