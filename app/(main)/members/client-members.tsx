"use client";
import { useState } from "react";
import { useFetchUser } from "@/hooks/useFetchUser";

export default function ClientMembers() {
  const { users, loading, error, highestLevel, totalGuildPoints } = useFetchUser();
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  const buttonTabs = [
    { label: "All" },
    { label: "Guild Master" },
    { label: "Vice Master" },
    { label: "Officer" },
    { label: "Spina Dealer" },
  ];
  const roleColor = (role: string) => {
    if (role == "Guild Master") return "bg-purple-400";
    if (role == "Vice Master") return "bg-blue-400";
    if (role == "Officer") return "bg-green-400";
    if (role == "Spina Dealer") return "bg-yellow-400";
    if (role == "Support") return "bg-slate-400";
  };
  const guildStats = [
    { label: "Total Members", value: users?.length || 0 },
    { label: "Highest Level", value: highestLevel || 0 },
    { label: "Guild Points", value: totalGuildPoints || 0 },
  ];
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      (user.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (user.role || "").toLowerCase().includes(search.toLowerCase()) ||
      (user.playstyle || "").toLowerCase().includes(search.toLowerCase());

    const matchesRole = activeRole === "All" || user.role === activeRole;
    return matchesSearch && matchesRole;
  });
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
  return (
    <>
      <section className="container mx-auto max-w-7xl pb-26 md:pb-28 lg:pb-32 px-2">
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {guildStats.map((stat, index) => (
            <div
              key={index}
              className="border border-gray-700 bg-slate-900 rounded-lg px-6 py-8"
            >
              <h1 className="text-3xl font-bold text-blue-400">{stat.value}</h1>
              <p className="mt-2 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="container mx-auto max-w-7xl py-6 px-2 flex justify-center lg:justify-between items-center flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-600 py-2 px-4 rounded-lg w-full max-w-lg outline-1 border-0 outline-gray-600 focus:outline-blue-400"
          />
          <div className="flex items-center gap-2 flex-wrap">
            {buttonTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveRole(tab.label)}
                className={`px-4 py-2 border border-gray-600 
                ${activeRole === tab.label ? "bg-blue-500 text-white" : "bg-blue-950/45"}
                hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-18 md:py-20 lg:py-22">
        <div className="w-full overflow-x-auto container mx-auto max-w-7xl px-2">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="bg-blue-950/45">
              <tr className="text-left">
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2">Level</th>
                <th className="border border-gray-600 px-4 py-2">Role</th>
                <th className="border border-gray-600 px-4 py-2">
                  Guild Points
                </th>
                <th className="border border-gray-600 px-4 py-2">Playstyle</th>
                <th className="border border-gray-600 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filteredUsers?.length ?? 0) === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center border border-gray-600 px-4 py-6 text-gray-400"
                  >
                    No {activeRole !== "All" ? activeRole : "members"} found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((items, index) => (
                  <tr key={index}>
                    <td className="border border-gray-600 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder-icon.jpg"
                          alt={items.username || "user"}
                          className="w-full h-auto rounded-full max-w-[40px]"
                        />
                        {items.username}
                      </div>
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {items.level}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      <div className="flex">
                        <div
                          className={`${roleColor(items.role)} px-2 py-1 block rounded-md font-medium`}
                        >
                          {items.role}
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {(items.guild_points || 0).toLocaleString()}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {items.playstyle}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      <div className="flex">
                        <button className="px-2 py-1 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm">
                          View Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}