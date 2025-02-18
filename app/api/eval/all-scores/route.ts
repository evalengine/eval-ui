import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    // Forward the request
    const response = await axios.post("/api/eval/all-scores", {
      admin_key: process.env.EVAL_ENGINE_ADMIN_KEY,
    }, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
