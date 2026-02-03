import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import styles from "./LoadingState.module.css";

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingState({
  message = "Carregando...",
  fullPage = false,
}: LoadingStateProps) {
  const containerClass = fullPage
    ? `${styles.container} ${styles.fullPage}`
    : styles.container;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <LoadingSpinner size="large" label={message} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
