import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PriceBreakupCard from "../components/common/Pricebreakup";

import {
  FiHeart,
  FiTruck,
  FiRotateCcw,
  FiX,
  FiCamera,
  FiStar,
  FiChevronRight,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";

import { FaHeart, FaStar } from "react-icons/fa";

import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/WishlistContext";

import { getPricingSettings } from "../services/pricingService";
import { getPriceBreakup } from "../services/priceBreakupService";

// ============================================================
// PRODUCT DATA
// ============================================================

const product = {
  id: 101,

  name: "Aurelian Gold Band",

  category: "Jewelry",

  subcategory: "Rings",

  images: [
    "https://images.unsplash.com/photo-1602752275938-77655d5edb52?w=800&q=80",
    "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
    "https://images.unsplash.com/photo-1602751584547-6d2c976c5e0e?w=800&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
  ],

  shortDescription:
    "A timeless 18K gold band crafted for everyday elegance, comfort, and effortless style.",

  description:
    "A foundational piece for any collection. The Aurelian Gold Band is meticulously hand-forged from solid 18k yellow gold, featuring a signature soft-satin finish that glows with a quiet, internal warmth. Its substantial weight and comfort-fit interior make it a tactile pleasure for everyday wear.",

  sizes: [5, 6, 7, 8],

  weightInGrams: 5.2,

  makingChargePercent: 12,

  // ==========================================================
  // DISCOUNT
  // ==========================================================

  discountPercent: 10,

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

// ============================================================
// RELATED PRODUCTS
// ============================================================

const relatedProducts = [
  {
    id: 201,
    name: "Ethereal Hoops",
    price: 35999,
    discountPercent: 10,
    image:
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80",
  },

  {
    id: 202,
    name: "Solstice Pendant",
    price: 58999,
    discountPercent: 15,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },

  {
    id: 203,
    name: "Aurelian Cuff",
    price: 88999,
    discountPercent: 10,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  },

  {
    id: 204,
    name: "Trinity Stacking Set",
    price: 39999,
    discountPercent: 12,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  },

  {
    id: 205,
    name: "Lumière Choker",
    price: 64999,
    discountPercent: 10,
    image:
      "https://images.unsplash.com/photo-1611591437131-cf796061dcf4?w=400&q=80",
  },

  {
    id: 206,
    name: "Meridian Studs",
    price: 28999,
    discountPercent: 8,
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
  },

  {
    id: 207,
    name: "Celeste Bangle",
    price: 71999,
    discountPercent: 15,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
  },

  {
    id: 208,
    name: "Ombre Layered Necklace",
    price: 49999,
    discountPercent: 10,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80",
  },
];

// ============================================================
// REVIEWS
// ============================================================

const initialReviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    rating: 5,
    date: "28/07/26",
    title: "Beautiful finishing, exactly as pictured",
    comment:
      "Beautiful ring with excellent finishing. The quality is even better than I expected.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
      "https://images.unsplash.com/photo-1602752275938-77655d5edb52?w=300&q=80",
    ],
    helpful: 4,
    notHelpful: 0,
  },

  {
    id: 2,
    name: "Rahul Verma",
    rating: 4,
    date: "12/07/26",
    title: "Premium look, quick delivery",
    comment:
      "Very premium looking product. Packaging was also excellent and delivery was quick.",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80",
    images: [],
    helpful: 2,
    notHelpful: 0,
  },

  {
    id: 3,
    name: "Priya Singh",
    rating: 5,
    date: "03/06/26",
    title: "Comfortable and elegant everyday piece",
    comment:
      "Loved the design. It feels comfortable and looks beautiful when worn.",
    avatar:
      "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=100&q=80",
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=300&q=80",
    ],
    helpful: 6,
    notHelpful: 1,
  },

  {
    id: 4,
    name: "Karan Mehta",
    rating: 5,
    date: "21/05/26",
    title: "Worth every rupee",
    comment:
      "Solid weight, doesn't feel hollow like other pieces I've tried. Sizing was spot on too.",
    avatar:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=100&q=80",
    images: [],
    helpful: 3,
    notHelpful: 0,
  },

  {
    id: 5,
    name: "Neha Kapoor",
    rating: 4,
    date: "02/05/26",
    title: "Great gift option",
    comment:
      "Bought this as a gift and it was well received. Packaging felt very premium.",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
    images: [],
    helpful: 1,
    notHelpful: 0,
  },

  {
    id: 6,
    name: "Arpit R.",
    rating: 5,
    date: "04/11/25",
    title: "Great and beautiful looking pendant",
    comment:
      "The pendant looks great and it's just beautiful. Timely delivery as per the chosen date. Packaging was top notch. Looking forward to more such purchases.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
    images: [],
    helpful: 0,
    notHelpful: 1,
  },
];

