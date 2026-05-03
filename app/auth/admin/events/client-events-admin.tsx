"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Calendar, Plus, Edit2, Trash2, X } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Events from "@/types/events";

export default function ClientEventsAdmin() {
  const supabase = createClient();
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    location: "",
    status: "upcoming",
    datetime_set: "",
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!formData.title || !formData.desc || !formData.category || !formData.location || !formData.datetime_set) {
        setError("Please fill in all required fields");
        return;
      }

      if (editingId) {
        const { error } = await supabase
          .from("events")
          .update(formData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert([formData]);
        if (error) throw error;
      }
      setFormData({
        title: "",
        desc: "",
        category: "",
        location: "",
        status: "upcoming",
        datetime_set: "",
      });
      setShowForm(false);
      setEditingId(null);
      await fetchEvents();
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save event. Please try again.");
    }
  };

  const handleEdit = (event: Events) => {
    setFormData({
      title: event.title,
      desc: event.desc,
      category: event.category,
      location: event.location,
      status: event.status,
      datetime_set: event.datetime_set,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) throw error;
        fetchEvents();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setError("");
    setFormData({
      title: "",
      desc: "",
      category: "",
      location: "",
      status: "upcoming",
      datetime_set: "",
    });
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-2 md:px-4 pt-6 pb-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto max-w-6xl"
      >
        {/* Header */}
        <motion.div
          variants={item}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
              <Calendar className="text-blue-400" />
              Events Management
            </h1>
            <p className="text-gray-400 mt-2">Create, edit, and manage guild events</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
          >
            <Plus size={18} />
            New Event
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={item}
            className="border border-red-500 bg-red-500/10 text-red-400 px-4 py-3 rounded-md mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        {showForm && (
          <motion.div
            variants={item}
            className="border border-gray-700 bg-slate-900 rounded-lg p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-800 rounded-md transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="Event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="Event category"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="Event location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.datetime_set}
                    onChange={(e) =>
                      setFormData({ ...formData, datetime_set: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="current">Current</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 min-h-[100px]"
                  placeholder="Event description"
                  required
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold rounded-md transition-colors"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Events List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                variants={item}
                className="border border-gray-700 bg-slate-900 rounded-lg p-6 hover:border-blue-900 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {event.title}
                      </h3>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        event.status === "current"
                          ? "bg-blue-500/20 text-blue-300"
                          : event.status === "completed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{event.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>📍 {event.location}</span>
                      <span>📅 {event.datetime_set}</span>
                      <span>🏷️ {event.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 bg-slate-800 hover:bg-blue-900 text-blue-400 rounded-md transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 bg-slate-800 hover:bg-red-900 text-red-400 rounded-md transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No events yet. Create one to get started!</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
