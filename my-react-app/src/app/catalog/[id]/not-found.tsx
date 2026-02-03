import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Item não encontrado</h1>
        <p className={styles.message}>
          O item que você está procurando não existe ou foi removido do
          catálogo.
        </p>
        <Link href="/catalog" className={styles.link}>
          Voltar para o catálogo
        </Link>
      </div>
    </main>
  );
}
