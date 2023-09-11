import jwt, { Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { USER_DOES_NOT_EXIST } from "@/constants";
import { User } from "@/app/types";


const users: User[] = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  { email: "user3@example.com", password: "password3" },
];

export async function POST(req: Request) {
  const { email, password }: User = await req.json();

  const matchedUser = users.find(
    (user: User) => user.email === email && user.password === password
  );

  if (matchedUser) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as Secret, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ message: USER_DOES_NOT_EXIST }, { status: 401 });
  }
}
