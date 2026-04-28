import ClientAnimationJoinGuild from "./client-animation";
import ClientForm from "./client-form";

export default function Page() {
  return (
    <>
      <ClientAnimationJoinGuild />
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
