import { render, screen } from "@testing-library/react";
import { BackButton } from "@/shared/components/BackButton/BackButton";

describe("BackButton", () => {
  test("should render link to catalog", () => {
    render(<BackButton />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/catalog");
  });

  test("should have accessible label", () => {
    render(<BackButton />);
    const link = screen.getByLabelText("Voltar para o catálogo");
    expect(link).toBeInTheDocument();
  });

  test("should display text", () => {
    render(<BackButton />);
    expect(screen.getByText("Voltar para o catálogo")).toBeInTheDocument();
  });

  test("should display icon", () => {
    const { container } = render(<BackButton />);
    const icon = container.querySelector(".icon");
    expect(icon).toBeInTheDocument();
  });
});
