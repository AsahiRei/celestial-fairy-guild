"use client";
import { Calendar, Sword, Clock } from "lucide-react";
import { useFetchEvent } from "@/hooks/useFetchEvent";

export default function ClientUpcomingEvents() {
  const { upcomingEvents, loading, error } = useFetchEvent();
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
      <div className="text-center text-gray-400 py-12">No events found.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {upcomingEvents.map((items) => (
        <div
          key={items.id}
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
              {" "}
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
        </div>
      ))}
    </div>
  );
}
