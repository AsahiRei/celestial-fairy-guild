"use client";
import { Calendar } from "lucide-react";
import useFetchNews from "@/hooks/useFetchNews";

export default function ClientLatestNews() {
  const { featuredNews, loading, error } = useFetchNews();
  if (loading) {
    return <div className="text-center text-gray-400 py-12">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        Error: {error.message}
      </div>
    );
  }
  if (!featuredNews || featuredNews.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">No news found.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {featuredNews.map((items, index) => (
        <div
          key={index}
          className="select-none border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-full h-auto max-w-[14px]" />
            <p className="text-gray-400 text-sm">
              {new Date(items.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <h1 className="text-base lg:text-lg font-medium mt-2">
            {items.title}
          </h1>
          <p className="text-gray-400 text-sm mt-2">{items.desc}</p>
        </div>
      ))}
    </div>
  );
}
