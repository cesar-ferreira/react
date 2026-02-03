import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/shared/components/ErrorMessage/ErrorMessage";

describe("ErrorMessage", () => {
  test("should render error message", () => {
    render(<ErrorMessage message="Erro ao processar" />);
    expect(screen.getByText("Erro ao processar")).toBeInTheDocument();
  });

  test("should have alert role for error type", () => {
    render(<ErrorMessage message="Erro crítico" type="error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  test("should have status role for info type", () => {
    render(<ErrorMessage message="Informação" type="info" />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  test("should have atomic aria attribute", () => {
    render(<ErrorMessage message="Mensagem" />);
    const message = screen.getByRole("alert");
    expect(message).toHaveAttribute("aria-atomic", "true");
  });

  test("should accept custom id", () => {
    render(<ErrorMessage message="Erro" id="custom-error" />);
    const message = screen.getByRole("alert");
    expect(message).toHaveAttribute("id", "custom-error");
  });
});
