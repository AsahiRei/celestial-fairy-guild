"use client";
import { Stars } from "lucide-react";
import { motion, type Variants } from "motion/react";

export default function ClientAnimationTop() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[position:70%_40%] bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/cf-bg-2.jpg')] bg-cover md:mt-1 lg:mt-2">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto max-w-6xl px-2 flex flex-col items-center justify-center text-center py-26 md:py-28 lg:py-32"
      >
        <motion.div
          variants={item}
          className="flex items-center bg-slate-800 px-4 p-1 rounded-md gap-2"
        >
          <Stars className="w-full h-auto max-w-[15px]" />
          <p className="text-sm font-medium">Recruiting members</p>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4"
        >
          Welcome to{" "}
          <span className="bg-linear-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Celestial Fairy Guild
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="w-full max-w-2xl mt-4 md:mt-8"
        >
          <p className="text-md md:text-lg lg:text-xl text-gray-400">
            A friendly and active Toram Online guild where adventurers come
            together to conquer challenges, share knowledge, and build lasting
            friendships in the world of Iruna.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center justify-center gap-4 mt-8 md:mt-12 flex-wrap"
        >
          <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base">
            Join Our Guild
          </button>
          <button className="px-4 py-2 border border-gray-600 bg-blue-950/45 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium">
            Meet Our Members
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}