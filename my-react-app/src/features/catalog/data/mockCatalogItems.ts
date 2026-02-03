import type { CatalogItem } from "../types/catalog.types";

export const mockCatalogItems: CatalogItem[] = [
  {
    id: "1",
    title: "Notebook Gamer Pro",
    description:
      "Notebook de alta performance com processador Intel i7, 16GB RAM, SSD 512GB e placa de vídeo dedicada RTX 3060. Ideal para jogos e trabalho pesado.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    price: 4599.99,
    category: "Eletrônicos",
    createdAt: "2024-01-15T10:30:00Z",
    rating: 4.5,
    stock: 12,
  },
  {
    id: "2",
    title: "Smartphone Premium",
    description:
      "Smartphone com tela AMOLED de 6.7 polegadas, câmera tripla de 108MP, bateria de 5000mAh e carregamento rápido de 65W.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    price: 3299.99,
    category: "Eletrônicos",
    createdAt: "2024-01-20T14:15:00Z",
    rating: 4.8,
    stock: 25,
  },
  {
    id: "3",
    title: "Fone de Ouvido Bluetooth",
    description:
      "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30 horas e qualidade de som Hi-Fi.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    price: 599.99,
    category: "Áudio",
    createdAt: "2024-02-01T09:00:00Z",
    rating: 4.3,
    stock: 50,
  },
  {
    id: "4",
    title: "Smartwatch Fitness",
    description:
      "Relógio inteligente com monitoramento de saúde, GPS integrado, resistente à água e bateria de 7 dias.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    price: 899.99,
    category: "Wearables",
    createdAt: "2024-02-05T11:20:00Z",
    rating: 4.6,
    stock: 30,
  },
  {
    id: "5",
    title: "Tablet Profissional",
    description:
      "Tablet com tela de 12.9 polegadas, processador M2, 256GB de armazenamento e suporte para caneta stylus.",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    price: 5499.99,
    category: "Eletrônicos",
    createdAt: "2024-02-10T16:45:00Z",
    rating: 4.7,
    stock: 8,
  },
  {
    id: "6",
    title: "Câmera DSLR",
    description:
      "Câmera profissional com sensor full-frame de 24MP, gravação em 4K e lente kit 18-55mm incluída.",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    price: 3899.99,
    category: "Fotografia",
    createdAt: "2024-02-15T13:30:00Z",
    rating: 4.4,
    stock: 15,
  },
  {
    id: "7",
    title: "Teclado Mecânico RGB",
    description:
      "Teclado mecânico com switches Cherry MX, iluminação RGB personalizável e construção em alumínio.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    price: 449.99,
    category: "Periféricos",
    createdAt: "2024-02-20T10:00:00Z",
    rating: 4.5,
    stock: 40,
  },
  {
    id: "8",
    title: "Mouse Gamer",
    description:
      "Mouse gamer com sensor óptico de 16000 DPI, 8 botões programáveis e iluminação RGB.",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    price: 299.99,
    category: "Periféricos",
    createdAt: "2024-02-25T15:15:00Z",
    rating: 4.2,
    stock: 60,
  },
  {
    id: "9",
    title: "Monitor 4K UltraWide",
    description:
      "Monitor curvo de 34 polegadas com resolução 4K, taxa de atualização de 144Hz e tecnologia HDR.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    price: 3499.99,
    category: "Monitores",
    createdAt: "2024-03-01T09:30:00Z",
    rating: 4.9,
    stock: 10,
  },
  {
    id: "10",
    title: "Caixa de Som Bluetooth",
    description:
      "Caixa de som portátil com som estéreo de 360°, bateria de 20 horas e à prova d'água IPX7.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    price: 399.99,
    category: "Áudio",
    createdAt: "2024-03-05T11:00:00Z",
    rating: 4.1,
    stock: 35,
  },
  {
    id: "11",
    title: "SSD NVMe 1TB",
    description:
      "SSD de alta velocidade com interface NVMe, leitura de 3500MB/s e escrita de 3000MB/s.",
    image:
      "https://images.unsplash.com/photo-1587825147138-346d229db8d8?w=400&h=300&fit=crop",
    price: 599.99,
    category: "Armazenamento",
    createdAt: "2024-03-10T14:20:00Z",
    rating: 4.6,
    stock: 45,
  },
  {
    id: "12",
    title: "Webcam Full HD",
    description:
      "Webcam com resolução Full HD 1080p, microfone estéreo integrado e ajuste automático de luz.",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
    price: 249.99,
    category: "Periféricos",
    createdAt: "2024-03-15T10:45:00Z",
    rating: 4.0,
    stock: 55,
  },
  {
    id: "13",
    title: "Roteador Wi-Fi 6",
    description:
      "Roteador de última geração com Wi-Fi 6, velocidade de até 6000Mbps e cobertura de até 300m².",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: 799.99,
    category: "Rede",
    createdAt: "2024-03-20T13:00:00Z",
    rating: 4.4,
    stock: 20,
  },
  {
    id: "14",
    title: "Impressora Multifuncional",
    description:
      "Impressora jato de tinta com scanner, copiadora e fax integrados. Compatível com Wi-Fi e impressão móvel.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop",
    price: 1299.99,
    category: "Impressão",
    createdAt: "2024-03-25T16:30:00Z",
    rating: 3.9,
    stock: 18,
  },
  {
    id: "15",
    title: "Placa de Vídeo RTX 4070",
    description:
      "Placa de vídeo de alta performance com 12GB GDDR6X, ray tracing e DLSS 3.0 para jogos em 4K.",
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    price: 4299.99,
    category: "Hardware",
    createdAt: "2024-04-01T09:15:00Z",
    rating: 4.7,
    stock: 5,
  },
];
