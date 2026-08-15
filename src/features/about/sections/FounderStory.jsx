import storyImage from "../../../assets/images/interiors/interior-2.jpg";

function FounderStory() {
  return (
    <section className="bg-[#0b0b0b] py-36">
      <div className="container">
        <div className="grid items-center gap-20 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Image */}
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 h-full w-full rounded-3xl border border-amber-400/20"></div>

            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={storyImage}
                alt="Warm and elegant Ember & Oak dining atmosphere"
                className="h-[620px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Story */}
          <div>
            <span className="uppercase tracking-[0.35rem] text-amber-400">
              Before Ember &amp; Oak
            </span>

            <h2 className="mt-5 text-5xl font-semibold leading-tight text-white md:text-6xl">
              It Started With
              <br />
              A Love For Cooking
            </h2>

            <div className="mt-9 space-y-6 text-lg leading-9 text-zinc-400">
              <p>
                Long before there was a restaurant, there was a kitchen, a
                growing curiosity about food and a dream of becoming a chef.
                Cooking began as something to learn, experiment with and
                eventually master.
              </p>

              <p>
                The journey was far from easy. There were recipes that failed,
                long days spent learning, limited resources and plenty of
                moments when the dream seemed much bigger than the reality.
                But every setback became another lesson.
              </p>

              <p>
                Instead of walking away, the decision was to keep learning.
                Every dish became an opportunity to improve. Every customer
                became an opportunity to understand what makes food memorable.
              </p>

              <p className="text-zinc-300">
                The goal was never simply to serve food. It was to create
                something people would remember.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FounderStory;