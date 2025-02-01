import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./libs/session";

const privateRoutes = ["/", "/profile-details"];
const publicRoutes = ["/login", "sign-up"]
// const neutralRoutes = ["/preview"]

export default async function middleware(req: NextRequest){
  const isProtectRoute = privateRoutes.includes(req.nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie)
  //
  if (isProtectRoute && !session?.userId){
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
  if (isPublicRoute && session?.userId){
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }
  //
  return NextResponse.next()
}