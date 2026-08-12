import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need a reservation?",
    answer:
      "Reservations are recommended, especially during weekends and public holidays, to guarantee your preferred dining time.",
  },
  {
    question: "Do you cater for private events?",
    answer:
      "Yes. We host birthdays, anniversaries, corporate dinners and private celebrations in our exclusive dining spaces.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes. Complimentary secure parking is available for all our guests.",
  },
  {
    question: "Do you offer vegetarian options?",
    answer:
      "Absolutely. Our menu includes a selection of vegetarian dishes prepared with the same premium quality ingredients.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-black py-36">
      <div className="container max-w-4xl">

        <div className="mb-20 text-center">

          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-5xl text-white">
            Have Questions?
          </h2>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="flex w-full items-center justify-between px-8 py-6 text-left transition hover:bg-zinc-800"
              >
                <span className="text-xl text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  size={24}
                  className={`transition ${
                    open === index ? "rotate-180 text-amber-400" : "text-zinc-400"
                  }`}
                />
              </button>

              {open === index && (
                <div className="border-t border-zinc-800 px-8 py-6 text-lg leading-8 text-zinc-400">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;