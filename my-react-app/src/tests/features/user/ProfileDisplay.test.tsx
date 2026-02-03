import { render, screen } from "@testing-library/react";
import { ProfileDisplay } from "@/features/user/components/ProfileDisplay/ProfileDisplay";
import { UserProvider } from "@/features/user/providers/UserProvider";
import { UserContext } from "@/features/user/context/UserContext";
import type { User } from "@/features/catalog/types/user.types";

const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  createdAt: "2024-01-01T00:00:00Z",
};

function renderWithUser(user: User | null) {
  const mockContextValue = {
    state: {
      user,
      isAuthenticated: !!user,
      isLoading: false,
    },
    dispatch: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    updateUser: jest.fn(),
  };

  return render(
    <UserContext.Provider value={mockContextValue}>
      <ProfileDisplay />
    </UserContext.Provider>
  );
}

describe("ProfileDisplay", () => {
  test("should render user information when user is logged in", () => {
    renderWithUser(mockUser);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("should render avatar when available", () => {
    renderWithUser(mockUser);

    const avatar = screen.getByAltText("Avatar de Test User");
    expect(avatar).toBeInTheDocument();
  });

  test("should render placeholder when no avatar", () => {
    const userWithoutAvatar = { ...mockUser, avatar: undefined };
    renderWithUser(userWithoutAvatar);

    expect(screen.getByText("TU")).toBeInTheDocument();
  });

  test("should not render when user is null", () => {
    const { container } = renderWithUser(null);
    expect(container.firstChild).toBeNull();
  });
});
