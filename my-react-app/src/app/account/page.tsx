"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useUser } from "@/features/user/context/UserContext";
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
  const { state } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/");
    }
  }, [state.isAuthenticated, router]);

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <main id="main-content">
      <PageHeader
        title="Minha Conta"
        description="Gerencie suas informações pessoais"
      />

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
              <LoadingSpinner size="medium" label="Carregando formulário..." />
            </div>
          }
        >
          <ProfileForm />
        </Suspense>
      </div>
    </main>
  );
}
