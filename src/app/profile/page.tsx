"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, RefreshCw, UserRound } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
}

export default function ProfilePage() {
  const { data: session, error, isPending, refetch } = authClient.useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRetry() {
    setIsRefreshing(true);

    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }

  if (isPending) {
    return (
      <main
        aria-busy="true"
        className="flex flex-1 items-center justify-center bg-[#F4FAF6] px-5 py-16 sm:px-8"
      >
        <Card className="w-full max-w-2xl gap-0 overflow-hidden rounded-3xl border-[#E1EAE4] bg-white py-0 shadow-[0_24px_70px_-42px_rgba(23,43,36,0.28)]">
          <div className="h-32 bg-linear-to-r from-[#E5F4EA] via-[#F2FAF4] to-[#DDF1E4]" />
          <CardContent className="relative px-6 pb-8 sm:px-9">
            <Skeleton className="-mt-12 h-24 w-24 rounded-full ring-4 ring-white" />
            <Skeleton className="mt-5 h-7 w-48" />
            <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#F4FAF6] px-5 py-16 sm:px-8">
        <Card className="w-full max-w-lg rounded-3xl border-[#E1EAE4] bg-white text-center shadow-[0_24px_70px_-42px_rgba(23,43,36,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#172B24]">
              We couldn&apos;t load your profile
            </CardTitle>
            <CardDescription className="text-[#687970]">
              Please check your connection and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="rounded-xl bg-[#16835A] px-5 text-white hover:bg-[#166534]"
              disabled={isRefreshing}
              onClick={() => void handleRetry()}
              type="button"
            >
              <RefreshCw
                aria-hidden="true"
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Try again
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#F4FAF6] px-5 py-16 sm:px-8">
        <Card className="w-full max-w-lg rounded-3xl border-[#E1EAE4] bg-white text-center shadow-[0_24px_70px_-42px_rgba(23,43,36,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#172B24]">
              Sign in to view your profile
            </CardTitle>
            <CardDescription className="text-[#687970]">
              Your account details will appear here after you sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="rounded-xl bg-[#16835A] px-6 text-white hover:bg-[#166534]"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const name = user.name?.trim() || "Community member";
  const email = user.email || "No email address available";

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#F4FAF6] px-5 py-12 sm:px-8 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#E1F2E7] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-[#E8F4EB] blur-3xl"
      />

      <Card className="relative w-full max-w-2xl gap-0 overflow-hidden rounded-3xl border-[#E1EAE4] bg-white py-0 shadow-[0_24px_70px_-42px_rgba(23,43,36,0.3)]">
        <div
          aria-hidden="true"
          className="h-36 bg-linear-to-r from-[#DDF2E5] via-[#F0F9F3] to-[#D5EDDE] sm:h-44"
        />
        <CardContent className="px-6 pb-8 sm:px-9 sm:pb-10">
          <Avatar className="-mt-14 h-28 w-28 border-4 border-white bg-[#EAF7EF] shadow-md">
            {user.image && (
              <AvatarImage
                alt={`${name}'s profile photo`}
                referrerPolicy="no-referrer"
                src={user.image}
              />
            )}
            <AvatarFallback className="bg-[#EAF7EF] text-3xl font-bold text-[#166534]">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <CardHeader className="px-0 pt-5 pb-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#16835A]">
              Your TogetherWe account
            </p>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-[#172B24]">
              {name}
            </CardTitle>
            <CardDescription className="text-sm text-[#687970]">
              Your profile information
            </CardDescription>
          </CardHeader>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <section className="rounded-2xl border border-[#E4EDE6] bg-[#F8FBF9] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77847D]">
                <UserRound
                  aria-hidden="true"
                  className="h-4 w-4 text-[#16835A]"
                />
                Full name
              </div>
              <p className="mt-3 wrap-break-word font-semibold text-[#263B30]">
                {name}
              </p>
            </section>

            <section className="rounded-2xl border border-[#E4EDE6] bg-[#F8FBF9] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77847D]">
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4 text-[#16835A]"
                />
                Email address
              </div>
              <p className="mt-3 break-all font-semibold text-[#263B30]">
                {email}
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
