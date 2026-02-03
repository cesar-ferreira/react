import { mockUsers } from "../../features/catalog/data/mockUsers";
import type { User } from "../../features/catalog/types/user.types";

describe("Users Data Integrity", () => {
  describe("Structure and Types", () => {
    test("should have at least 3 users", () => {
      expect(mockUsers.length).toBeGreaterThanOrEqual(3);
    });

    test("all users should have required fields", () => {
      mockUsers.forEach((user) => {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("createdAt");
      });
    });

    test("all users should have correct types", () => {
      mockUsers.forEach((user: User) => {
        expect(typeof user.id).toBe("string");
        expect(typeof user.name).toBe("string");
        expect(typeof user.email).toBe("string");
        expect(typeof user.createdAt).toBe("string");
      });
    });

    test("all IDs should be unique", () => {
      const ids = mockUsers.map((user) => user.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test("all IDs should be non-empty strings", () => {
      mockUsers.forEach((user) => {
        expect(user.id).toBeTruthy();
        expect(user.id.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Data Validation", () => {
    test("all names should be non-empty strings", () => {
      mockUsers.forEach((user) => {
        expect(user.name).toBeTruthy();
        expect(user.name.trim().length).toBeGreaterThan(0);
      });
    });

    test("all emails should be valid email format", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      mockUsers.forEach((user) => {
        expect(user.email).toMatch(emailRegex);
      });
    });

    test("all emails should be non-empty strings", () => {
      mockUsers.forEach((user) => {
        expect(user.email).toBeTruthy();
        expect(user.email.trim().length).toBeGreaterThan(0);
      });
    });

    test("all createdAt should be valid ISO date strings", () => {
      mockUsers.forEach((user) => {
        expect(user.createdAt).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
        );
        const date = new Date(user.createdAt);
        expect(date.getTime()).not.toBeNaN();
      });
    });
  });

  describe("Optional Fields", () => {
    test("avatar should be a string when present", () => {
      mockUsers.forEach((user) => {
        if (user.avatar !== undefined) {
          expect(typeof user.avatar).toBe("string");
          expect(user.avatar.length).toBeGreaterThan(0);
        }
      });
    });

    test("some users should have avatar and some should not", () => {
      const usersWithAvatar = mockUsers.filter(
        (user) => user.avatar !== undefined
      );
      const usersWithoutAvatar = mockUsers.filter(
        (user) => user.avatar === undefined
      );
      expect(usersWithAvatar.length).toBeGreaterThan(0);
      expect(usersWithoutAvatar.length).toBeGreaterThan(0);
    });
  });

  describe("Data Variety", () => {
    test("should have users with different names", () => {
      const names = new Set(mockUsers.map((user) => user.name));
      expect(names.size).toBe(mockUsers.length);
    });

    test("should have users with different emails", () => {
      const emails = new Set(mockUsers.map((user) => user.email));
      expect(emails.size).toBe(mockUsers.length);
    });
  });
});
