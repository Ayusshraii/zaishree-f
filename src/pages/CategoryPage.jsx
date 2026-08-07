import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductCard from "../components/common/ProductCard";
import { products } from "../data/products";

const toSlug = (product) =>
  `${product.material}-${product.subcategory.toLowerCase()}`;

const slugToTitle = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// computes a flat display price from weight/rate/making/gst,
// since shared product data doesn't store a flat price field
const computePrice = (product) => {
  const goldValue = product.weightInGrams * product.goldRatePerGram;
  const makingCharges = (goldValue * product.makingChargePercent) / 100;
  const subtotal = goldValue + makingCharges;
  const gstAmount = (subtotal * product.gstPercent) / 100;
  return Math.round(subtotal + gstAmount);
};

const CategoryPage = () => {
  const { slug } = useParams();

  const filteredProducts = products
    .filter((p) => toSlug(p) === slug)
    .map((p) => ({ ...p, price: computePrice(p) }));

  return (
    <>
      <div className="border-1 border-gray-300 ">
        <Navbar />
      </div>

      <div className="text-center p-7">
        <h1 className="text-3xl font-serif  text-[#5a1b1be0]">{slugToTitle(slug)}</h1>
        <p className="text-sm text-gray-500 mt-2">
          {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-500 mb-4">
              No products found in this category yet.
            </p>
            <Link to="/products" className="text-[#4B0F14] underline text-sm">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;