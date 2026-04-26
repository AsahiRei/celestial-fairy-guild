import ClientNews from "./client-news";

export default function Page() {
  return (
    <>
      <section className="container mx-auto max-w-7xl px-2 flex flex-col items-center justify-center text-center mt-20 md:mt-22 lg:mt-24">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
          News & Updates
        </h1>
        <div className="w-full max-w-2xl mt-4 md:mt-8">
          <p className="text-md md:text-lg lg:text-xl text-gray-400">
            Stay informed with the latest guild announcements, guides, and
            community highlights from Celestial Fairy.
          </p>
        </div>
      </section>
      <ClientNews />
    </>
  );
}
