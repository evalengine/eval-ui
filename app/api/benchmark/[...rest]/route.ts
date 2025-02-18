import { NextResponse } from "next/server";
// import axios, { AxiosResponse } from "axios";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname.replaceAll("/api/benchmark", "");

    // const response = await axios.get(pathname, {
    //   baseURL: process.env.NEXT_PUBLIC_EVAL_ENGINE_BENCHMARK_API_URL,
    //   headers: {
    //     "X-API-Key": process.env.EVAL_ENGINE_ADMIN_API_KEY,
    //   }
    // });
    const response = await fetch(`${process.env.NEXT_PUBLIC_EVAL_ENGINE_BENCHMARK_API_URL}${pathname}`, {
      method: "GET",
      headers: {
        "X-API-Key": process.env.EVAL_ENGINE_ADMIN_API_KEY!,
      }
    });
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error: Response | any) {
    const data = await error.json();
    return NextResponse.json(data, { status: error.status });
  }
}

// export async function POST(req) {
//   try {
//     const url = new URL(req.url);
//     const pathname = url.pathname.replaceAll("/api/benchmark", "");
//     const response = await axios.post(pathname, req.body, {
//       baseURL: process.env.NEXT_PUBLIC_EVAL_ENGINE_BENCHMARK_API_URL,
//       headers: {
//         "X-API-Key": process.env.EVAL_ENGINE_ADMIN_API_KEY,
//       }
//     });
//     return NextResponse.json(response.data, { status: response.status });

//   } catch (error: AxiosResponse | any) {
//     return NextResponse.json(error.response.data, { status: error.status });
//   }
// }
