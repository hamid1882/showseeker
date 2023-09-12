import jwt, { Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const title =  req.url.search("title");
  const token: string | null =  req.headers.get("jwt-token");

  if (!token) {
    return NextResponse.json({ message: "JWT token is missing" }, { status: 401 });
  }

  try {
    // Verify the JWT token
    const decodedToken: string | object = jwt.verify(token, process.env.JWT_SECRET as Secret);

    // If the token is valid, you can send a different API response
    if (decodedToken) {
      // Fetch results from TV Maze API
      const url: string = `https://api.tvmaze.com/search/shows?q=${title}`;
      const response: Response = await fetch(url);
      const data: object = await response.json();

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    // If the token is invalid or expired, handle the error
    return NextResponse.json({ message: "Invalid JWT token" }, { status: 401 });
  }
}