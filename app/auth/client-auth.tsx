"use client";
import { useState } from "react";
import useAdminCheck from "@/hooks/useAdminCheck";
import { useRouter } from "next/navigation";
export default function ClientAuth() {
  const [passcode, setPasscode] = useState("");
  const router = useRouter();
  const { userExists } = useAdminCheck();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exists = await userExists(Number(passcode));
    if (exists) {
      router.push("/auth/admin");
    } else {
      console.log("User does not exist");
    }
  };
  return (
    <form className="w-full max-w-md" onSubmit={handleLogin}>
      <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
        Admin Login
      </h1>
      <p className="text-gray-400">Please enter the passcode to login.</p>
      <div className="mt-8">
        <label htmlFor="passcode" className="font-medium">
          Passcode
        </label>
        <input
          id="passcode"
          type="password"
          value={passcode}
          placeholder="Enter your passcode"
          onChange={(e) => setPasscode(e.target.value)}
          className="w-full p-2 border border-gray-500 focus:border-blue-400 outline-none rounded-md"
        />
        <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base w-full mt-4">
          Login
        </button>
      </div>
    </form>
  );
}
