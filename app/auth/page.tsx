import type { Metadata } from "next";
import ClientAuth from "./client-auth";

export const metadata: Metadata = {
  title: "Celestial Fairy Guild - Authentication",
};

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col">
        <header className="px-2 md:px-4 lg:px-6 py-4">
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
        </header>
        <main className="flex-1 px-2 flex items-center justify-center">
          <ClientAuth />
        </main>
        <footer className="py-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ArnDev. All rights reserved.
          </p>
        </footer>
      </div>
      <div className="bg-[url('/auth-bg.jpg')] bg-cover bg-center lg:col-span-2 hidden lg:block"></div>
    </div>
  );
}
