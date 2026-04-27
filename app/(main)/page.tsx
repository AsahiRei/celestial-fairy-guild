import { Calendar, Users, Trophy, Stars } from "lucide-react";
import ClientLatestEvents from "./client-latest-events";
import ClientLatestNews from "./client-latest-news";

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
  ];
  return (
    <>
      <section className="bg-[position:70%_40%] bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/cf-bg-2.jpg')] bg-cover md:mt-1 lg:mt-2">
        <div className="container mx-auto max-w-6xl px-2 flex flex-col items-center justify-center text-center py-26 md:py-28 lg:py-32">
          <div className="flex items-center bg-slate-800 px-4 p-1 rounded-md gap-2">
            <Stars className="w-full h-auto max-w-[15px]" />
            <p className="text-sm font-medium">Recruiting members</p>
          </div>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Welcome to{" "}
            <span className="bg-linear-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Celestial Fairy Guild
            </span>
          </h1>
          <div className="w-full max-w-2xl mt-4 md:mt-8">
            <p className="text-md md:text-lg lg:text-xl text-gray-400">
              A friendly and active Toram Online guild where adventurers come
              together to conquer challenges, share knowledge, and build lasting
              friendships in the world of Iruna.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-12 flex-wrap">
            <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base">
              Join Our Guild
            </button>
            <button className="px-4 py-2 border border-gray-600 bg-blue-950/45 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium">
              Meet Our Members
            </button>
          </div>
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Why Join Us?
            </h1>
            <p className="text-gray-400 mt-4">
              Discover what makes Celestial Fairy special
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
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Upcoming Events
            </h1>
            <button className="px-4 py-2 border border-gray-600 bg-slate-900 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium">
              View All Events
            </button>
          </div>
          <p className="text-gray-400 mt-4">
            Don't miss out on these exciting activities
          </p>
          <ClientLatestEvents />
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Latest News
            </h1>
            <button className="px-4 py-2 border border-gray-600 bg-slate-900 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium">
              Read All Events
            </button>
          </div>
          <p className="text-gray-400 mt-4">
            Stay updated with guild announcements
          </p>
          <ClientLatestNews />
        </div>
      </section>
      <section>
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <div className="bg-blue-950/35 py-16 px-6 rounded-lg border border-blue-800 text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Ready to Join the Adventure?
            </h1>
            <p className="mt-4 text-gray-400">
              Whether you're a seasoned veteran or just starting your journey in
              Iruna, Celestial Fairy welcomes you with open arms.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium rounded-md text-sm md:text-base">
                Apply To Join
              </button>
              <button className="px-4 py-2 border border-gray-600 bg-blue-950/45 hover:text-blue-400 cursor-pointer rounded-md text-sm md:text-base font-medium">
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
