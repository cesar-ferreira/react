import { mockCatalogItems } from "../../features/catalog/data/mockCatalogItems";
import type { CatalogItem } from "../../features/catalog/types/catalog.types";

describe("Catalog Data Integrity", () => {
  describe("Structure and Types", () => {
    test("should have at least 10 items", () => {
      expect(mockCatalogItems.length).toBeGreaterThanOrEqual(10);
    });

    test("all items should have required fields", () => {
      mockCatalogItems.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("category");
        expect(item).toHaveProperty("createdAt");
      });
    });

    test("all items should have correct types", () => {
      mockCatalogItems.forEach((item: CatalogItem) => {
        expect(typeof item.id).toBe("string");
        expect(typeof item.title).toBe("string");
        expect(typeof item.description).toBe("string");
        expect(typeof item.image).toBe("string");
        expect(typeof item.price).toBe("number");
        expect(typeof item.category).toBe("string");
        expect(typeof item.createdAt).toBe("string");
      });
    });

    test("all IDs should be unique", () => {
      const ids = mockCatalogItems.map((item) => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test("all IDs should be non-empty strings", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.id.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Data Validation", () => {
    test("all prices should be positive numbers", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.price).toBeGreaterThan(0);
        expect(Number.isFinite(item.price)).toBe(true);
      });
    });

    test("all titles should be non-empty strings", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.title).toBeTruthy();
        expect(item.title.trim().length).toBeGreaterThan(0);
      });
    });

    test("all descriptions should be non-empty strings", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.description).toBeTruthy();
        expect(item.description.trim().length).toBeGreaterThan(0);
      });
    });

    test("all images should be valid URLs (strings)", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.image).toBeTruthy();
        expect(typeof item.image).toBe("string");
      });
    });

    test("all categories should be non-empty strings", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.category).toBeTruthy();
        expect(item.category.trim().length).toBeGreaterThan(0);
      });
    });

    test("all createdAt should be valid ISO date strings", () => {
      mockCatalogItems.forEach((item) => {
        expect(item.createdAt).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
        );
        const date = new Date(item.createdAt);
        expect(date.getTime()).not.toBeNaN();
      });
    });
  });

  describe("Optional Fields", () => {
    test("rating should be between 0 and 5 when present", () => {
      mockCatalogItems.forEach((item) => {
        if (item.rating !== undefined) {
          expect(item.rating).toBeGreaterThanOrEqual(0);
          expect(item.rating).toBeLessThanOrEqual(5);
        }
      });
    });

    test("stock should be a non-negative number when present", () => {
      mockCatalogItems.forEach((item) => {
        if (item.stock !== undefined) {
          expect(item.stock).toBeGreaterThanOrEqual(0);
          expect(Number.isInteger(item.stock)).toBe(true);
        }
      });
    });
  });

  describe("Data Variety", () => {
    test("should have items from multiple categories", () => {
      const categories = new Set(mockCatalogItems.map((item) => item.category));
      expect(categories.size).toBeGreaterThan(1);
    });

    test("should have items with different price ranges", () => {
      const prices = mockCatalogItems.map((item) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      expect(maxPrice).toBeGreaterThan(minPrice);
    });
  });
});
