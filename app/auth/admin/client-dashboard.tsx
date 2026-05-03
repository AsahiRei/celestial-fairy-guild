"use client";
import { Calendar, Users, BookOpen, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import useFetchNews from "@/hooks/useFetchNews";
import { useFetchUser } from "@/hooks/useFetchUser";
import { motion, type Variants } from "motion/react";
import { useRouter } from "next/navigation";

interface StatCard {
  title: string;
  value: number;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { events, latestEvents } = useFetchEvent();
  const { news, loading: newsLoading } = useFetchNews();
  const { users, loading: usersLoading, highestLevel, totalGuildPoints } = useFetchUser();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const stats: StatCard[] = [
    { title: "Total Events", value: events.length, icon: Calendar },
    { title: "Guild Members", value: users.length, icon: Users },
    { title: "Blog Posts", value: news.length, icon: BookOpen },
    { title: "Highest Level", value: highestLevel, icon: TrendingUp },
  ];

  const recentNews = news.slice(0, 2);

  return (
    <div className="min-h-screen px-2 md:px-4 pt-6 pb-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto max-w-6xl"
      >
        {/* Header */}
        <motion.div variants={item} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Manage your guild's events, members, and content</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="border border-gray-700 bg-slate-900 rounded-lg p-6 hover:border-blue-900 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">{stat.value}</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-md">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={item}
          className="border border-gray-700 bg-slate-900 rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/auth/admin/events")}
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
            >
              <Calendar size={18} />
              Create Event
            </button>
            <button
              onClick={() => router.push("/auth/admin/members")}
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
            >
              <Plus size={18} />
              Add Member
            </button>
            <button
              onClick={() => router.push("/auth/admin/blog")}
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
            >
              <BookOpen size={18} />
              Write Post
            </button>
            <button
              onClick={() => router.push("/auth/admin/events")}
              className="ml-auto flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              View All
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Recent Content */}
        <motion.div variants={item} className="border border-gray-700 bg-slate-900 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-8">Recent Content</h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Latest Events */}
            <motion.div variants={item}>
              <h3 className="text-lg font-medium text-white mb-4">Latest Events</h3>
              <div className="space-y-3">
                {latestEvents.length > 0 ? (
                  latestEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="bg-slate-800 border border-gray-700 rounded-md p-4 hover:border-blue-900 hover:bg-slate-750 transition-colors cursor-pointer group"
                    >
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={14} className="text-gray-500" />
                        <p className="text-gray-400 text-sm">{event.datetime_set}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No events yet</p>
                )}
              </div>
            </motion.div>

            {/* Latest Members */}
            <motion.div variants={item}>
              <h3 className="text-lg font-medium text-white mb-4">Latest Members</h3>
              <div className="space-y-3">
                {users.length > 0 ? (
                  users.slice(0, 2).map((member) => (
                    <div
                      key={member.id}
                      className="bg-slate-800 border border-gray-700 rounded-md p-4 hover:border-blue-900 hover:bg-slate-750 transition-colors cursor-pointer group"
                    >
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {member.username}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Level {member.level} {member.playstyle}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No members yet</p>
                )}
              </div>
            </motion.div>

            {/* Latest Posts */}
            <motion.div variants={item}>
              <h3 className="text-lg font-medium text-white mb-4">Latest Posts</h3>
              <div className="space-y-3">
                {recentNews.length > 0 ? (
                  recentNews.map((post) => (
                    <div
                      key={post.id}
                      className="bg-slate-800 border border-gray-700 rounded-md p-4 hover:border-blue-900 hover:bg-slate-750 transition-colors cursor-pointer group"
                    >
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={14} className="text-gray-500" />
                        <p className="text-gray-400 text-sm">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No posts yet</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
