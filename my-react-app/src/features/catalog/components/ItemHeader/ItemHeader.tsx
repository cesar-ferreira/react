import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import styles from "./ItemHeader.module.css";

interface ItemHeaderProps {
  item: CatalogItem;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function ItemHeader({ item }: ItemHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.category}>{item.category}</div>
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.meta}>
        <div className={styles.price}>{formatPrice(item.price)}</div>
        {item.rating !== undefined && (
          <div className={styles.rating}>
            <span className={styles.ratingValue}>{item.rating}</span>
            <span className={styles.ratingIcon}>⭐</span>
          </div>
        )}
      </div>
    </header>
  );
}
