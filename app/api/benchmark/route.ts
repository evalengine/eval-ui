import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await axios.get(body.url, {
      baseURL: process.env.NEXT_PUBLIC_EVAL_ENGINE_BENCHMARK_API_URL,
      headers: {
        "X-API-Key": process.env.EVAL_ENGINE_ADMIN_API_KEY,
      }
    });
    return NextResponse.json(response.data, { status: response.status });

  } catch (error: AxiosResponse | any) {
    return NextResponse.json(error.response.data, { status: error.status });
  }
}
