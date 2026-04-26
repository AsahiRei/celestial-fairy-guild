import Navbar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const quickLinks = [
    { label: "Events", href: "/events" },
    { label: "Members", href: "/members" },
    { label: "News", href: "/news" },
  ];
  const connect = [
    { label: "Discord", href: "/" },
    { label: "Facebook", href: "/" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-14">{children}</main>
      <footer className="bg-slate-900 border-t border-gray-700 py-6">
        <div className="flex flex-wrap gap-4 items-start justify-between container mx-auto px-2 max-w-7xl border-b border-gray-700">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Celestial Fairy
            </h1>
            <p className="max-w-md mt-2 text-gray-400">
              A friendly and active Toram Online guild dedicated to helping
              players grow, conquer challenging content, and build lasting
              friendships in Iruna.
            </p>
          </div>
          <div>
            <h1 className="text-md md:text-lg lg:text-xl font-semibold">Quick Links</h1>
            <ul className="mt-2">
              {quickLinks.map((items, index) => (
                <li key={index}>
                  <a
                    href={items.href}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    {items.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-12">
            <h1 className="text-md md:text-lg lg:text-xl font-semibold">Connect</h1>
            <ul className="mt-2">
              {connect.map((items, index) => (
                <li key={index}>
                  <a
                    href={items.href}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    {items.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-7xl text-center mt-4">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ArnDev. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
