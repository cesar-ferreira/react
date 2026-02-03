import { NextResponse } from "next/server";
import { CatalogService } from "@/services/catalog.service";
import type { ApiResponse, ApiError } from "@/services/api.types";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

export async function GET(): Promise<
  NextResponse<ApiResponse<CatalogItem[]> | ApiError>
> {
  try {
    const items = CatalogService.getAllItems();

    return NextResponse.json(
      {
        data: items,
        status: "success",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while fetching catalog items",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
