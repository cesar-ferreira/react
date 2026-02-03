import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";

describe("LoadingSpinner", () => {
  test("should render spinner with default label", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status", { name: /carregando/i });
    expect(spinner).toBeInTheDocument();
  });

  test("should render spinner with custom label", () => {
    render(<LoadingSpinner label="Processando..." />);
    const spinner = screen.getByRole("status", { name: /processando/i });
    expect(spinner).toBeInTheDocument();
  });

  test("should have accessible label", () => {
    render(<LoadingSpinner label="Aguardando resposta" />);
    const spinner = screen.getByLabelText("Aguardando resposta");
    expect(spinner).toBeInTheDocument();
  });

  test("should apply size classes", () => {
    const { container } = render(<LoadingSpinner size="large" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass("large");
  });
});
