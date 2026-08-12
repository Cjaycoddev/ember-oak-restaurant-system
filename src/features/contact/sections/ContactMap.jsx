function ContactMap() {
  return (
    <section className="bg-[#0d0d0d] py-36">
      <div className="container">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Find Us
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Visit Ember & Oak
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            Conveniently located in Nyali, Mombasa, offering an elegant
            destination for unforgettable dining experiences.
          </p>

        </div>

        <div className="overflow-hidden rounded-[2rem] border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

          <iframe
            title="Ember & Oak Location"
            src="https://www.google.com/maps?q=Nyali+Mombasa&output=embed"
            width="100%"
            height="550"
            loading="lazy"
            allowFullScreen
            className="border-0"
          ></iframe>

        </div>

      </div>
    </section>
  );
}

export default ContactMap;