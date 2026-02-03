import { render, screen } from "@testing-library/react";
import { ItemImage } from "@/features/catalog/components/ItemImage/ItemImage";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

const mockItem: CatalogItem = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  image: "https://via.placeholder.com/400x300",
  price: 99.99,
  category: "Test Category",
  createdAt: "2024-01-01T00:00:00Z",
};

describe("ItemImage", () => {
  test("should render image with correct alt text", () => {
    render(<ItemImage item={mockItem} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
  });

  test("should have image container", () => {
    const { container } = render(<ItemImage item={mockItem} />);
    const imageContainer = container.querySelector(".container");
    expect(imageContainer).toBeInTheDocument();
  });
});
