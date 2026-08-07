import React from "react";
import ProductSection from "./ProductSection";

const sections = [
  {
    id: 1,
    title: "New Arrivals",
    slug: "new-arrivals",
    products: [
      {
        id: 1,
        name: "Classic Gold Ring",
        price: 24999,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Diamond Necklace",
        price: 18999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        rating: 4.9,
      },
      {
        id: 3,
        name: "Gold Bracelet",
        price: 14999,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
        rating: 4.7,
      },
      {
        id: 4,
        name: "Pearl Earrings",
        price: 8999,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        rating: 4.6,
      },
    ],
  },

  {
    id: 2,
    title: "Best Sellers",
    slug: "best-sellers",
    products: [
      {
        id: 5,
        name: "Silver Chain",
        price: 5999,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        rating: 4.8,
      },
      {
        id: 6,
        name: "Rose Gold Pendant",
        price: 9999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        rating: 4.7,
      },
      {
        id: 7,
        name: "Hoop Earrings",
        price: 3999,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
        rating: 4.9,
      },
      {
        id: 8,
        name: "Luxury Ring",
        price: 21999,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        rating: 5.0,
      },
       {
        id: 9,
        name: "Luxury Ring",
        price: 21999,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        rating: 5.0,
      },
    ],
  },

  {
    id: 3,
    title: "Wedding Collection",
    slug: "wedding-collection",
    products: [
      {
        id: 9,
        name: "Bridal Necklace",
        price: 45999,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        rating: 5.0,
      },
      {
        id: 10,
        name: "Wedding Bangles",
        price: 28999,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        rating: 4.9,
      },
      {
        id: 11,
        name: "Diamond Ring",
        price: 35999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        rating: 4.8,
      },
      {
        id: 12,
        name: "Gold Earrings",
        price: 17999,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        rating: 4.7,
      },
      {
        id: 13,
        name: "Gold Earrings",
        price: 17999,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        rating: 4.7,
      },
    ],
  },
];

const HomeSections = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 text-[#5a1b1be0]">
      {sections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
    </div>
  );
};

export default HomeSections;