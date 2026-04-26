"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import useFetchNews from "@/hooks/useFetchNews";

export default function ClientNews() {
  const { news, featuredNews, loading, error } = useFetchNews();
  const [activeCategory, setActiveCategory] = useState("All Post");
  const buttonTabs = [
    { label: "All Post" },
    { label: "Announcement" },
    { label: "Community" },
    { label: "Achievement" },
  ];
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
  const filteredNews = news?.filter((item) => {
    return (
      activeCategory === "All Post" ||
      item.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  });
  return (
    <>
      <section>
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Feature News
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {featuredNews.map((items, index) => (
              <div
                key={index}
                className="select-none border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
              >
                <div className="border border-blue-400 px-4 py-1 rounded-lg">
                  <p className="font-medium text-xs text-blue-400">
                    {items.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
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
                <div className="flex items-center justify-between w-full mt-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder-icon.jpg"
                      alt={items.author}
                      className="w-full h-auto rounded-full max-w-[40px]"
                    />
                    {items.author}
                  </div>
                  <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base mt-4">
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="py-2 md:py-4 lg:py-8 px-2 container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 flex-wrap">
            {buttonTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(tab.label)}
                className={`px-4 py-2 border border-gray-600 
                ${activeCategory === tab.label ? "bg-blue-500 text-white" : "bg-blue-950/45"}
                hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="py-18 md:py-20 lg:py-22 px-2 container mx-auto max-w-7xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            All Post
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredNews.map((items, index) => (
              <div
                key={index}
                className="select-none border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
              >
                <div className="border border-blue-400 px-4 py-1 rounded-lg">
                  <p className="font-medium text-xs text-blue-400">
                    {items.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
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
                <div className="flex items-center justify-between w-full mt-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder-icon.jpg"
                      alt={items.author}
                      className="w-full h-auto rounded-full max-w-[40px]"
                    />
                    {items.author}
                  </div>
                  <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base mt-4">
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
