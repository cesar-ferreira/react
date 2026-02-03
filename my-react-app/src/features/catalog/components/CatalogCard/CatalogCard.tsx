import Image from "next/image";
import Link from "next/link";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import styles from "./CatalogCard.module.css";

interface CatalogCardProps {
  item: CatalogItem;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function CatalogCard({ item }: CatalogCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/catalog/${item.id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.category}>{item.category}</div>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.footer}>
            <div className={styles.price}>{formatPrice(item.price)}</div>
            {item.rating !== undefined && (
              <div className={styles.rating}>
                <span className={styles.ratingValue}>{item.rating}</span>
                <span className={styles.ratingIcon}>⭐</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
