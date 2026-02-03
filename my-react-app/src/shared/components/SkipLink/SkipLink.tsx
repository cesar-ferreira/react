import Link from "next/link";
import styles from "./SkipLink.module.css";

export function SkipLink() {
  return (
    <nav aria-label="Navegação rápida">
      <Link href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo principal
      </Link>
    </nav>
  );
}
