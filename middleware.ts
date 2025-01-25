import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest, response: NextResponse) {
  const url = request.nextUrl; // Get the Next.js request URL
  // const params = url.searchParams;

  // // // Add custom query parameters
  // if (!params.has("token")) {
  //   params.set("token", params.get("token") || ""); // Add or modify query parameter
  // }

  // // Construct the new URL with updated query parameters
  // url.search = params.toString();

  return NextResponse.rewrite(url); // Rewrite the request with the new URL
}

// Define the paths where this middleware should run
export const config = {
  matcher: "/:path*", // Apply to all routes
};
