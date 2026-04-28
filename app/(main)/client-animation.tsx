"use client";
import { Calendar, Users, Trophy } from "lucide-react";
import { motion, type Variants } from "motion/react";

export default function ClientAnimation() {
  const whyJoinUs = [
    {
      title: "Active Community",
      desc: "Join 50+ active members ready to help you progress through the game.",
      icons: (
        <Users className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
    {
      title: "Weekly Events",
      desc: "Participate in boss raids, leveling parties, and fun community activities.",
      icons: (
        <Calendar className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
    {
      title: "End-Game Content",
      desc: "Take on the toughest challenges with experienced players by your side.",
      icons: (
        <Trophy className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const card: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
    >
      {whyJoinUs.map((items, index) => (
        <motion.div
          key={index}
          variants={card}
          className="border border-gray-700 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
        >
          <div className="bg-blue-800/35 p-3 rounded-lg">{items.icons}</div>
          <h1 className="text-base lg:text-lg font-medium mt-4">
            {items.title}
          </h1>
          <p className="text-gray-400 text-sm mt-4">{items.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}