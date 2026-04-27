"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { List } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navlinks = [
    { label: "Home", href: "/" },
    { label: "Members", href: "/members" },
    { label: "Events", href: "/events" },
    { label: "News", href: "/news" },
  ];
  const link = (path: string) =>
    `font-medium ${
      pathname === path ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
    }`;
  return (
    <>
      <header className="bg-slate-900/45 border-b border-gray-700 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
        <nav className="container mx-auto py-3 px-2 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/cf-logo.png"
              alt="cf-logo"
              className="w-full h-auto rounded-full max-w-[30px] md:max-w-[35px] lg:max-w-[40px]"
            />
            <a
              href="/"
              className="font-semibold text-lg md:text-xl lg:2xl bg-linear-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              CelestialFairy
            </a>
          </div>
          <ul className="lg:flex items-center space-x-6 hidden">
            {navlinks.map((items, index) => (
              <li key={index}>
                <Link href={items.href} className={link(items.href)}>
                  {items.label}
                </Link>
              </li>
            ))}
            <li>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-1 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-md font-medium"
                  onClick={() => router.push("/joinguild")}
                >
                  Join Guild
                </button>
                <button
                  className="px-4 py-1 border border-gray-600 bg-slate-900 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium"
                  onClick={() => router.push("/auth")}
                >
                  Admin Login
                </button>
              </div>
            </li>
          </ul>
          <button
            className="px-2 py-2 rounded-md bg-blue-400 hover:bg-blue-500 cursor-pointer lg:hidden block"
            onClick={() => setOpen(!isOpen)}
          >
            <List className="w-full h-auto max-w-[15px]" />
          </button>
        </nav>
      </header>
      {isOpen && (
        <div className="lg:hidden block fixed top-14 left-0 bg-slate-900/45 backdrop-blur-md w-full rounded-b-xl border-b border-gray-700">
          <div className="container mx-auto max-w-7xl py-4 px-2">
            <ul className="space-y-6">
              {navlinks.map((items, index) => (
                <li key={index}>
                  <Link href={items.href} className={link(items.href)}>
                    {items.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="px-4 py-1 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-md font-medium"
                  onClick={() => router.push("/joinguild")}
                >
                  Join Guild
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
