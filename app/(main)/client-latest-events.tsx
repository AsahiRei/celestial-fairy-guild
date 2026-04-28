"use client";
import { Calendar, Sword, Clock } from "lucide-react";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { motion, type Variants } from "motion/react";

export default function ClientUpcomingEvents() {
  const { upcomingEvents, loading, error } = useFetchEvent();
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
  if (!upcomingEvents || upcomingEvents.length === 0) {
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
    >
      {upcomingEvents.map((items) => (
        <motion.div
          key={items.id}
          variants={card}
          className="border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
        >
          <div className="w-full flex justify-between items-center">
            <div className="border border-blue-400 px-4 py-1 rounded-lg">
              <p className="font-medium text-xs text-blue-400">
                {items.category}
              </p>
            </div>
            <Sword className="text-purple-400 w-full h-auto max-w-[22px]" />
          </div>
          <h1 className="text-base lg:text-lg font-medium mt-4">
            {items.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Calendar className="w-full h-auto max-w-[14px]" />
            <p className="text-gray-400 text-sm">
              {new Date(items.datetime_set).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-full h-auto max-w-[14px]" />
            <p className="text-gray-400 text-sm">
              {new Date(items.datetime_set).toLocaleTimeString()}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}