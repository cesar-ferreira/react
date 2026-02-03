"use client";

import { useUser } from "@/features/user/context/UserContext";
import { LoginForm } from "@/features/user/components/LoginForm/LoginForm";
import { ProfileDisplay } from "@/features/user/components/ProfileDisplay/ProfileDisplay";
import { ProfileForm } from "@/features/user/components/ProfileForm/ProfileForm";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";
import styles from "./page.module.css";

export default function AccountPage() {
  const { state, logout } = useUser();

  return (
    <main>
      <PageHeader
        title={state.isAuthenticated ? "Minha Conta" : "Área do Usuário"}
        description={
          state.isAuthenticated
            ? "Gerencie suas informações pessoais"
            : "Faça login para acessar sua conta"
        }
      />

      {state.isAuthenticated ? (
        <div className={styles.authenticatedContent}>
          <ProfileDisplay />
          <ProfileForm />
          <div className={styles.logoutContainer}>
            <button onClick={logout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
