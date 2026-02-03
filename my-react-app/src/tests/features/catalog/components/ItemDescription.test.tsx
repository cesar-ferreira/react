import { render, screen } from "@testing-library/react";
import { ItemDescription } from "@/features/catalog/components/ItemDescription/ItemDescription";
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
  stock: 10,
};

describe("ItemDescription", () => {
  test("should render description", () => {
    render(<ItemDescription item={mockItem} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("should render section titles", () => {
    render(<ItemDescription item={mockItem} />);
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Informações Adicionais")).toBeInTheDocument();
  });

  test("should render category", () => {
    render(<ItemDescription item={mockItem} />);
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  test("should render stock when available", () => {
    render(<ItemDescription item={mockItem} />);
    expect(screen.getByText(/10 unidades/)).toBeInTheDocument();
  });

  test("should render rating when available", () => {
    render(<ItemDescription item={mockItem} />);
    expect(screen.getByText(/4.5 ⭐ de 5.0/)).toBeInTheDocument();
  });

  test("should not render stock when not available", () => {
    const itemWithoutStock = { ...mockItem, stock: undefined };
    render(<ItemDescription item={itemWithoutStock} />);
    expect(screen.queryByText(/unidades/)).not.toBeInTheDocument();
  });

  test("should use semantic HTML", () => {
    const { container } = render(<ItemDescription item={mockItem} />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });
});
