import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import { CatalogCard } from "../CatalogCard/CatalogCard";
import styles from "./CatalogGrid.module.css";

interface CatalogGridProps {
  items: CatalogItem[];
}

export function CatalogGrid({ items }: CatalogGridProps) {
  if (!items || items.length === 0) {
    return (
      <section className={styles.emptyState} aria-live="polite">
        <p className={styles.empty}>Nenhum item encontrado no catálogo.</p>
      </section>
    );
  }

  return (
    <section className={styles.grid} aria-label="Lista de produtos do catálogo">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <CatalogCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
