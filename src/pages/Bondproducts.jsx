import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import ProductCard from "../components/common/ProductCard";

const products = [
  {
    id: 1,
    name: "Men's Gold Chain",
    price: 28999,
    rating: 4.8,
    bond: "for-husband",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 2,
    name: "Gold Bracelet",
    price: 15999,
    rating: 4.7,
    bond: "for-husband",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: 3,
    name: "Wedding Ring",
    price: 39999,
    rating: 5,
    bond: "for-husband",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 4,
    name: "Diamond Necklace",
    price: 55999,
    rating: 4.9,
    bond: "for-wife",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
  },
  {
    id: 5,
    name: "Gold Earrings",
    price: 18999,
    rating: 4.8,
    bond: "for-wife",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  {
    id: 6,
    name: "Pearl Necklace",
    price: 24999,
    rating: 4.7,
    bond: "for-mother",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
  },
  {
    id: 7,
    name: "Silver Chain",
    price: 8999,
    rating: 4.6,
    bond: "for-father",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 8,
    name: "Kids Bracelet",
    price: 3999,
    rating: 4.5,
    bond: "for-children",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  {
    id: 9,
    name: "Couple Ring",
    price: 12999,
    rating: 4.8,
    bond: "for-siblings",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 10,
    name: "Friendship Bracelet",
    price: 4999,
    rating: 4.7,
    bond: "for-friends",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: 11,
    name: "Self Love Ring",
    price: 14999,
    rating: 4.9,
    bond: "for-yourself",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
];

const titles = {
  "for-husband": "Jewellery For Husband",
  "for-wife": "Jewellery For Wife",
  "for-mother": "Jewellery For Mother",
  "for-father": "Jewellery For Father",
  "for-children": "Jewellery For Children",
  "for-siblings": "Jewellery For Siblings",
  "for-friends": "Jewellery For Friends",
  "for-yourself": "Jewellery For Yourself",
};

const BondProducts = () => {
  const { slug } = useParams();

  const filteredProducts = products.filter(
    (product) => product.bond === slug
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-serif text-center mb-10">
          {titles[slug]}
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-xl">
            No Products Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BondProducts;