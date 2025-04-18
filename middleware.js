import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/onboarding(.*)",
    "/organisation(.*)",
    "/project(.*)",
    "/issue(.*)",
    "/sprint(.*)"
]);

export default clerkMiddleware(async(auth, req) => {
  const authDetails = await auth();
  if (!authDetails.userId && isProtectedRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};