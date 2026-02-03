import { CatalogService } from "@/services/catalog.service";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";
import { CatalogGrid } from "@/features/catalog/components/CatalogGrid/CatalogGrid";

export const metadata = {
  title: "Catálogo | Aplicação Web Fullstack",
  description: "Explore nosso catálogo completo de produtos",
};

export default function CatalogPage() {
  // Busca dados no build time para SSG
  const items = CatalogService.getAllItems();

  return (
    <main>
      <PageHeader
        title="Catálogo de Produtos"
        description="Explore nossa seleção completa de produtos"
      />
      <CatalogGrid items={items} />
    </main>
  );
}
