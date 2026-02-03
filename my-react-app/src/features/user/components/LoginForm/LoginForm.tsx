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
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.visuallyHidden}>
            Seleção de usuário para login
          </legend>
          <div className={styles.field}>
            <label htmlFor="user-select" className={styles.label}>
              Selecionar Usuário <span className={styles.required}>*</span>
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className={styles.select}
              required
              aria-required="true"
              aria-describedby="user-select-hint"
            >
              <option value="">Selecione um usuário...</option>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            <span id="user-select-hint" className={styles.hint}>
              Escolha um usuário da lista para fazer login (autenticação
              simulada)
            </span>
          </div>
        </fieldset>
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}
