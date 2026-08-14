import React from "react";
import ProductSection from "./ProductSection";
import Banner from "./banner";

// =====================================================
// PRODUCT SECTIONS
// =====================================================

const newArrivals = {
  id: 1,
  title: "New Arrivals",
  slug: "new-arrivals",

  products: [
    {
      id: 1,
      name: "Classic Gold Ring",
      price: 24999,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      rating: 4.8,
    },

    {
      id: 2,
      name: "Diamond Necklace",
      price: 18999,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      rating: 4.9,
      isPremium: true,
    },

    {
      id: 3,
      name: "Gold Bracelet",
      price: 14999,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      rating: 4.7,
    },

    {
      id: 4,
      name: "Pearl Earrings",
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      rating: 4.6,
    },
  ],
};

// =====================================================
// BEST SELLERS
// =====================================================

const bestSellers = {
  id: 2,
  title: "Best Sellers",
  slug: "best-sellers",

  products: [
    {
      id: 5,
      name: "Silver Chain",
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      rating: 4.8,
    },

    {
      id: 6,
      name: "Rose Gold Pendant",
      price: 9999,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      rating: 4.7,
    },

    {
      id: 7,
      name: "Hoop Earrings",
      price: 3999,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      rating: 4.9,
    },

    {
      id: 8,
      name: "Luxury Ring",
      price: 21999,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      rating: 5.0,
      isPremium: true,
    },
  ],
};

// =====================================================
// WEDDING COLLECTION
// =====================================================

const weddingCollection = {
  id: 3,
  title: "Wedding Collection",
  slug: "wedding-collection",

  products: [
    {
      id: 9,
      name: "Bridal Necklace",
      price: 45999,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      rating: 5.0,
      isPremium: true,
    },

    {
      id: 10,
      name: "Wedding Bangles",
      price: 28999,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      rating: 4.9,
    },

    {
      id: 11,
      name: "Diamond Ring",
      price: 35999,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      rating: 4.8,
      isPremium: true,
    },

    {
      id: 12,
      name: "Gold Earrings",
      price: 17999,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      rating: 4.7,
    },
  ],
};

// =====================================================
// BANNERS
// =====================================================

const saleBanner = {
  type: "sale",
};

const weddingBanner = {
  type: "wedding",
};

// =====================================================
// HOME BLOCKS
// =====================================================

const homeBlocks = [
  {
    id: 1,
    type: "section",
    data: newArrivals,
  },

  {
    id: 2,
    type: "banner",
    data: saleBanner,
  },

  {
    id: 3,
    type: "section",
    data: bestSellers,
  },



  {
    id: 4,
    type: "section",
    data: weddingCollection,
  },
];

// =====================================================
// HOME SECTIONS
// =====================================================

const HomeSections = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 bg-[#FFFFFF] text-[#2E2E2E]">

      {homeBlocks.map((block) => {

        // =============================================
        // PRODUCT SECTION
        // =============================================

        if (block.type === "section") {
          return (
            <ProductSection
              key={block.id}
              section={block.data}
            />
          );
        }

        // =============================================
        // BANNER
        // =============================================

        if (block.type === "banner") {
          return (
            <Banner
              key={block.id}
              type={block.data.type}
            />
          );
        }

        return null;
      })}

    </div>
  );
};

export default HomeSections;