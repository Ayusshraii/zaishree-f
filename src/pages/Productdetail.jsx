import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { FiHeart, FiTruck, FiRotateCcw, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/WishlistContext";
import { getPricingSettings } from "../services/pricingService";

// product-specific data only — no gold rate / GST here anymore,
// those come from getPricingSettings() since they change daily
// and apply store-wide, not per product
const product = {
  id: 101,
  name: "Aurelian Gold Band",
  category: "Jewelry",
  subcategory: "Rings",
  images: [
    "https://images.unsplash.com/photo-1602752275938-77655d5edb52?w=200&q=80",
    "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=200&q=80",
    "https://images.unsplash.com/photo-1602751584547-6d2c976c5e0e?w=200&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
  ],
  description:
    "A foundational piece for any collection. The Aurelian Gold Band is meticulously hand-forged from solid 18k yellow gold, featuring a signature soft-satin finish that glows with a quiet, internal warmth. Its substantial weight and comfort-fit interior make it a tactile pleasure for everyday wear.",
  sizes: [5, 6, 7, 8],
  weightInGrams: 5.2,
  makingChargePercent: 12,
  craftsmanship: {
    heading: "Craftsmanship & Materials",
    description:
      "Every Aurelian piece is the result of centuries-old technique meeting modern precision. Our gold is ethically sourced through fair-trade certified partners, ensuring that the beauty of your jewelry reflects the integrity of its origin.",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
    points: [
      "Solid 18K Yellow Gold (75% Pure Gold)",
      "Signature Satin-Suede Finish",
      "Hand-forged in our Northern Italian Studio",
      "Lifetime Care Warranty Included",
    ],
  },
};

const relatedProducts = [
  {
    id: 201,
    name: "Ethereal Hoops",
    price: 35999,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80",
  },
  {
    id: 202,
    name: "Solstice Pendant",
    price: 58999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },
  {
    id: 203,
    name: "Aurelian Cuff",
    price: 88999,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  },
  {
    id: 204,
    name: "Trinity Stacking Set",
    price: 39999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  },
];

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[3]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showBreakup, setShowBreakup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [pricing, setPricing] = useState(null);
  const [pricingLoading, setPricingLoading] = useState(true);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  useEffect(() => {
    async function loadPricing() {
      try {
        const settings = await getPricingSettings();
        setPricing(settings);
      } catch (err) {
        console.error(err);
      } finally {
        setPricingLoading(false);
      }
    }
    loadPricing();
  }, []);

  const requiresSize = product.sizes && product.sizes.length > 0;

  // price breakup — recalculates whenever pricing (live rate/GST) loads
  const goldValue = pricing ? product.weightInGrams * pricing.goldRatePerGram : 0;
  const makingCharges = (goldValue * product.makingChargePercent) / 100;
  const subtotal = goldValue + makingCharges;
  const gstAmount = pricing ? (subtotal * pricing.gstPercent) / 100 : 0;
  const totalPrice = subtotal + gstAmount;

  const handleAddToCart = () => {
    if (requiresSize && !selectedSize) return;
    if (isInCart(product.id)) {
      toast("Already added in cart");
      return;
    }
    addToCart(
      { ...product, size: selectedSize, price: Math.round(totalPrice) },
      quantity
    );
    toast.success("Added to cart");
  };

  const handleWishlistToggle = () => {
    const wasInWishlist = inWishlist;
    toggleWishlist(product);
    toast(wasInWishlist ? "Removed from wishlist" : "Added to wishlist", {
      icon: wasInWishlist ? undefined : "❤️",
    });
  };

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="bg-[#FBF4EC] px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-6">
          {/* Thumbnails */}
          <div className="hidden lg:flex flex-col gap-3 order-1">
            {product.images.slice(0, 3).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden border transition-colors ${
                  selectedImage === img ? "border-[#4B0F14]" : "border-gray-200"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative order-2 lg:order-2">
            <button
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
            >
              {inWishlist ? (
                <FaHeart className="w-4 h-4 text-red-500" />
              ) : (
                <FiHeart className="w-4 h-4 text-gray-700" />
              )}
            </button>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-white">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="order-3 lg:order-3 lg:pl-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">
              {product.category} / {product.subcategory}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#241F1C] mb-3">
              {product.name}
            </h1>

            {pricingLoading ? (
              <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            ) : (
              <p className="text-xl text-[#9C7A4A] font-medium mb-4">
                ₹{Math.round(totalPrice).toLocaleString("en-IN")}
              </p>
            )}

            {/* Price breakup toggle */}
            {!pricingLoading && (
              <>
                <button
                  onClick={() => setShowBreakup((prev) => !prev)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#4B0F14] transition-colors mb-4"
                >
                  {showBreakup ? "Hide price breakup" : "View price breakup"}
                  {showBreakup ? (
                    <FiChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <FiChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showBreakup && (
                  <div className="bg-white border border-gray-200 rounded-md p-4 mb-4 text-sm">
                    <div className="flex justify-between py-1.5 text-gray-600">
                      <span>Gold value ({product.weightInGrams}g × ₹{pricing.goldRatePerGram.toLocaleString("en-IN")}/g)</span>
                      <span>₹{Math.round(goldValue).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-gray-600">
                      <span>Making charges ({product.makingChargePercent}%)</span>
                      <span>₹{Math.round(makingCharges).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-gray-600 border-b border-gray-200 pb-2 mb-2">
                      <span>Subtotal</span>
                      <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-gray-600">
                      <span>GST ({pricing.gstPercent}%)</span>
                      <span>₹{Math.round(gstAmount).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pt-2 mt-1 border-t border-gray-300 font-semibold text-[#241F1C]">
                      <span>Total</span>
                      <span>₹{Math.round(totalPrice).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="border-t border-gray-300 mb-6" />

            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size selector — only for products that need sizing */}
            {requiresSize && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs uppercase tracking-wide text-gray-500">
                    Select size
                  </h3>
                  <button className="text-xs underline text-gray-700">Size guide</button>
                </div>
                <div className="flex gap-2 mb-6">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-md text-sm transition-colors ${
                        selectedSize === size
                          ? "border-[#4B0F14] bg-[#4B0F14] text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Quantity selector */}
            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Quantity
            </h3>
            <div className="inline-flex items-center border border-gray-300 rounded-full mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={pricingLoading || (requiresSize && !selectedSize)}
              className="w-full py-3.5 bg-[#4B0F14] text-white text-sm uppercase tracking-wide hover:bg-[#3A0C10] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {pricingLoading
                ? "Loading price..."
                : requiresSize && !selectedSize
                ? "Select a size"
                : isInCart(product.id)
                ? "Already in cart"
                : "Add to cart"}
            </button>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiTruck className="w-4 h-4 shrink-0" />
                <span>Complimentary insured shipping on all orders.</span>
              </div>
              <div className="flex items-center gap-2">
                <FiRotateCcw className="w-4 h-4 shrink-0" />
                <span>30-day extended returns &amp; exchanges.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship section */}
      <div className="bg-[#F2ECE3] px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-serif text-3xl text-[#241F1C] mb-4">
              {product.craftsmanship.heading}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {product.craftsmanship.description}
            </p>
            <ul className="space-y-2">
              {product.craftsmanship.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A4A] mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={product.craftsmanship.image}
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-center text-[#241F1C] tracking-wide mb-10">
            PAIRS BEAUTIFULLY WITH
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <a key={item.id} href="#" className="group block">
                <div className="aspect-square overflow-hidden bg-gray-100 rounded-md mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-1">
                  {item.name}
                </p>
                <p className="text-sm text-[#9C7A4A]">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </a>
            ))}
          </div>
        </div>
     
      </div>
       <Footer/>
    </>
  );
};

export default ProductDetail;