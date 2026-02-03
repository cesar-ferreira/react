import { userReducer, initialState } from "@/features/user/context/userReducer";
import type { User } from "@/features/catalog/types/user.types";

const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  createdAt: "2024-01-01T00:00:00Z",
};

describe("userReducer", () => {
  test("should return initial state when state is undefined", () => {
    const state = userReducer(undefined as unknown as UserState, {
      type: "SET_LOADING",
      payload: false,
    });
    expect(state).toEqual(initialState);
  });

  test("should handle LOGIN action", () => {
    const action = { type: "LOGIN" as const, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test("should handle LOGOUT action", () => {
    const loggedInState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    };
    const action = { type: "LOGOUT" as const };
    const state = userReducer(loggedInState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  test("should handle UPDATE_USER action", () => {
    const loggedInState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    };
    const action = {
      type: "UPDATE_USER" as const,
      payload: { name: "Updated Name" },
    };
    const state = userReducer(loggedInState, action);

    expect(state.user?.name).toBe("Updated Name");
    expect(state.user?.email).toBe(mockUser.email);
    expect(state.isAuthenticated).toBe(true);
  });

  test("should not update user if not logged in", () => {
    const action = {
      type: "UPDATE_USER" as const,
      payload: { name: "Updated Name" },
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  test("should handle SET_LOADING action", () => {
    const action = { type: "SET_LOADING" as const, payload: true };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });
});
