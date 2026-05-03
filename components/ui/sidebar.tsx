"use client";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/auth/admin", icon: LayoutDashboard },
    { label: "Events", path: "/auth/admin/events", icon: Calendar },
    { label: "Members", path: "/auth/admin/members", icon: Users },
    { label: "Blog Posts", path: "/auth/admin/blog", icon: BookOpen },
  ];

  const handleBackToSite = () => {
    router.push("/");
  };

  return (
    <aside className="bg-slate-900 hidden lg:flex lg:w-64 flex-col border-r border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">
          Guild <span className="text-blue-400">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium ${
                active
                  ? "bg-blue-400 text-slate-900"
                  : "text-gray-400 hover:text-blue-400 hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleBackToSite}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:text-blue-400 hover:bg-slate-800 transition-colors font-medium"
        >
          <LogOut size={18} />
          <span>Back to Site</span>
        </button>
      </div>
    </aside>
  );
}
