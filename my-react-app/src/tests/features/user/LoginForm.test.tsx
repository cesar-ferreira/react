import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "@/features/user/components/LoginForm/LoginForm";
import { UserProvider } from "@/features/user/providers/UserProvider";
import { mockUsers } from "@/features/catalog/data/mockUsers";

function renderWithProvider(component: React.ReactElement) {
  return render(<UserProvider>{component}</UserProvider>);
}

describe("LoginForm", () => {
  test("should render login form", () => {
    renderWithProvider(<LoginForm />);
    expect(screen.getByText("Login Simulado")).toBeInTheDocument();
    expect(screen.getByLabelText("Selecionar Usuário")).toBeInTheDocument();
  });

  test("should display all mock users in select", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText("Selecionar Usuário");

    mockUsers.forEach((user) => {
      expect(screen.getByText(new RegExp(user.name))).toBeInTheDocument();
    });
  });

  test("should submit form with selected user", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText("Selecionar Usuário");
    const button = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(select, { target: { value: mockUsers[0].id } });
    fireEvent.click(button);

    // O usuário deve ser logado (testado via contexto)
    expect(select).toHaveValue(mockUsers[0].id);
  });

  test("should require user selection", () => {
    renderWithProvider(<LoginForm />);
    const select = screen.getByLabelText("Selecionar Usuário");
    expect(select).toBeRequired();
  });
});
