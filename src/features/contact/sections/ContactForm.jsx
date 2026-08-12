function ContactForm() {
  return (
    <section className="bg-black py-36">
      <div className="container">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Get In Touch
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            Send Us A Message
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            We'd love to hear from you. Complete the form below and our team
            will respond as soon as possible.
          </p>

        </div>

        <div className="mx-auto max-w-5xl rounded-[2rem] border border-zinc-800 bg-zinc-900/50 p-10 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-14">

          <form className="space-y-8">

            <div className="grid gap-8 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="John"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

            </div>

            <div className="grid gap-8 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="+254..."
                  className="w-full rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

            </div>

            <div>

              <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                Subject
              </label>

              <input
                type="text"
                placeholder="Reservation, Private Event, General Enquiry..."
                className="w-full rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />

            </div>

            <div>

              <label className="mb-3 block text-sm uppercase tracking-[0.2rem] text-zinc-400">
                Your Message
              </label>

              <textarea
                rows="7"
                placeholder="Write your message here..."
                className="w-full resize-none rounded-2xl border border-zinc-700 bg-black/40 px-6 py-5 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              ></textarea>

            </div>

            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-10 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)]"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default ContactForm;