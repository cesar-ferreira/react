import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import styles from "./ItemDescription.module.css";

interface ItemDescriptionProps {
  item: CatalogItem;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ItemDescription({ item }: ItemDescriptionProps) {
  return (
    <div className={styles.container}>
      <section className={styles.description}>
        <h2 className={styles.sectionTitle}>Descrição</h2>
        <p className={styles.text}>{item.description}</p>
      </section>

      <section className={styles.details}>
        <h2 className={styles.sectionTitle}>Informações Adicionais</h2>
        <dl className={styles.detailList}>
          <div className={styles.detailItem}>
            <dt className={styles.detailTerm}>Categoria:</dt>
            <dd className={styles.detailValue}>{item.category}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailTerm}>Data de Criação:</dt>
            <dd className={styles.detailValue}>{formatDate(item.createdAt)}</dd>
          </div>
          {item.stock !== undefined && (
            <div className={styles.detailItem}>
              <dt className={styles.detailTerm}>Estoque:</dt>
              <dd className={styles.detailValue}>
                {item.stock > 0 ? `${item.stock} unidades` : "Esgotado"}
              </dd>
            </div>
          )}
          {item.rating !== undefined && (
            <div className={styles.detailItem}>
              <dt className={styles.detailTerm}>Avaliação:</dt>
              <dd className={styles.detailValue}>{item.rating} ⭐ de 5.0</dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  );
}
