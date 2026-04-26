import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celestial Fairy Guild",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-linear-to-r from-slate-950 via-slate-950 to-slate-900 text-white font-sans antialiased">{children}</body>
    </html>
  );
}
