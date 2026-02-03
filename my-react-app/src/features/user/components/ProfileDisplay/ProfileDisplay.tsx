"use client";

import Image from "next/image";
import { useUser } from "../../context/UserContext";
import styles from "./ProfileDisplay.module.css";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ProfileDisplay() {
  const { state } = useUser();

  if (!state.user) {
    return null;
  }

  const { user } = state;

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            width={120}
            height={120}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.date}>Membro desde {formatDate(user.createdAt)}</p>
      </div>
    </div>
  );
}
