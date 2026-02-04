"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { mockUsers } from "@/features/catalog/data/mockUsers";
import styles from "./LoginForm.module.css";

const VALID_PASSWORD = "123456";

export function LoginForm() {
  const { login } = useUser();
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedUserId) {
      setError("Por favor, selecione um usuário.");
      return;
    }

    if (!password) {
      setError("Por favor, digite a senha.");
      return;
    }

    if (password !== VALID_PASSWORD) {
      setError("Senha incorreta. A senha deve ser 123456.");
      return;
    }

    const selectedUser = mockUsers.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      login(selectedUser);
      router.push("/catalog");
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
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                setError("");
              }}
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
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Senha <span className={styles.required}>*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={styles.input}
              required
              aria-required="true"
              aria-describedby="password-hint"
              aria-invalid={error ? "true" : "false"}
            />
            <span id="password-hint" className={styles.hint}>
              Digite a senha: 123456
            </span>
          </div>
        </fieldset>
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}
