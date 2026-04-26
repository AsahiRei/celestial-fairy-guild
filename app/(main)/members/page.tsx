import ClientMembers from "./client-members";

export default function Page() {
  return (
    <>
      <section className="container mx-auto max-w-7xl px-2 flex flex-col items-center justify-center text-center pt-18 md:pt-20 lg:pt-22">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
          Guild Members
        </h1>
        <div className="w-full max-w-2xl mt-4 md:mt-8">
          <p className="text-md md:text-lg lg:text-xl text-gray-400">
            Meet the adventurers of Celestial Fairy. Our diverse team of 12
            members is ready to take on any challenge!
          </p>
        </div>
      </section>
      <ClientMembers />
    </>
  );
}
