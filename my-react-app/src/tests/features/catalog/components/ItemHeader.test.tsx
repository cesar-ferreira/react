import { render, screen } from "@testing-library/react";
import { ItemHeader } from "@/features/catalog/components/ItemHeader/ItemHeader";
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

describe("ItemHeader", () => {
  test("should render item title", () => {
    render(<ItemHeader item={mockItem} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("should render category", () => {
    render(<ItemHeader item={mockItem} />);
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  test("should render formatted price", () => {
    render(<ItemHeader item={mockItem} />);
    expect(screen.getByText("R$ 99,99")).toBeInTheDocument();
  });

  test("should render rating when available", () => {
    render(<ItemHeader item={mockItem} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  test("should not render rating when not available", () => {
    const itemWithoutRating = { ...mockItem, rating: undefined };
    render(<ItemHeader item={itemWithoutRating} />);
    expect(screen.queryByText("4.5")).not.toBeInTheDocument();
  });

  test("should use semantic HTML", () => {
    const { container } = render(<ItemHeader item={mockItem} />);
    const header = container.querySelector("header");
    const h1 = container.querySelector("h1");
    expect(header).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
  });
});
