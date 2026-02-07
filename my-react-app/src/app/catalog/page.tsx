import { CatalogService } from "@/services/catalog.service";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";
import { CatalogGrid } from "@/features/catalog/components/CatalogGrid/CatalogGrid";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";

export const metadata = {
  title: "Catálogo | Aplicação Web Fullstack",
  description: "Explore nosso catálogo completo de produtos",
};

function CatalogContent() {
  const items = CatalogService.getAllItems();

  return (
    <main id="main-content">
      <PageHeader
        title="Catálogo de Produtos"
        description="Explore nossa seleção completa de produtos"
      />
      <CatalogGrid items={items} />
    </main>
  );
}

export default function CatalogPage() {
  return (
    <ProtectedRoute>
      <CatalogContent />
    </ProtectedRoute>
  );
}
