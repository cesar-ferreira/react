"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/features/user/context/UserContext";
import { LoginForm } from "@/features/user/components/LoginForm/LoginForm";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import styles from "./page.module.css";

// Lazy load de componentes não críticos
const ProfileDisplay = dynamic(
  () =>
    import("@/features/user/components/ProfileDisplay/ProfileDisplay").then(
      (mod) => ({ default: mod.ProfileDisplay })
    ),
  {
    loading: () => (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <LoadingSpinner size="medium" label="Carregando perfil..." />
      </div>
    ),
    ssr: false,
  }
);

const ProfileForm = dynamic(
  () =>
    import("@/features/user/components/ProfileForm/ProfileForm").then(
      (mod) => ({
        default: mod.ProfileForm,
      })
    ),
  {
    loading: () => (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <LoadingSpinner size="medium" label="Carregando formulário..." />
      </div>
    ),
    ssr: false,
  }
);

export default function AccountPage() {
  const { state, logout } = useUser();

  return (
    <main id="main-content">
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
          <Suspense
            fallback={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <LoadingSpinner size="medium" label="Carregando perfil..." />
              </div>
            }
          >
            <ProfileDisplay />
          </Suspense>
          <Suspense
            fallback={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <LoadingSpinner
                  size="medium"
                  label="Carregando formulário..."
                />
              </div>
            }
          >
            <ProfileForm />
          </Suspense>
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
