import { render, screen } from "@testing-library/react";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

describe("LoadingState", () => {
  test("should render loading state with default message", () => {
    render(<LoadingState />);
    const messages = screen.getAllByText("Carregando...");
    expect(messages.length).toBeGreaterThan(0);
  });

  test("should render loading state with custom message", () => {
    render(<LoadingState message="Processando dados..." />);
    const messages = screen.getAllByText("Processando dados...");
    expect(messages.length).toBeGreaterThan(0);
  });

  test("should have status role", () => {
    render(<LoadingState />);
    const statuses = screen.getAllByRole("status");
    expect(statuses.length).toBeGreaterThan(0);
  });

  test("should have polite aria-live", () => {
    const { container } = render(<LoadingState />);
    const status = container.querySelector('[aria-live="polite"]');
    expect(status).toBeInTheDocument();
  });

  test("should apply fullPage class when specified", () => {
    const { container } = render(<LoadingState fullPage />);
    const loadingState = container.querySelector(
      '[role="status"][aria-live="polite"]'
    );
    expect(loadingState).toHaveClass("fullPage");
  });
});
