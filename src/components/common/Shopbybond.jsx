import { Link } from "react-router-dom";

const bonds = [
  {
    id: 1,
    label: "Mother",
    slug: "for-mother",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    className:
      "md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-10",
  },
  {
    id: 2,
    label: "Wife",
    slug: "for-wife",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    className:
      "md:col-start-2 md:row-start-1 md:col-span-3 md:row-span-5",
  },
  {
    id: 3,
    label: "Father",
    slug: "for-father",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    className:
      "md:col-start-5 md:row-start-1 md:col-span-1 md:row-span-10",
  },
  {
    id: 4,
    label: "Sister",
    slug: "for-siblings",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    className:
      "md:col-start-2 md:row-start-6 md:col-span-2 md:row-span-5",
  },
  {
    id: 5,
    label: "Son",
    slug: "for-son",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    className:
      "md:col-start-4 md:row-start-6 md:col-span-1 md:row-span-2",
  },
  {
    id: 6,
    label: "Daughter",
    slug: "for-daughter",
    image:
      "https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=600&q=80",
    className:
      "md:col-start-4 md:row-start-8 md:col-span-1 md:row-span-3",
  },
];

const ShopByBond = () => {
  return (
    <section className="py-10 max-w-8xl mx-auto px-6 bg-[#FFFFFF] text-[#2E2E2E]">
      {/* =========================
          SECTION HEADER
      ========================== */}

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif mb-2 text-[#2E2E2E]">
          Shop by Bond
        </h2>

        <p className="text-sm text-[#2E2E2E]/60">
          Find the perfect piece for someone who means the world to you
        </p>
      </div>

      {/* =========================
          BENTO GRID
      ========================== */}

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
            {/* IMAGE */}

            <img
              src={bond.image}
              alt={bond.label}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />

            {/* SOFT ROSE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#2E2E2E]/70
                via-[#2E2E2E]/10
                to-transparent
              "
            />

            {/* LABEL */}

            <span
              className="
                absolute
                bottom-3
                left-4
                text-[#FFFFFF]
                font-serif
                text-lg
                drop-shadow-sm
                transition-all
                duration-300
                group-hover:text-[#D8A7AF]
              "
            >
              {bond.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByBond;