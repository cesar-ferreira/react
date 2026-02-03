import { render, screen } from "@testing-library/react";
import { CatalogCard } from "@/features/catalog/components/CatalogCard/CatalogCard";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

const mockItem: CatalogItem = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  image: "https://via.placeholder.com/400x300",
  price: 99.99,
  category: "Test Category",
  createdAt: "2024-01-01T00:00:00Z",
  rating: 4.5,
};

describe("CatalogCard", () => {
  test("should render item information", () => {
    render(<CatalogCard item={mockItem} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("R$ 99,99")).toBeInTheDocument();
  });

  test("should render rating when available", () => {
    render(<CatalogCard item={mockItem} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  test("should not render rating when not available", () => {
    const itemWithoutRating = { ...mockItem, rating: undefined };
    render(<CatalogCard item={itemWithoutRating} />);
    expect(screen.queryByText("4.5")).not.toBeInTheDocument();
  });

  test("should have link to item detail page", () => {
    render(<CatalogCard item={mockItem} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/catalog/1");
  });

  test("should format price correctly", () => {
    render(<CatalogCard item={mockItem} />);
    expect(screen.getByText("R$ 99,99")).toBeInTheDocument();
  });

  test("should use semantic HTML", () => {
    const { container } = render(<CatalogCard item={mockItem} />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });
});
