import { NextResponse } from "next/server";
import {
  CatalogService,
  CatalogNotFoundError,
} from "@/services/catalog.service";
import type { ApiResponse, ApiError } from "@/services/api.types";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<NextResponse<ApiResponse<CatalogItem> | ApiError>> {
  try {
    const { id } = await context.params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid item ID parameter",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    const item = CatalogService.getItemById(id);

    return NextResponse.json(
      {
        data: item,
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof CatalogNotFoundError) {
      return NextResponse.json(
        {
          error: "Not Found",
          message: error.message,
          statusCode: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while fetching catalog item",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
