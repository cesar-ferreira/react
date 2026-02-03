import { GET as getItems } from "@/app/api/catalog/items/route";
import { GET as getItemById } from "@/app/api/catalog/items/[id]/route";
import { CatalogService } from "@/services/catalog.service";
import { mockCatalogItems } from "@/features/catalog/data/mockCatalogItems";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

// Mock do NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      const status = init?.status || 200;
      interface MockResponse {
        json: () => Promise<unknown>;
        status: number;
        ok: boolean;
        statusText: string;
        [key: string]: unknown;
      }
      const response: MockResponse = {
        json: async () => data,
        status: status,
        ok: status < 400,
        statusText:
          status === 404
            ? "Not Found"
            : status === 400
              ? "Bad Request"
              : "OK",
      };
      // Adiciona propriedades de data sem sobrescrever status
      for (const key in data) {
        if (key !== "status") {
          response[key] = data[key];
        }
      }
      return response;
    }),
  },
}));

describe("Catalog API Endpoints", () => {
  describe("GET /api/catalog/items", () => {
    test("should return all catalog items with status 200", async () => {
      const response = await getItems();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe("success");
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.data.length).toBe(mockCatalogItems.length);
    });

    test("should return correct structure", async () => {
      const response = await getItems();
      const data = await response.json();

      expect(data).toHaveProperty("data");
      expect(data).toHaveProperty("status");
      expect(data.status).toBe("success");
    });

    test("should return all items with correct types", async () => {
      const response = await getItems();
      const data = await response.json();

      data.data.forEach((item: CatalogItem) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("category");
        expect(item).toHaveProperty("createdAt");
      });
    });
  });

  describe("GET /api/catalog/items/[id]", () => {
    test("should return item by id with status 200", async () => {
      const existingId = mockCatalogItems[0].id;
      const context = {
        params: Promise.resolve({ id: existingId }),
      };

      const mockRequest = {} as Request;
      const response = await getItemById(mockRequest, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe("success");
      expect(data.data).toHaveProperty("id", existingId);
    });

    test("should return correct item structure", async () => {
      const existingId = mockCatalogItems[0].id;
      const context = {
        params: Promise.resolve({ id: existingId }),
      };

      const mockRequest = {} as Request;
      const response = await getItemById(mockRequest, context);
      const data = await response.json();

      expect(data.data).toHaveProperty("id");
      expect(data.data).toHaveProperty("title");
      expect(data.data).toHaveProperty("description");
      expect(data.data).toHaveProperty("image");
      expect(data.data).toHaveProperty("price");
      expect(data.data).toHaveProperty("category");
      expect(data.data).toHaveProperty("createdAt");
    });

    test("should return 404 for non-existent item", async () => {
      const nonExistentId = "non-existent-id-999";
      const context = {
        params: Promise.resolve({ id: nonExistentId }),
      };

      const mockRequest = {} as Request;
      const response = await getItemById(mockRequest, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toHaveProperty("error", "Not Found");
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("statusCode", 404);
    });

    test("should return 400 for invalid id parameter", async () => {
      const context = {
        params: Promise.resolve({ id: "" }),
      };

      const mockRequest = {} as Request;
      const response = await getItemById(mockRequest, context);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error", "Bad Request");
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("statusCode", 400);
    });

    test("should return correct error structure for 404", async () => {
      const nonExistentId = "invalid-id";
      const context = {
        params: Promise.resolve({ id: nonExistentId }),
      };

      const mockRequest = {} as Request;
      const response = await getItemById(mockRequest, context);
      const data = await response.json();

      expect(data).toHaveProperty("error");
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("statusCode");
      expect(typeof data.error).toBe("string");
      expect(typeof data.message).toBe("string");
      expect(typeof data.statusCode).toBe("number");
    });
  });

  describe("Service Integration", () => {
    test("service should return all items", () => {
      const items = CatalogService.getAllItems();
      expect(items).toEqual(mockCatalogItems);
    });

    test("service should return item by id", () => {
      const existingId = mockCatalogItems[0].id;
      const item = CatalogService.getItemById(existingId);
      expect(item.id).toBe(existingId);
    });

    test("service should throw error for non-existent id", () => {
      const nonExistentId = "non-existent-id";
      expect(() => {
        CatalogService.getItemById(nonExistentId);
      }).toThrow();
    });
  });
});
