import Link from "next/link";
import styles from "./BackButton.module.css";

export function BackButton() {
  return (
    <Link
      href="/catalog"
      className={styles.button}
      aria-label="Voltar para o catálogo"
    >
      <span className={styles.icon}>←</span>
      <span className={styles.text}>Voltar para o catálogo</span>
    </Link>
  );
}
