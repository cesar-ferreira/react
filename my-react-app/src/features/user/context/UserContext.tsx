"use client";

import { createContext, useContext } from "react";
import type { User } from "@/features/catalog/types/user.types";
import type { UserState, UserAction } from "./userActions";

interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
