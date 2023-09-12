import jwt, { Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { INCORRECT_PASSWORD, USER_DOES_NOT_EXIST } from "@/constants";
import { User } from "@/app/types";

export async function POST(req: Request) {
  const { email, password }: User = await req.json();

  const response = await fetch(`${process.env.BACKEND_URL}/users`);
  const users: User[] = await response.json();

  const matchedUser = users.find(
    (user: User) => user.email === email
  );

  if (matchedUser) {
    if (matchedUser.password === password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as Secret, {
        expiresIn: "1h",
      });

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json({ message: INCORRECT_PASSWORD }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: USER_DOES_NOT_EXIST }, { status: 401 });
  }
}
