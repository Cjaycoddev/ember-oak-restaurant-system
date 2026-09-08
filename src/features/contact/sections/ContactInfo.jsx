import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

function ContactInfo() {
  const [highlightPhone, setHighlightPhone] = useState(false);

  const cards = [
    {
      icon: <MapPin size={34} />,
      title: "Visit Us",
      details: [
        "Ember & Oak Steakhouse",
        "Links Road, Nyali",
        "Mombasa, Kenya",
      ],
    },
    {
      icon: <Phone size={34} />,
      title: "Call Us",
      details: [
        "+254 768 126 967",
        "+254 729 836 734",
      ],
      id: "contact-phone",
    },
    {
      icon: <Mail size={34} />,
      title: "Email Us",
      details: [
        "reservations@emberandoak.co.ke",
        "info@emberandoak.co.ke",
      ],
    },
    {
      icon: <Clock3 size={34} />,
      title: "Opening Hours",
      details: [
        "Mon – Thu : 12:00 PM – 10:00 PM",
        "Fri – Sun : 12:00 PM – 11:30 PM",
      ],
    },
  ];

  useEffect(() => {
    if (window.location.hash !== "#contact-phone") {
      return;
    }

    const timer = setTimeout(() => {
      const phoneSection = document.getElementById("contact-phone");

      if (phoneSection) {
        phoneSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setHighlightPhone(true);

        const highlightTimer = setTimeout(() => {
          setHighlightPhone(false);
        }, 3000);

        return () => clearTimeout(highlightTimer);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#0d0d0d] py-36">
      <div className="container">

        {/* Section Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="uppercase tracking-[0.35rem] text-amber-400">
            Contact Information
          </span>

          <h2 className="mt-5 text-5xl text-white md:text-6xl">
            We're Always Happy To Help
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Whether you're planning a reservation, organising a private event
            or simply have a question, our team is here to assist you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => (
            <div
              key={card.title}
              id={card.id}
              className={`
                scroll-mt-28
                rounded-3xl
                border
                bg-zinc-900/50
                p-10
                transition-all
                duration-500
                ${
                  card.id === "contact-phone" && highlightPhone
                    ? "border-amber-400 bg-amber-400/10 shadow-[0_0_55px_rgba(245,158,11,0.35)] scale-[1.02]"
                    : "border-zinc-800"
                }
                hover:-translate-y-2
                hover:border-amber-400
                hover:shadow-[0_20px_45px_rgba(200,164,93,0.15)]
              `}
            >

              {/* Icon */}
              <div
                className={`
                  inline-flex
                  rounded-2xl
                  p-5
                  transition-all
                  duration-300
                  ${
                    card.id === "contact-phone" && highlightPhone
                      ? "bg-amber-400 text-black"
                      : "bg-amber-500/10 text-amber-400"
                  }
                  group-hover:bg-amber-400
                  group-hover:text-black
                `}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="mt-8 text-3xl text-white">
                {card.title}
              </h3>

              {/* Details */}
              <div className="mt-6 space-y-3">

                {card.details.map((line) => (
                  <p
                    key={line}
                    className={`
                      leading-8
                      transition-colors
                      duration-300
                      ${
                        card.id === "contact-phone" && highlightPhone
                          ? "text-zinc-200"
                          : "text-zinc-400"
                      }
                    `}
                  >
                    {line}
                  </p>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default ContactInfo;