// ============================================================
// STAR COMPONENT
// ============================================================

const Stars = ({ rating, size = "text-sm" }) => {
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating
              ? "text-[#9C7A4A]"
              : "text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

// ============================================================
// WRITE REVIEW MODAL
// ============================================================

const WriteReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setTitle("");
    setComment("");
    setPhotos([]);
    setSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (photos.length + files.length > 4) {
      toast.error("You can add up to 4 photos");
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);

    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      const next = [...prev];

      URL.revokeObjectURL(
        next[index].previewUrl
      );

      next.splice(index, 1);

      return next;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a short review");
      return;
    }

    setSubmitting(true);

    onSubmit({
      rating,
      title: title.trim(),
      comment: comment.trim(),
      images: photos.map(
        (p) => p.previewUrl
      ),
    });

    toast.success("Thanks for your review!");

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <FiX className="w-4 h-4" />
        </button>

        <h2 className="font-serif text-xl text-[#241F1C] mb-1">
          Write a Review
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Share your experience with{" "}
          {product.name}
        </p>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Your rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setRating(star)
                    }
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onMouseLeave={() =>
                      setHoverRating(0)
                    }
                    aria-label={`${star} star`}
                    className="p-0.5"
                  >
                    {(hoverRating ||
                      rating) >= star ? (
                      <FaStar className="w-7 h-7 text-[#9C7A4A]" />
                    ) : (
                      <FiStar className="w-7 h-7 text-gray-300" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Review title (optional)
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Sum it up in a few words"
              className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#4B0F14]"
            />
          </div>

          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Your review
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              rows={4}
              placeholder="Tell us what you liked (or didn't)..."
              className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#4B0F14] resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Add photos (optional)
            </label>

            <div className="flex flex-wrap gap-3">
              {photos.map(
                (photo, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 rounded-md overflow-hidden group"
                  >
                    <img
                      src={photo.previewUrl}
                      alt={`upload-${i}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removePhoto(i)
                      }
                      aria-label="Remove photo"
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[10px]"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )
              )}

              {photos.length < 4 && (
                <label className="w-16 h-16 rounded-md border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                  <FiCamera className="w-4 h-4 mb-0.5" />

                  <span className="text-[10px]">
                    Add
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handlePhotoChange
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#4B0F14] text-white text-sm uppercase tracking-wide rounded-md hover:bg-[#3A0C10] disabled:opacity-50"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// PRICE HELPER
// ============================================================

const getDiscountedPricing = (
  price,
  discountPercent = 0
) => {
  const discountedPrice = Math.round(price);

  if (!discountPercent || discountPercent <= 0) {
    return {
      originalPrice: discountedPrice,
      discountedPrice,
      discountPercent: 0,
      savings: 0,
    };
  }

  const originalPrice = Math.round(
    discountedPrice /
      (1 - discountPercent / 100)
  );

  const savings =
    originalPrice - discountedPrice;

  return {
    originalPrice,
    discountedPrice,
    discountPercent,
    savings,
  };
};

// ============================================================
// PRICE DISPLAY COMPONENT
// ============================================================

const PriceDisplay = ({
  originalPrice,
  discountedPrice,
  discountPercent,
  savings,
  compact = false,
}) => {
  const hasDiscount =
    discountPercent > 0 &&
    originalPrice > discountedPrice;

  return (
    <div>
      {hasDiscount && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-gray-400 line-through ${
              compact
                ? "text-[10px]"
                : "text-sm sm:text-base"
            }`}
          >
            ₹
            {originalPrice.toLocaleString(
              "en-IN"
            )}
          </span>

          <span
            className={`rounded-full bg-[#F3E7E0] font-medium text-[#7A2E42] ${
              compact
                ? "px-1.5 py-0.5 text-[8px]"
                : "px-2 py-0.5 text-[10px] sm:text-xs"
            }`}
          >
            {discountPercent}% OFF
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`font-semibold text-[#7A2E42] ${
            compact
              ? "text-xs"
              : "text-2xl sm:text-3xl"
          }`}
        >
          ₹
          {discountedPrice.toLocaleString(
            "en-IN"
          )}
        </span>

        {!compact && hasDiscount && (
          <span className="text-xs sm:text-sm text-gray-500">
            Save ₹
            {savings.toLocaleString(
              "en-IN"
            )}
          </span>
        )}
      </div>

      {!compact && (
        <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
          Inclusive of applicable taxes
        </p>
      )}
    </div>
  );
};

// ============================================================
// PRODUCT DETAIL
// ============================================================

const ProductDetail = () => {
  // ==========================================================
  // SCROLL TO TOP
  // ==========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const [selectedImage, setSelectedImage] =
    useState(product.images[3]);

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [priceBreakup, setPriceBreakup] =
    useState(null);

  const [
    priceBreakupLoading,
    setPriceBreakupLoading,
  ] = useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [pricing, setPricing] =
    useState(null);

  const [
    pricingLoading,
    setPricingLoading,
  ] = useState(true);

  const [
    recentlyViewed,
    setRecentlyViewed,
  ] = useState([]);

  const [reviews, setReviews] =
    useState(initialReviews);

  const [
    showReviewModal,
    setShowReviewModal,
  ] = useState(false);

  const REVIEWS_PREVIEW_COUNT = 4;

  const [
    showAllReviews,
    setShowAllReviews,
  ] = useState(false);

  const [votedReviews, setVotedReviews] =
    useState({});

  // ==========================================================
  // REVIEWS
  // ==========================================================

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, r) => sum + r.rating,
          0
        ) / reviews.length
      : 0;

  const displayedReviews =
    showAllReviews
      ? reviews
      : reviews.slice(
          0,
          REVIEWS_PREVIEW_COUNT
        );

  const handleReviewSubmit = ({
    rating,
    title,
    comment,
    images,
  }) => {
    setReviews((prev) => [
      {
        id: Date.now(),
        name: "You",
        rating,
        date: new Date()
          .toLocaleDateString("en-GB")
          .replace(/\//g, "/"),
        title,
        comment,
        avatar:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80",
        images,
        helpful: 0,
        notHelpful: 0,
      },
      ...prev,
    ]);
  };

  const handleVote = (
    reviewId,
    type
  ) => {
    if (votedReviews[reviewId]) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              helpful:
                type === "helpful"
                  ? r.helpful + 1
                  : r.helpful,
              notHelpful:
                type === "notHelpful"
                  ? r.notHelpful + 1
                  : r.notHelpful,
            }
          : r
      )
    );

    setVotedReviews((prev) => ({
      ...prev,
      [reviewId]: type,
    }));
  };

  // ==========================================================
  // CART / WISHLIST
  // ==========================================================

  const { addToCart, isInCart } =
    useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const inWishlist = isInWishlist(
    product.id
  );

  // ==========================================================
  // LOAD PRICING
  // ==========================================================

  useEffect(() => {
    async function loadPricing() {
      try {
        const settings =
          await getPricingSettings();

        setPricing(settings);
      } catch (err) {
        console.error(
          "Error loading pricing settings:",
          err
        );
      } finally {
        setPricingLoading(false);
      }
    }

    loadPricing();
  }, []);

  // ==========================================================
  // LOAD PRICE BREAKUP
  // ==========================================================

  useEffect(() => {
    async function loadPriceBreakup() {
      try {
        const data =
          await getPriceBreakup(
            product.id
          );

        setPriceBreakup(data);
      } catch (err) {
        console.error(
          "Error loading price breakup:",
          err
        );
      } finally {
        setPriceBreakupLoading(false);
      }
    }

    loadPriceBreakup();
  }, []);

  // ==========================================================
  // CALCULATE PRICE
  // ==========================================================

  const goldValue = pricing
    ? product.weightInGrams *
      pricing.goldRatePerGram
    : 0;

  const makingCharges =
    (goldValue *
      product.makingChargePercent) /
    100;

  const subtotal =
    goldValue + makingCharges;

  const gstAmount = pricing
    ? (subtotal *
        pricing.gstPercent) /
      100
    : 0;

  const calculatedPrice =
    subtotal + gstAmount;

  // ==========================================================
  // DISCOUNTED PRODUCT PRICING
  // ==========================================================

  const productPricing = getDiscountedPricing(
    calculatedPrice,
    product.discountPercent
  );

  const originalPrice =
    productPricing.originalPrice;

  const discountedPrice =
    productPricing.discountedPrice;

  const discountPercent =
    productPricing.discountPercent;

  const savings =
    productPricing.savings;

  // ==========================================================
  // RECENTLY VIEWED
  // ==========================================================

  useEffect(() => {
    if (!pricing) return;

    const storedProducts =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];

    const seenIds = new Set([
      product.id,
    ]);

    const filteredProducts =
      storedProducts.filter((item) => {
        if (seenIds.has(item.id)) {
          return false;
        }

        seenIds.add(item.id);

        return true;
      });

    const currentProduct = {
      id: product.id,
      name: product.name,
      image: product.images[3],

      // NEW PRICING DATA
      originalPrice,
      discountedPrice,
      discountPercent,
      savings,

      // Backward-compatible price
      price: discountedPrice,
    };

    const updatedProducts = [
      currentProduct,
      ...filteredProducts,
    ].slice(0, 5);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updatedProducts)
    );

    setRecentlyViewed(
      updatedProducts
    );
  }, [
    pricing,
    originalPrice,
    discountedPrice,
    discountPercent,
    savings,
  ]);

  // ==========================================================
  // LOAD RECENTLY VIEWED
  // ==========================================================

  useEffect(() => {
    const storedProducts =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];

    const seenIds = new Set();

    const dedupedProducts =
      storedProducts.filter((item) => {
        if (seenIds.has(item.id)) {
          return false;
        }

        seenIds.add(item.id);

        return true;
      });

    setRecentlyViewed(
      dedupedProducts
    );
  }, []);

  // ==========================================================
  // SIZE
  // ==========================================================

  const requiresSize =
    product.sizes &&
    product.sizes.length > 0;

  // ==========================================================
  // PRODUCT DETAILS
  // ==========================================================

  const productDetailsRows = [
    ["Product", product.name],
    ["Category", product.category],
    ["Subcategory", product.subcategory],
    ["Metal", "18K Yellow Gold"],
    ["Purity", "75% Pure Gold"],
    [
      "Weight",
      `${product.weightInGrams} g`,
    ],
    [
      "Making Charges",
      `${product.makingChargePercent}%`,
    ],
    [
      "Discount",
      `${product.discountPercent}%`,
    ],
  ];

  // ==========================================================
  // CART PRODUCT
  // ==========================================================

  const getCartProduct = () => {
    return {
      ...product,

      size: selectedSize,

      // IMPORTANT:
      // discounted price is the actual selling price
      price: discountedPrice,

      discountedPrice,

      originalPrice,

      discountPercent,

      savings,
    };
  };

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const handleAddToCart = () => {
    if (
      requiresSize &&
      !selectedSize
    ) {
      toast.error(
        "Please select a size"
      );
      return;
    }

    if (
      isInCart(product.id)
    ) {
      toast(
        "Already added in cart"
      );
      return;
    }

    addToCart(
      getCartProduct(),
      quantity
    );

    toast.success(
      "Added to cart"
    );
  };

  // ==========================================================
  // BUY NOW
  // ==========================================================

  const handleBuyNow = () => {
    if (
      requiresSize &&
      !selectedSize
    ) {
      toast.error(
        "Please select a size"
      );
      return;
    }

    addToCart(
      getCartProduct(),
      quantity
    );

    window.location.href =
      "/checkout";
  };

  // ==========================================================
  // WISHLIST
  // ==========================================================

  const handleWishlistToggle =
    () => {
      const wasInWishlist =
        inWishlist;

      toggleWishlist(product);

      toast(
        wasInWishlist
          ? "Removed from wishlist"
          : "Added to wishlist",
        {
          icon: wasInWishlist
            ? undefined
            : "❤️",
        }
      );
    };

  // ==========================================================
  // RETURN JSX
  // ==========================================================

  return (
    <>
      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <div className="border border-gray-300">
        <Navbar />
      </div>

      {/* ======================================================
          MAIN PRODUCT SECTION
          ====================================================== */}

      <div className="bg-[#FBF4EC] px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ==================================================
              IMAGE GALLERY
              ================================================== */}

          <div className="lg:sticky lg:top-8">
            <div className="flex gap-3">

              {/* DESKTOP THUMBNAILS */}

              <div className="hidden lg:flex flex-col gap-3 shrink-0">
                {product.images.map(
                  (img, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setSelectedImage(
                          img
                        )
                      }
                      className={`
                        w-20
                        h-20
                        rounded-md
                        overflow-hidden
                        border
                        transition-colors
                        ${
                          selectedImage ===
                          img
                            ? "border-[#4B0F14]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <img
                        src={img}
                        alt={
                          product.name
                        }
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>

              {/* MAIN IMAGE */}

              <div className="relative flex-1">
                <button
                  onClick={
                    handleWishlistToggle
                  }
                  aria-label={
                    inWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
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
                    alt={
                      product.name
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ==================================================
                MOBILE THUMBNAILS
                ================================================== */}

            <div
              className="
                flex
                lg:hidden
                gap-2
                overflow-x-auto
                snap-x
                snap-mandatory
                mt-3
                -mx-4
                px-4
                pb-1
                [&::-webkit-scrollbar]:hidden
              "
              style={{
                scrollbarWidth:
                  "none",
              }}
            >
              {product.images.map(
                (img, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSelectedImage(
                        img
                      )
                    }
                    className={`
                      shrink-0
                      snap-start
                      w-12
                      h-12
                      sm:w-14
                      sm:h-14
                      rounded-md
                      overflow-hidden
                      border
                      transition-colors
                      ${
                        selectedImage ===
                        img
                          ? "border-[#4B0F14]"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt={
                        product.name
                      }
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* ==================================================
              PRODUCT INFORMATION
              ================================================== */}

          <div className="lg:pl-4">

            {/* CATEGORY */}

            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">
              {product.category} /{" "}
              {product.subcategory}
            </p>

            {/* NAME */}

            <h1 className="font-serif text-3xl sm:text-4xl text-[#241F1C] mb-3">
              {product.name}
            </h1>

            {/* ==================================================
                PRICE
                ================================================== */}

            {pricingLoading ? (
              <div className="mb-5">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />

                <div className="h-7 w-36 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <PriceDisplay
                originalPrice={
                  originalPrice
                }
                discountedPrice={
                  discountedPrice
                }
                discountPercent={
                  discountPercent
                }
                savings={savings}
              />
            )}

            {/* SHORT DESCRIPTION */}

            <p className="text-sm sm:text-base text-[#4B0F14] font-medium leading-relaxed mb-2">
              {
                product.shortDescription
              }
            </p>

            {/* DESCRIPTION */}

            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Description
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* SIZE */}

            {requiresSize && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs uppercase tracking-wide text-gray-500">
                    Select Size
                  </h3>

                  <button
                    type="button"
                    className="text-xs underline text-gray-700"
                  >
                    Size guide
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  {product.sizes.map(
                    (size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                        className={`
                          w-12
                          h-12
                          border
                          rounded-md
                          text-sm
                          transition-colors
                          ${
                            selectedSize ===
                            size
                              ? "border-[#4B0F14] bg-[#4B0F14] text-white"
                              : "border-gray-300 text-gray-700 hover:border-gray-500"
                          }
                        `}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </>
            )}

            {/* QUANTITY */}

            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Quantity
            </h3>

            <div className="inline-flex items-center border border-gray-300 rounded-full mb-6">
              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    (q) =>
                      Math.max(
                        1,
                        q - 1
                      )
                  )
                }
                disabled={
                  quantity <= 1
                }
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-black disabled:opacity-30"
              >
                −
              </button>

              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    (q) => q + 1
                  )
                }
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>

            {/* ==================================================
                ADD TO CART + BUY NOW
                ================================================== */}

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8">
              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                disabled={
                  pricingLoading ||
                  (requiresSize &&
                    !selectedSize)
                }
                className="py-3 sm:py-3.5 border border-[#4B0F14] text-[#4B0F14] bg-white text-xs sm:text-sm uppercase tracking-wide rounded-md hover:bg-[#4B0F14] hover:text-white disabled:opacity-50 transition-colors"
              >
                {pricingLoading
                  ? "Loading..."
                  : requiresSize &&
                    !selectedSize
                  ? "Select Size"
                  : isInCart(
                      product.id
                    )
                  ? "Already in Cart"
                  : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={
                  handleBuyNow
                }
                disabled={
                  pricingLoading ||
                  (requiresSize &&
                    !selectedSize)
                }
                className="py-3 sm:py-3.5 bg-[#4B0F14] text-white text-xs sm:text-sm uppercase tracking-wide rounded-md hover:bg-[#3A0C10] disabled:opacity-50 transition-colors"
              >
                {pricingLoading
                  ? "Loading..."
                  : requiresSize &&
                    !selectedSize
                  ? "Select Size"
                  : "Buy Now"}
              </button>
            </div>

            {/* PRICE BREAKUP */}

            <div className="border-t border-gray-300 pt-6">
              <PriceBreakupCard
                priceBreakup={
                  priceBreakup
                }
                loading={
                  priceBreakupLoading
                }
                productDetails={
                  productDetailsRows
                }
              />
            </div>

            {/* SHIPPING */}

            <div className="space-y-2 text-sm text-gray-600 mt-6">
              <div className="flex items-center gap-2">
                <FiTruck className="w-4 h-4 shrink-0" />

                <span>
                  Complimentary
                  insured shipping
                  on all orders.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiRotateCcw className="w-4 h-4 shrink-0" />

                <span>
                  30-day extended
                  returns &
                  exchanges.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          RECENTLY VIEWED
          ====================================================== */}

      {recentlyViewed.filter(
        (item) =>
          item.id !== product.id
      ).length > 0 && (
        <section className="px-4 sm:px-6 py-10 sm:py-14 bg-[#FBF4EC]">
          <div className="max-w-6xl mx-auto">

            <h2 className="font-serif text-2xl text-center text-[#241F1C] mb-8 sm:mb-10 tracking-wide">
              RECENTLY VIEWED
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed
                .filter(
                  (item) =>
                    item.id !==
                    product.id
                )
                .map((item) => {

                  const itemPricing =
                    getDiscountedPricing(
                      item.discountedPrice ??
                        item.price ??
                        0,
                      item.discountPercent ??
                        0
                    );

                  return (
                    <Link
                      key={item.id}
                      to={`/Products/${item.id}`}
                      className="group block"
                    >
                      <div className="aspect-square overflow-hidden bg-white rounded-md mb-3">
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <p className="text-xs uppercase tracking-wide text-gray-700 mb-1">
                        {item.name}
                      </p>

                      <PriceDisplay
                        originalPrice={
                          itemPricing.originalPrice
                        }
                        discountedPrice={
                          itemPricing.discountedPrice
                        }
                        discountPercent={
                          itemPricing.discountPercent
                        }
                        savings={
                          itemPricing.savings
                        }
                        compact
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          WRITE REVIEW MODAL
          ====================================================== */}

      <WriteReviewModal
        isOpen={
          showReviewModal
        }
        onClose={() =>
          setShowReviewModal(
            false
          )
        }
        onSubmit={
          handleReviewSubmit
        }
      />

      {/* ======================================================
          PAIRS BEAUTIFULLY WITH
          ====================================================== */}

      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">

          <h2 className="font-serif text-xl sm:text-2xl text-center text-[#241F1C] tracking-wide mb-7 sm:mb-10">
            PAIRS BEAUTIFULLY WITH
          </h2>

          <div
            className="
              flex
              overflow-x-auto
              snap-x
              snap-mandatory
              gap-3
              sm:gap-5
              pb-2
              -mx-4
              px-4
              sm:-mx-6
              sm:px-6
              [&::-webkit-scrollbar]:hidden
            "
            style={{
              scrollbarWidth:
                "none",
            }}
          >
            {relatedProducts.map(
              (item) => {

                const itemPricing =
                  getDiscountedPricing(
                    item.price,
                    item.discountPercent
                  );

                return (
                  <Link
                    key={item.id}
                    to={`/Products/${item.id}`}
                    className="
                      group
                      block
                      shrink-0
                      snap-start
                      w-[112px]
                      xs:w-[120px]
                      sm:w-40
                    "
                  >
                    {/* IMAGE */}

                    <div className="aspect-square overflow-hidden bg-gray-100 rounded-md mb-2 sm:mb-3">
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* NAME */}

                    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-700 mb-1 line-clamp-2 leading-relaxed">
                      {item.name}
                    </p>

                    {/* PRICING */}

                    <PriceDisplay
                      originalPrice={
                        itemPricing.originalPrice
                      }
                      discountedPrice={
                        itemPricing.discountedPrice
                      }
                      discountPercent={
                        itemPricing.discountPercent
                      }
                      savings={
                        itemPricing.savings
                      }
                      compact
                    />
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          REVIEWS
          ====================================================== */}

      <section className="bg-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">

          {/* HEADER */}

          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-[#241F1C] mb-1">
              Customer Reviews
            </h2>

            <p className="text-gray-500 text-sm sm:text-base">
              See what our clients
              have to say
            </p>
          </div>

          {/* WRITE REVIEW */}

          <div className="flex justify-center mb-10 sm:mb-14">
            <button
              onClick={() =>
                setShowReviewModal(
                  true
                )
              }
              className="group inline-flex items-center gap-3 bg-[#9C7A6B] text-white text-sm font-semibold tracking-wide pl-7 pr-2 py-2 rounded-full hover:bg-[#8a6a5c]"
            >
              Write A Review

              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FiChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* REVIEW LIST */}

          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {displayedReviews.map(
              (review) => {
                const myVote =
                  votedReviews[
                    review.id
                  ];

                return (
                  <div
                    key={review.id}
                    className="py-6 sm:py-7"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="text-xs font-bold tracking-wide text-[#241F1C] uppercase">
                        {review.name}
                      </p>

                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {review.date}
                      </span>
                    </div>

                    <Stars
                      rating={
                        review.rating
                      }
                      size="text-sm mb-3"
                    />

                    {review.title && (
                      <p className="text-sm font-bold text-[#241F1C] mb-1.5">
                        {review.title}
                      </p>
                    )}

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>

                    {review.images
                      .length >
                      0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto">
                        {review.images.map(
                          (
                            img,
                            i
                          ) => (
                            <div
                              key={i}
                              className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0"
                            >
                              <img
                                src={
                                  img
                                }
                                alt={`${review.name} review photo ${
                                  i +
                                  1
                                }`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs text-gray-500">
                        Was this review
                        helpful?
                      </span>

                      <button
                        onClick={() =>
                          handleVote(
                            review.id,
                            "helpful"
                          )
                        }
                        disabled={
                          !!myVote
                        }
                        className={`flex items-center gap-1 text-xs ${
                          myVote ===
                          "helpful"
                            ? "text-[#4B0F14]"
                            : "text-gray-500 hover:text-[#4B0F14]"
                        }`}
                      >
                        <FiThumbsUp className="w-3.5 h-3.5" />

                        {
                          review.helpful
                        }
                      </button>

                      <button
                        onClick={() =>
                          handleVote(
                            review.id,
                            "notHelpful"
                          )
                        }
                        disabled={
                          !!myVote
                        }
                        className={`flex items-center gap-1 text-xs ${
                          myVote ===
                          "notHelpful"
                            ? "text-[#4B0F14]"
                            : "text-gray-500 hover:text-[#4B0F14]"
                        }`}
                      >
                        <FiThumbsDown className="w-3.5 h-3.5" />

                        {
                          review.notHelpful
                        }
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* VIEW ALL */}

          {reviews.length >
            REVIEWS_PREVIEW_COUNT && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() =>
                  setShowAllReviews(
                    (v) => !v
                  )
                }
                className="border border-[#4B0F14] text-[#4B0F14] px-6 py-2.5 text-sm font-medium rounded-full hover:bg-[#4B0F14] hover:text-white"
              >
                {showAllReviews
                  ? "Show Less"
                  : `View All ${reviews.length} Reviews`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <Footer />
    </>
  );
};

export default ProductDetail;