"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Users, Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Users_t from "@/types/users";
import Image from "next/image";

export default function ClientMembersAdmin() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<Users_t[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    level: 1,
    role: "Member",
    playstyle: "",
    guild_points: 0,
    user_img: "",
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

  const roleColors: { [key: string]: string } = {
    "Guild Master": "bg-purple-500/20 text-purple-300",
    "Vice Master": "bg-blue-500/20 text-blue-300",
    Officer: "bg-green-500/20 text-green-300",
    "Spina Dealer": "bg-yellow-500/20 text-yellow-300",
    Support: "bg-slate-500/20 text-slate-300",
    Admin: "bg-red-500/20 text-red-300",
    Member: "bg-gray-500/20 text-gray-300",
  };

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("level", { ascending: false });
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("celestial-fairy-storage")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from("celestial-fairy-storage")
        .getPublicUrl(fileName);

      setFormData({ ...formData, user_img: publicUrl.publicUrl });
      setImagePreview(publicUrl.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!formData.username || !formData.playstyle) {
        setError("Please fill in all required fields");
        return;
      }

      const dataToSubmit = {
        username: formData.username,
        level: formData.level,
        role: formData.role,
        playstyle: formData.playstyle,
        guild_points: formData.guild_points,
        ...(formData.user_img && { user_img: formData.user_img }),
      };

      if (editingId) {
        const { error } = await supabase
          .from("users")
          .update(dataToSubmit)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("users").insert([dataToSubmit]);
        if (error) throw error;
      }

      setFormData({
        username: "",
        level: 1,
        role: "Member",
        playstyle: "",
        guild_points: 0,
        user_img: "",
      });
      setImagePreview("");
      setShowForm(false);
      setEditingId(null);
      await fetchMembers();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save member. Please try again.");
    }
  };

  const handleEdit = (member: Users_t) => {
    setFormData({
      username: member.username,
      level: member.level,
      role: member.role,
      playstyle: member.playstyle,
      guild_points: member.guild_points,
      user_img: member.user_img || "",
    });
    setImagePreview(member.user_img || "");
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const { error } = await supabase.from("users").delete().eq("id", id);
        if (error) throw error;
        await fetchMembers();
      } catch (error) {
        console.error("Error deleting:", error);
        setError("Failed to delete member");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setImagePreview("");
    setError("");
    setFormData({
      username: "",
      level: 1,
      role: "Member",
      playstyle: "",
      guild_points: 0,
      user_img: "",
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
              <Users className="text-blue-400" />
              Members Management
            </h1>
            <p className="text-gray-400 mt-2">Manage guild members and their roles</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors"
          >
            <Plus size={18} />
            Add Member
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
                {editingId ? "Edit Member" : "Add New Member"}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-800 rounded-md transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Member Avatar
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    {imagePreview ? (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-700">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-md border-2 border-dashed border-gray-600 flex items-center justify-center bg-slate-800">
                        <Upload size={24} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-4 py-2 bg-slate-800 border border-gray-700 rounded-md text-gray-300 cursor-pointer hover:border-blue-400 disabled:opacity-50 transition-colors"
                    >
                      {uploading ? "Uploading..." : "Choose Image"}
                    </button>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="Member username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Level
                  </label>
                  <input
                    type="number"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                    min="1"
                    max="300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Member">Member</option>
                    <option value="Guild Master">Guild Master</option>
                    <option value="Vice Master">Vice Master</option>
                    <option value="Officer">Officer</option>
                    <option value="Spina Dealer">Spina Dealer</option>
                    <option value="Support">Support</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Guild Points
                  </label>
                  <input
                    type="number"
                    value={formData.guild_points}
                    onChange={(e) =>
                      setFormData({ ...formData, guild_points: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                    min="0"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Playstyle *
                  </label>
                  <input
                    type="text"
                    value={formData.playstyle}
                    onChange={(e) =>
                      setFormData({ ...formData, playstyle: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                    placeholder="e.g., Mage, Knight, Swordsman"
                    required
                  />
                </div>
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
                  disabled={uploading}
                  className="px-6 py-2 bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-slate-900 font-semibold rounded-md transition-colors"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Members Table */}
        <motion.div
          variants={item}
          className="border border-gray-700 bg-slate-900 rounded-lg overflow-hidden"
        >
          {members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr className="bg-slate-800">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Avatar
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Playstyle
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Guild Points
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {members.map((member) => (
                    <motion.tr
                      key={member.id}
                      variants={item}
                      className="hover:bg-slate-800 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {member.user_img ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                            <Image
                              src={member.user_img}
                              alt={member.username}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-gray-400 text-sm font-semibold">
                            {member.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {member.username}
                      </td>
                      <td className="px-6 py-4 text-blue-400">{member.level}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            roleColors[member.role] || roleColors.Member
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{member.playstyle}</td>
                      <td className="px-6 py-4 text-yellow-400">{member.guild_points}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 bg-slate-700 hover:bg-blue-900 text-blue-400 rounded-md transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="p-2 bg-slate-700 hover:bg-red-900 text-red-400 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No members yet. Add one to get started!</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}