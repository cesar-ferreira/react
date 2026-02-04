"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/user/context/UserContext";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/");
    }
  }, [state.isAuthenticated, router]);

  if (!state.isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <LoadingSpinner size="large" label="Verificando autenticação..." />
      </div>
    );
  }

  return <>{children}</>;
}
