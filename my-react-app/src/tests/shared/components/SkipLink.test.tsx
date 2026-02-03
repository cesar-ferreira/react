import { render, screen } from "@testing-library/react";
import { SkipLink } from "@/shared/components/SkipLink/SkipLink";

describe("SkipLink", () => {
  test("should render skip link", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", {
      name: /pular para o conteúdo principal/i,
    });
    expect(link).toBeInTheDocument();
  });

  test("should have correct href", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#main-content");
  });

  test("should have navigation landmark", () => {
    render(<SkipLink />);
    const nav = screen.getByRole("navigation", { name: /navegação rápida/i });
    expect(nav).toBeInTheDocument();
  });
});
