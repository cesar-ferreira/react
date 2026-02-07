export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  createdAt: string;
  rating?: number;
  stock?: number;
}
