
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import navLogo from "../../../public/images/logo_navbar.png";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Navbar() {
  const { data:session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
      toast.success("Logout successfully.")
    } catch (error) {
      toast.error(`Failed to sign out. ${error}`);
    }
  };

  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100/70 bg-[#F0FDF4]/90 shadow-[0_8px_25px_-15px_rgba(22,101,52,0.35)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#166534] text-white shadow-md shadow-green-900/15">
            <Image
              src={navLogo}
              alt=""
              className="h-11 w-11 rounded-xl object-contain"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#166534] sm:text-2xl">
            Together<span className="text-[#16A36A]">We</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <Link
            href="/upcoming-events"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#172B24] transition-all duration-200 hover:bg-green-100 hover:text-[#166534]"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Right Side - Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-2 hover:bg-green-100">
                <Avatar className="h-9 w-9 border-2 border-green-200">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image || ""}
                  />
                  <AvatarFallback className="bg-green-100 font-semibold text-[#166534]">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="font-semibold text-[#172B24]">
                  {user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem>
                  <div className="flex flex-col justify-center items-center rounded-xl bg-[#D9F0E2] px-3 py-1">
                    <h2 className="font-bold">{user.name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link href="/add-event" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Add Event
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <UserRound className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    void handleSignOut();
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="rounded-full bg-[#166534] px-7 font-semibold text-white hover:bg-[#16A36A]">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-md text-[#166534] transition-colors hover:bg-green-100">
              <Menu size={25} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-70 border-green-100 bg-[#F0FDF4] sm:w-[320px]"
            >
              <div className="mt-10 flex flex-col gap-5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-xl font-bold text-[#166534]"
                >
                  <Image
                    src={navLogo}
                    alt=""
                    className="h-8 w-8 rounded-md object-contain"
                  />
                  TogetherWe
                </Link>

                <div className="h-px bg-green-200" />

                <div className="flex flex-col justify-center items-center rounded-xl bg-[#D9F0E2] px-3 py-1">
                  <h2 className="font-bold">{user?.name}</h2>
                  <h3>{user?.email}</h3>
                </div>

                <div className="h-px bg-green-200" />

                <Link
                  href="/upcoming-events"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-[#172B24] transition hover:bg-green-100 hover:text-[#166534]"
                >
                  Upcoming Events
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/add-event"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 font-medium text-[#172B24] hover:bg-green-100"
                    >
                      Add Event
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 font-medium text-[#172B24] hover:bg-green-100"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 font-medium text-[#172B24] hover:bg-green-100"
                    >
                      My Profile
                    </Link>

                    <Button
                      onClick={async () => {
                        setOpen(false);
                        await handleSignOut();
                      }}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="w-full rounded-full bg-[#166534] text-white hover:bg-[#16A36A]">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
