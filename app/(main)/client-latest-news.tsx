"use client";
import { Calendar } from "lucide-react";
import useFetchNews from "@/hooks/useFetchNews";
import { motion, type Variants } from "motion/react";

export default function ClientLatestNews() {
  const { featuredNews, loading, error } = useFetchNews();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const card: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

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
      <div className="mt-6 text-center text-gray-400 py-12 border border-dashed border-gray-700 rounded-lg">
        No news found
      </div>
    );
  }
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6"
    >
      {featuredNews.map((items, index) => (
        <motion.div
          key={index}
          variants={card}
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
        </motion.div>
      ))}
    </motion.div>
  );
}