import { Link } from "react-router-dom";

// Every image shares one warm gold-duotone treatment (below) so the
// row reads as a single luxury campaign rather than six separate
// stock photos. Each URL is also pre-cropped to its tile's aspect
// ratio with crop=faces so the face stays framed regardless of shape.
const bonds = [
  {
    id: 1,
    label: "Mother",
    slug: "for-mother",
    image: "https://i.pinimg.com/736x/17/b7/89/17b78923bcf7beebb9945ef33d4e0de0.jpg",
    className:
      "md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-10",
  },
  {
    id: 2,
    label: "Wife",
    slug: "for-wife",
    image:
      "https://images.unsplash.com/photo-1585960622850-ed33c41d6418?w=1400&h=800&fit=crop&crop=faces&q=85",
    className:
      "md:col-start-2 md:row-start-1 md:col-span-3 md:row-span-5",
  },
  {
    id: 3,
    label: "Father",
    slug: "for-father",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&h=1000&fit=crop&crop=faces&q=85",
    className:
      "md:col-start-5 md:row-start-1 md:col-span-1 md:row-span-10",
  },
  {
    id: 4,
    label: "Sister",
    slug: "for-siblings",
    image:
      "https://images.unsplash.com/photo-1694062045776-f48d9b6de57e?w=1000&h=900&fit=crop&crop=faces&q=85",
    className:
      "md:col-start-2 md:row-start-6 md:col-span-2 md:row-span-5",
  },
  {
    id: 5,
    label: "Son",
    slug: "for-son",
    image:
      "https://images.unsplash.com/photo-1560605299-229f45fde3c3?w=700&h=350&fit=crop&crop=faces&q=85",
    className:
      "md:col-start-4 md:row-start-6 md:col-span-1 md:row-span-2",
  },
  {
    id: 6,
    label: "Daughter",
    slug: "for-daughter",
    image:
      "https://images.unsplash.com/photo-1497486443155-158cceb6629a?w=700&h=600&fit=crop&crop=faces&q=85",
    className:
      "md:col-start-4 md:row-start-8 md:col-span-1 md:row-span-3",
  },
];

const ShopByBond = () => {
  return (
    <section className="py-10 md:py-14 max-w-8xl mx-auto px-4 sm:px-6 bg-[#FFFFFF] text-[#2E2E2E]">

      {/* SECTION HEADER */}
      <div className="mb-8 md:mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B76E79] mb-2">
          Jewellery for every relationship
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-2 text-[#2E2E2E]">
          Shop by Bond
        </h2>
        <p className="text-sm text-[#2E2E2E]/60 max-w-lg mx-auto">
          Find a meaningful piece for someone who means the world to you
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:grid-rows-10 md:h-[600px]">
        {bonds.map((bond) => (
          <Link
            key={bond.id}
            to={`/shop/${bond.slug}`}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              h-64
              md:h-auto
              ${bond.className}
            `}
          >
            <img
              src={bond.image}
              alt={`Jewellery for ${bond.label}`}
              loading="lazy"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                object-center
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
              style={{
                filter:
                  "sepia(18%) saturate(115%) contrast(1.05) brightness(0.96)",
              }}
            />

            {/* warm gold-to-charcoal vignette, luxury campaign feel */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(46,27,17,0.8) 0%, rgba(90,44,27,0.25) 45%, rgba(183,110,45,0.08) 100%)",
              }}
            />

            <div
              className="
                absolute
                inset-0
                bg-[#B76E79]/0
                group-hover:bg-[#B76E79]/15
                transition-colors
                duration-500
              "
            />

            {/* thin gold hairline border, boutique-display feel */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#D4AF7A]/25 pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <span
                className="
                  text-[#FFFFFF]
                  font-serif
                  text-lg
                  md:text-xl
                  drop-shadow-md
                  transition-all
                  duration-300
                  group-hover:text-[#F1D8DC]
                "
              >
                {bond.label}
              </span>
              <span
                className="
                  block
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/0
                  group-hover:text-white/70
                  translate-y-2
                  group-hover:translate-y-0
                  transition-all
                  duration-300
                "
              >
                Explore collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByBond;