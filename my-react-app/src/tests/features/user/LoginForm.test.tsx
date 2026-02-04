import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "@/features/user/components/LoginForm/LoginForm";
import { UserProvider } from "@/features/user/providers/UserProvider";
import { mockUsers } from "@/features/catalog/data/mockUsers";

// Mock do useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

function renderWithProvider(component: React.ReactElement) {
  return render(<UserProvider>{component}</UserProvider>);
}

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test("should render login form", () => {
    renderWithProvider(<LoginForm />);
    expect(screen.getByText("Login Simulado")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Selecionar Usuário/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha/)).toBeInTheDocument();
  });

  test("should display all mock users in select", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText(/^Selecionar Usuário/);

    mockUsers.forEach((user) => {
      expect(screen.getByText(new RegExp(user.name))).toBeInTheDocument();
    });
  });

  test("should submit form with selected user and correct password", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText(/^Selecionar Usuário/);
    const passwordInput = screen.getByLabelText(/^Senha/);
    const button = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(select, { target: { value: mockUsers[0].id } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(button);

    // O usuário deve ser logado e redirecionado
    expect(select).toHaveValue(mockUsers[0].id);
    expect(mockPush).toHaveBeenCalledWith("/catalog");
  });

  test("should show error for incorrect password", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText(/^Selecionar Usuário/);
    const passwordInput = screen.getByLabelText(/^Senha/);
    const button = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(select, { target: { value: mockUsers[0].id } });
    fireEvent.change(passwordInput, { target: { value: "wrong" } });
    fireEvent.click(button);

    expect(
      screen.getByText(/Senha incorreta. A senha deve ser 123456./)
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("should show error for empty password", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText(/^Selecionar Usuário/);
    const button = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(select, { target: { value: mockUsers[0].id } });
    fireEvent.click(button);

    expect(screen.getByText(/Por favor, digite a senha./)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("should require user selection", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText(/^Selecionar Usuário/);
    expect(select).toBeRequired();
  });

  test("should require password", () => {
    renderWithProvider(<LoginForm />);
    const passwordInput = screen.getByLabelText(/^Senha/);
    expect(passwordInput).toBeRequired();
  });
});
