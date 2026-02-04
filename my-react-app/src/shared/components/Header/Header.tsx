"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/user/context/UserContext";
import styles from "./Header.module.css";

export function Header() {
  const { state, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <div className={styles.left}>
          <Link href="/catalog" className={styles.logo}>
            Catálogo
          </Link>
        </div>
        <div className={styles.right}>
          {state.user && (
            <span
              className={styles.userName}
              aria-label={`Usuário: ${state.user.name}`}
            >
              {state.user.name}
            </span>
          )}
          <Link href="/account" className={styles.link}>
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
            aria-label="Sair da conta"
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}
