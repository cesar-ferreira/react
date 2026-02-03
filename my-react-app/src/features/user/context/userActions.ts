import type { User } from "@/features/catalog/types/user.types";

export type UserAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_LOADING"; payload: boolean };

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
