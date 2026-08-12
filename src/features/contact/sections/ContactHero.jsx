import heroImage from "../../../assets/images/contact/contact-hero.jpg";

function ContactHero() {
  return (
    <section
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(8,8,8,0.72),
          rgba(8,8,8,0.82)
        ), url(${heroImage})`,
      }}
    >
      <div className="container relative z-10 text-center">

        <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-2 text-sm uppercase tracking-[0.35rem] text-amber-400 backdrop-blur-sm">
          Contact Ember & Oak
        </span>

        <h1 className="mt-8 text-5xl font-semibold leading-tight text-white md:text-7xl">
          We'd Love To
          <br />
          Hear From You
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-zinc-300">
          Whether you're planning a romantic dinner, organising a private event,
          or simply have a question, our team is ready to assist and make every
          visit to Ember & Oak truly unforgettable.
        </p>

      </div>

      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}

export default ContactHero;