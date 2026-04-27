"use client";
import { useState } from "react";

export default function ClientForm() {
  const [inGameName, setInGameName] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  return (
    <form className="border border-gray-700 hover:border-blue-900 bg-slate-900 rounded-lg px-4 py-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className="font-medium">Ingame Name *</label>
          <input
            type="text"
            value={inGameName}
            onChange={(e) => setInGameName(e.target.value)}
            placeholder="In game name"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="font-medium">Current Level *</label>
          <input
            type="text"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            placeholder="Current level"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="font-medium">Discord Tag *</label>
          <input
            type="text"
            value={discordTag}
            onChange={(e) => setDiscordTag(e.target.value)}
            placeholder="Discord tag"
            className="mt-1 w-full bg-slate-800 py-2 px-4 rounded-md border border-gray-700 outline-none focus:border-blue-400"
          />
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer">
        Submit
      </button>
    </form>
  );
}
