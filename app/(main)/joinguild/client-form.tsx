"use client";
import { useState } from "react";
import { motion } from "motion/react";

export default function ClientForm() {
  const [inGameName, setInGameName] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [discordTag, setDiscordTag] = useState("");

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-4 py-6 mt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="font-medium">Ingame Name *</label>
          <input
            type="text"
            value={inGameName}
            onChange={(e) => setInGameName(e.target.value)}
            placeholder="In game name"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="font-medium">Current Level *</label>
          <input
            type="text"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            placeholder="Current level"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="font-medium">Discord Tag *</label>
          <input
            type="text"
            value={discordTag}
            onChange={(e) => setDiscordTag(e.target.value)}
            placeholder="Discord tag"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 w-full bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
      >
        Submit
      </motion.button>
    </motion.form>
  );
}