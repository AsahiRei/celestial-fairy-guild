import ClientEvents from "./client-latest-events";
import ClientUpcomingEvents from "./client-upcoming-events";

export default function Page() {
  return (
    <>
      <section className="container mx-auto max-w-7xl px-2 flex flex-col items-center justify-center text-center mt-20 md:mt-22 lg:mt-24">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          Upcoming Events
        </h1>
        <div className="w-full max-w-2xl mt-4 md:mt-8">
          <p className="text-md md:text-lg lg:text-xl text-gray-400">
            Join our guild activities and adventures. From challenging raids to
            fun community gatherings, there's always something happening!
          </p>
        </div>
      </section>
      <section>
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Latest Events
          </h1>
          <ClientEvents />
        </div>
      </section>
      <section className="bg-slate-900/45">
        <div className="py-18 md:py-22 lg:py-24 px-2 container mx-auto max-w-7xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Upcoming Events
          </h1>
          <ClientUpcomingEvents />
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
            <button className="mt-8 px-4 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-md text-sm md:text-base font-medium">
              Join Discord
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
