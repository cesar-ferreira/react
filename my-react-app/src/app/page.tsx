import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Aplicação Web Fullstack</h1>
        <p className={styles.description}>
          Bem-vindo à aplicação de catálogo de produtos
        </p>
        <div className={styles.ctas}>
          <Link href="/catalog" className={styles.primary}>
            Ver Catálogo
          </Link>
        </div>
      </main>
    </div>
  );
}
