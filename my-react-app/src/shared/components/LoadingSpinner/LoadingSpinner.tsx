import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  label?: string;
}

export function LoadingSpinner({
  size = "medium",
  label = "Carregando...",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]}`}
      role="status"
      aria-label={label}
    >
      <span className={styles.visuallyHidden}>{label}</span>
      <div className={styles.circle}></div>
    </div>
  );
}
