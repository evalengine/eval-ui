import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  try {
    const username = "Eval_Engine";
    const url = `https://nitter.net/${username}`;

    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const body = await response.text();

    const $ = cheerio.load(body);

    const tweetIDs = new Set(); // Use Set to remove duplicates
    // https://nitter.net/Eval_Engine/status/1883885172485144863#m
    // console.log($("a[href^='/Eval_Engine/status/']"));
    $(`a[href^='/${username}/status/']`).each((i, el) => {
      const href = $(el).attr("href") as string;
      const tweetID = href.split("/").pop() as string;
      tweetIDs.add(tweetID.replace("#m", ""));
    });

    return NextResponse.json(Array.from(tweetIDs), { status: 200 });

  } catch (error: AxiosResponse | any) {
    return NextResponse.json([
      "1892152477002465456",
      "1887129973389144460",
      "1884271244146847860",
      "1883894767723090006",
      "1883885172485144863",
      "1891427803515834642",
      "1888905911693168698",
      "1887818591455588517",
      "1886348410586096049",
      "1884597437886800056",
      "1884261969043284085"
    ], { status: 200 });
  }
}
