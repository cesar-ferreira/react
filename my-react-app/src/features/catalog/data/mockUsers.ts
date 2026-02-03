import type { User } from "../types/user.types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "João Silva",
    email: "joao.silva@example.com",
    avatar: "https://via.placeholder.com/150?text=JS",
    createdAt: "2023-12-01T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    avatar: "https://via.placeholder.com/150?text=MS",
    createdAt: "2023-12-15T14:30:00Z",
  },
  {
    id: "user-3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "user-4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    avatar: "https://via.placeholder.com/150?text=AC",
    createdAt: "2024-01-25T16:45:00Z",
  },
  {
    id: "user-5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    createdAt: "2024-02-05T11:20:00Z",
  },
];
