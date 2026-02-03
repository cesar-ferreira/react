import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  type?: "error" | "warning" | "info";
  id?: string;
}

export function ErrorMessage({
  message,
  type = "error",
  id,
}: ErrorMessageProps) {
  const role = type === "error" ? "alert" : "status";
  const ariaLive = type === "error" ? "assertive" : "polite";

  return (
    <div
      id={id}
      className={`${styles.message} ${styles[type]}`}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <span className={styles.icon} aria-hidden="true">
        {type === "error" ? "⚠️" : type === "warning" ? "⚠️" : "ℹ️"}
      </span>
      <span className={styles.text}>{message}</span>
    </div>
  );
}
