"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import styles from "./ProfileForm.module.css";

export function ProfileForm() {
  const { state, updateUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (state.user) {
      setName(state.user.name);
      setEmail(state.user.email);
      setAvatar(state.user.avatar || "");
    }
  }, [state.user]);

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateUser({
      name: name.trim(),
      email: email.trim(),
      avatar: avatar.trim() || undefined,
    });

    setSuccessMessage("Perfil atualizado com sucesso!");
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    if (state.user) {
      setName(state.user.name);
      setEmail(state.user.email);
      setAvatar(state.user.avatar || "");
    }
    setErrors({});
    setIsEditing(false);
    setSuccessMessage("");
  };

  if (!state.user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Editar Perfil</h2>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            Editar
          </button>
        )}
      </div>

      {successMessage && (
        <div className={styles.successMessage} role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className={styles.error} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.error} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="avatar" className={styles.label}>
            URL do Avatar (opcional)
          </label>
          <input
            type="url"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            disabled={!isEditing}
            className={styles.input}
            placeholder="https://exemplo.com/avatar.jpg"
          />
        </div>

        {isEditing && (
          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
