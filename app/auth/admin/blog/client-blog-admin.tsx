"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { BookOpen, Plus, Edit2, Trash2, X } from "lucide-react";
import { motion, type Variants } from "motion/react";
import News from "@/types/news";

export default function ClientBlogAdmin() {
  const supabase = createClient();
  const [posts, setPosts] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "Announcement",
    author: "",
    user_id: null,
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

  const categoryColors: { [key: string]: string } = {
    Announcement: "bg-blue-500/20 text-blue-300",
    Community: "bg-purple-500/20 text-purple-300",
    Achievement: "bg-green-500/20 text-green-300",
    "Guild News": "bg-yellow-500/20 text-yellow-300",
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!formData.title || !formData.desc || !formData.author) {
        setError("Please fill in all required fields");
        return;
      }

      if (editingId) {
        const { error } = await supabase
          .from("news")
          .update(formData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([formData]);
        if (error) throw error;
      }
      setFormData({
        title: "",
        desc: "",
        category: "Announcement",
        author: "",
        user_id: null,
      });
      setShowForm(false);
      setEditingId(null);
      await fetchPosts();
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save post. Please try again.");
    }
  };

  const handleEdit = (post: News) => {
    setFormData({
      title: post.title,
      desc: post.desc,
      category: post.category,
      author: post.author,
      user_id: post.user_id,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) throw error;
        fetchPosts();
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
      category: "Announcement",
      author: "",
      user_id: null,
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
              <BookOpen className="text-blue-400" />
              Blog Posts Management
            </h1>
            <p className="text-gray-400 mt-2">Create and manage guild news & announcements</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
          >
            <Plus size={18} />
            New Post
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
                {editingId ? "Edit Post" : "Create New Post"}
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
                    placeholder="Post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="Author name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Announcement">Announcement</option>
                    <option value="Community">Community</option>
                    <option value="Achievement">Achievement</option>
                    <option value="Guild News">Guild News</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 min-h-[150px]"
                  placeholder="Post content"
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

        {/* Posts List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="border border-gray-700 bg-slate-900 rounded-lg p-6 hover:border-blue-900 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {post.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          categoryColors[post.category] || categoryColors.Announcement
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {post.desc}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>✍️ By {post.author}</span>
                      <span>
                        📅{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-slate-800 hover:bg-blue-900 text-blue-400 rounded-md transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
              <p>No blog posts yet. Create one to get started!</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
