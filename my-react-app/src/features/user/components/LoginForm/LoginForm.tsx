"use client";

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { mockUsers } from "@/features/catalog/data/mockUsers";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const { login } = useUser();
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUserId) return;

    const selectedUser = mockUsers.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      login(selectedUser);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login Simulado</h2>
      <p className={styles.description}>
        Selecione um usuário para fazer login (autenticação simulada)
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="user-select" className={styles.label}>
            Selecionar Usuário
          </label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className={styles.select}
            required
            aria-required="true"
          >
            <option value="">Selecione um usuário...</option>
            {mockUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}
