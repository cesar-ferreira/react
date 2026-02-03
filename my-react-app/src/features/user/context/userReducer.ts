import type { UserAction, UserState } from "./userActions";

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "UPDATE_USER":
      if (!state.user) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
