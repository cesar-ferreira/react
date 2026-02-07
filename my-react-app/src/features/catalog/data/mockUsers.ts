import type { User } from "../types/user.types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "João Silva",
    email: "joao.silva@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    createdAt: "2023-12-01T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    createdAt: "2023-12-15T14:30:00Z",
  },
  {
    id: "user-3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "user-4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    createdAt: "2024-01-25T16:45:00Z",
  },
  {
    id: "user-5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    createdAt: "2024-02-05T11:20:00Z",
  },
];
