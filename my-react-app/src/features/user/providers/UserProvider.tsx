"use client";

import { useReducer } from "react";
import { UserContext } from "../context/UserContext";
import { userReducer, initialState } from "../context/userReducer";
import type { User } from "@/features/catalog/types/user.types";

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
