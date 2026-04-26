import {
  Calendar,
  Users,
  Trophy,
  Heart,
  MessageCircle,
  Star,
  CheckCircle,
} from "lucide-react";
import ClientForm from "./client-form";

export default function Page() {
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
    {
      title: "Newbie Friendly",
      desc: "New to Toram? We have guides and mentors to help you get started.",
      icons: (
        <Heart className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
    {
      title: "Active Discord",
      desc: "Stay connected with guild chat, voice channels, and resource sharing.",
      icons: (
        <MessageCircle className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
    {
      title: "Guild Perks",
      desc: "Access to guild storage, buffs, and exclusive member-only events.",
      icons: (
        <Star className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
      ),
    },
  ];
  const requirements = [
    "Be active at least 3 days per week",
    "Have a positive and respectful attitude",
    "Join our Discord server for communication",
    "Participate in at least one guild event per month",
    "No minimum level requirement - all are welcome!",
  ];
  return (
    <>
      <section className="container mx-auto max-w-6xl px-2 flex flex-col items-center justify-center text-center py-26 md:py-28 lg:py-32">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
          Join{" "}
          <span className="bg-linear-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Celestial Fairy Guild
          </span>
        </h1>
        <div className="w-full max-w-2xl mt-4 md:mt-8">
          <p className="text-md md:text-lg lg:text-xl text-gray-400">
            Begin your journey with a guild that values community, growth, and
            adventure. Whether you are a veteran or just starting out, there is
            a place for you here.
          </p>
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Why Choose Us?
            </h1>
            <p className="text-gray-400 mt-4">
              Here is what you get when you join Celestial Fairy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {whyJoinUs.map((items, index) => (
              <div
                key={index}
                className="border border-gray-700 bg-slate-900 rounded-lg px-6 py-6 flex items-start flex-col"
              >
                <div className="bg-blue-800/35 p-3 rounded-lg">
                  {items.icons}
                </div>
                <h1 className="text-base lg:text-lg font-medium mt-4">
                  {items.title}
                </h1>
                <p className="text-gray-400 text-sm mt-4">{items.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Requirements
              </h1>
              <p className="text-gray-400 mt-4">
                We keep our requirements simple because we believe everyone
                deserves a chance to be part of something great.
              </p>
              <div className="flex gap-4 flex-col mt-6">
                {requirements.map((items, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="text-blue-300 w-full h-auto max-w-[20px] md:max-w-[25px] lg:max-w-[30px]" />
                    <p className="font-medium">{items}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-950/35 py-6 px-6 rounded-lg border border-blue-800 text-center">
              <img src="/cf-bg.jpg" alt="cf-bg" className="rounded-xl" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Apply Now
            </h1>
            <p className="text-gray-400 mt-4">
              Fill out the form below and we will get back to you within 24-48
              hours
            </p>
          </div>
          <ClientForm/>
        </div>
      </section>
    </>
  );
}
