import { mockCatalogItems } from "@/features/catalog/data/mockCatalogItems";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

export class CatalogNotFoundError extends Error {
  constructor(id: string) {
    super(`Catalog item with id "${id}" not found`);
    this.name = "CatalogNotFoundError";
  }
}

export class CatalogService {
  /**
   * Retorna todos os itens do catálogo
   */
  static getAllItems(): CatalogItem[] {
    return mockCatalogItems;
  }

  /**
   * Retorna um item específico por ID
   * @throws {CatalogNotFoundError} Se o item não for encontrado
   */
  static getItemById(id: string): CatalogItem {
    const item = mockCatalogItems.find((item) => item.id === id);

    if (!item) {
      throw new CatalogNotFoundError(id);
    }

    return item;
  }

  /**
   * Verifica se um item existe
   */
  static itemExists(id: string): boolean {
    return mockCatalogItems.some((item) => item.id === id);
  }
}
