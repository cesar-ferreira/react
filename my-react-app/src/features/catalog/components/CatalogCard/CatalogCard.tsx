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
      <Link
        href={`/catalog/${item.id}`}
        className={styles.link}
        aria-label={`Ver detalhes de ${item.title}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={item.image}
            alt={`Imagem de ${item.title}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.content}>
          <div
            className={styles.category}
            aria-label={`Categoria: ${item.category}`}
          >
            {item.category}
          </div>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.footer}>
            <div
              className={styles.price}
              aria-label={`Preço: ${formatPrice(item.price)}`}
            >
              {formatPrice(item.price)}
            </div>
            {item.rating !== undefined && (
              <div
                className={styles.rating}
                aria-label={`Avaliação: ${item.rating} de 5 estrelas`}
              >
                <span className={styles.ratingValue}>{item.rating}</span>
                <span className={styles.ratingIcon} aria-hidden="true">
                  ⭐
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
