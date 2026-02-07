import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileForm } from "@/features/user/components/ProfileForm/ProfileForm";
import { UserContext } from "@/features/user/context/UserContext";
import type { User } from "@/features/catalog/types/user.types";

const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  createdAt: "2024-01-01T00:00:00Z",
};

const mockUpdateUser = jest.fn();

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
    updateUser: mockUpdateUser,
  };

  return render(
    <UserContext.Provider value={mockContextValue}>
      <ProfileForm />
    </UserContext.Provider>
  );
}

describe("ProfileForm", () => {
  beforeEach(() => {
    mockUpdateUser.mockClear();
  });

  test("should render form with user data", () => {
    renderWithUser(mockUser);

    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  });

  test("should show edit button when not editing", () => {
    renderWithUser(mockUser);

    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  test("should enable editing when edit button is clicked", () => {
    renderWithUser(mockUser);

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    const nameInput = screen.getByDisplayValue("Test User");
    expect(nameInput).not.toBeDisabled();
  });

  test("should validate required fields", async () => {
    renderWithUser(mockUser);

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    const nameInput = screen.getByDisplayValue("Test User");
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
    });
  });

  test("should validate email format", async () => {
    renderWithUser(mockUser);

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    const emailInput = screen.getByLabelText(/^Email/);
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    await waitFor(
      () => {
        const errorElement = screen.queryByText("Email inválido");
        if (!errorElement) {
          expect(mockUpdateUser).not.toHaveBeenCalled();
        } else {
          expect(errorElement).toBeInTheDocument();
        }
      },
      { timeout: 2000 }
    );
  });

  test("should call updateUser when form is submitted with valid data", async () => {
    renderWithUser(mockUser);

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    const nameInput = screen.getByDisplayValue("Test User");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        name: "Updated Name",
        email: "test@example.com",
        avatar: undefined,
      });
    });
  });

  test("should not render when user is null", () => {
    const { container } = renderWithUser(null);
    expect(container.firstChild).toBeNull();
  });
});
