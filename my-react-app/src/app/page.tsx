import Link from "next/link";
import { CatalogService } from "@/services/catalog.service";
import { CatalogGrid } from "@/features/catalog/components/CatalogGrid/CatalogGrid";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";
import styles from "./page.module.css";

export default function Home() {
  // SSG: Busca dados no build time para renderização estática
  const allItems = CatalogService.getAllItems();
  // Preview dos primeiros 6 produtos na Home
  const featuredItems = allItems.slice(0, 6);

  return (
    <div className={styles.page}>
      <main id="main-content" className={styles.main}>
        <PageHeader
          title="Aplicação Web Fullstack"
          description="Bem-vindo à aplicação de catálogo de produtos"
        />
        <div className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
          <CatalogGrid items={featuredItems} />
          <div className={styles.ctas}>
            <Link href="/catalog" className={styles.primary}>
              Ver Catálogo Completo
            </Link>
            <Link href="/account" className={styles.secondary}>
              Minha Conta
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
