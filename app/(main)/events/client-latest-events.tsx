"use client";
import { Map, Clock, Calendar } from "lucide-react";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { motion, type Variants } from "motion/react";

export default function ClientLatestEvents() {
  const { latestEvents, loading, error } = useFetchEvent();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 25 },
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

  if (!latestEvents || latestEvents.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-400 py-12 border border-dashed border-gray-700 rounded-lg">
        No latest events found
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
    >
      {latestEvents.map((items) => (
        <motion.div
          variants={item}
          className="select-none border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
          key={items.id}
        >
          <div className="border border-blue-400 px-4 py-1 rounded-lg">
            <p className="font-medium text-xs text-blue-400">
              {items.category}
            </p>
          </div>

          <h1 className="text-base lg:text-lg font-medium mt-4">
            {items.title}
          </h1>

          <p className="text-gray-400 text-sm mt-2">{items.desc}</p>

          <div className="grid grid-cols-2 gap-2 w-full mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-full h-auto max-w-[14px]" />
              <p className="text-gray-400 text-sm">
                {new Date(items.datetime_set).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-full h-auto max-w-[14px]" />
              <p className="text-gray-400 text-sm">
                {new Date(items.datetime_set).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Map className="w-full h-auto max-w-[14px]" />
              <p className="text-gray-400 text-sm">{items.location}</p>
            </div>
          </div>

          <button className="font-medium bg-blue-400 hover:bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg mt-4">
            View Details
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}