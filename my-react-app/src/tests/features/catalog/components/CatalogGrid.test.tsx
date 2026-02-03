import { render, screen } from "@testing-library/react";
import { CatalogGrid } from "@/features/catalog/components/CatalogGrid/CatalogGrid";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

const mockItems: CatalogItem[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    image: "https://via.placeholder.com/400x300",
    price: 99.99,
    category: "Category 1",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description 2",
    image: "https://via.placeholder.com/400x300",
    price: 199.99,
    category: "Category 2",
    createdAt: "2024-01-02T00:00:00Z",
  },
];

describe("CatalogGrid", () => {
  test("should render all items", () => {
    render(<CatalogGrid items={mockItems} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("should render empty message when no items", () => {
    render(<CatalogGrid items={[]} />);
    expect(
      screen.getByText("Nenhum item encontrado no catálogo.")
    ).toBeInTheDocument();
  });

  test("should have correct role attributes", () => {
    const { container } = render(<CatalogGrid items={mockItems} />);
    const list = container.querySelector('[role="list"]');
    expect(list).toBeInTheDocument();
  });
});
