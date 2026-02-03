import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import { CatalogCard } from "../CatalogCard/CatalogCard";
import styles from "./CatalogGrid.module.css";

interface CatalogGridProps {
  items: CatalogItem[];
}

export function CatalogGrid({ items }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhum item encontrado no catálogo.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <CatalogCard item={item} />
        </div>
      ))}
    </div>
  );
}
