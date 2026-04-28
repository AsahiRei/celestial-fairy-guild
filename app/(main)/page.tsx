import ClientAnimationTop from "./client-animation-top";
import ClientLatestEvents from "./client-latest-events";
import ClientLatestNews from "./client-latest-news";
import ClientAnimation from "./client-animation";

export default function Page() {
  return (
    <>
      <ClientAnimationTop />
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
          <ClientAnimation />
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
