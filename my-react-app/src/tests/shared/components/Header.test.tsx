import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/shared/components/Header/Header";
import { UserProvider } from "@/features/user/providers/UserProvider";
import { mockUsers } from "@/features/catalog/data/mockUsers";
import { useUser } from "@/features/user/context/UserContext";

// Mock do useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock do useUser para controlar o estado
jest.mock("@/features/user/context/UserContext", () => ({
  ...jest.requireActual("@/features/user/context/UserContext"),
  useUser: jest.fn(),
}));

function renderWithProvider(component: React.ReactElement) {
  return render(<UserProvider>{component}</UserProvider>);
}

describe("Header", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test("should not render when user is not authenticated", () => {
    (useUser as jest.Mock).mockReturnValue({
      state: { isAuthenticated: false, user: null },
      logout: jest.fn(),
    });

    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });

  test("should render when user is authenticated", () => {
    (useUser as jest.Mock).mockReturnValue({
      state: {
        isAuthenticated: true,
        user: mockUsers[0],
      },
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  test("should display user name when authenticated", () => {
    (useUser as jest.Mock).mockReturnValue({
      state: {
        isAuthenticated: true,
        user: mockUsers[0],
      },
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument();
  });

  test("should navigate to catalog when logo is clicked", () => {
    (useUser as jest.Mock).mockReturnValue({
      state: {
        isAuthenticated: true,
        user: mockUsers[0],
      },
      logout: jest.fn(),
    });

    render(<Header />);
    const logo = screen.getByText("Catálogo");
    expect(logo.closest("a")).toHaveAttribute("href", "/catalog");
  });

  test("should navigate to account when profile link is clicked", () => {
    (useUser as jest.Mock).mockReturnValue({
      state: {
        isAuthenticated: true,
        user: mockUsers[0],
      },
      logout: jest.fn(),
    });

    render(<Header />);
    const profileLink = screen.getByText("Perfil");
    expect(profileLink.closest("a")).toHaveAttribute("href", "/account");
  });

  test("should call logout and redirect when logout button is clicked", () => {
    const mockLogout = jest.fn();
    (useUser as jest.Mock).mockReturnValue({
      state: {
        isAuthenticated: true,
        user: mockUsers[0],
      },
      logout: mockLogout,
    });

    render(<Header />);
    const logoutButton = screen.getByText("Sair");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
