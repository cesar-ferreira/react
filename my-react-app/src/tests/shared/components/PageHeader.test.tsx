import { render, screen } from "@testing-library/react";
import { PageHeader } from "@/shared/components/PageHeader/PageHeader";

describe("PageHeader", () => {
  test("should render title", () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("should render description when provided", () => {
    render(<PageHeader title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("should not render description when not provided", () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  test("should use semantic HTML", () => {
    const { container } = render(<PageHeader title="Test Title" />);
    const header = container.querySelector("header");
    const h1 = container.querySelector("h1");
    expect(header).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
  });
});
