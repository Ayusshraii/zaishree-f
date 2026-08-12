import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PriceBreakupCard from "../components/common/Pricebreakup";

import { FiHeart, FiTruck, FiRotateCcw, FiX, FiCamera, FiStar, FiChevronRight, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

import { FaHeart, FaStar } from "react-icons/fa";

// Matches the actual file on disk: Cartcontext.jsx (lowercase c).
// Do not "fix" this casing — it must match the real filename exactly,
// or on case-sensitive filesystems this silently resolves to a
// second, provider-less instance of the context, and useCart()
// returns undefined at runtime.
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

// ============================================================
// RELATED PRODUCTS
// ============================================================

const relatedProducts = [
  {
    id: 201,
    name: "Ethereal Hoops",
    price: 35999,
    image:
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80",
  },

  {
    id: 202,
    name: "Solstice Pendant",
    price: 58999,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },

  {
    id: 203,
    name: "Aurelian Cuff",
    price: 88999,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  },

  {
    id: 204,
    name: "Trinity Stacking Set",
    price: 39999,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  },
];

// ============================================================
// REVIEWS (seed data)
// `images` holds any photos the reviewer attached — the card
// only renders a thumbnail row when this array is non-empty.
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
// STAR COMPONENT (read-only, used on review cards)
// ============================================================

const Stars = ({ rating, size = "text-sm" }) => {
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating ? "text-[#9C7A4A]" : "text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

// ============================================================
// WRITE A REVIEW MODAL
// Modern centered modal: interactive star picker, comment
// textarea, and a photo upload grid with local previews.
// Fully client-side — swap handleFormSubmit's onSubmit call for
// an API request once a reviews endpoint exists.
// ============================================================

const WriteReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]); // [{ file, previewUrl }]
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

    // allow re-selecting the same file later
    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].previewUrl);
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
      images: photos.map((p) => p.previewUrl),
    });

    toast.success("Thanks for your review!");
    resetForm();
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        px-4
      "
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* MODAL CARD */}
      <div
        className="
          relative w-full max-w-md
          bg-white rounded-2xl shadow-xl
          p-6 sm:p-7
          max-h-[90vh] overflow-y-auto
        "
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="
            absolute top-4 right-4
            w-8 h-8 rounded-full
            flex items-center justify-center
            text-gray-400 hover:text-gray-700 hover:bg-gray-100
            transition-colors
          "
        >
          <FiX className="w-4 h-4" />
        </button>

        <h2 className="font-serif text-xl text-[#241F1C] mb-1">
          Write a Review
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Share your experience with {product.name}
        </p>

        <form onSubmit={handleFormSubmit}>
          {/* STAR PICKER */}
          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Your rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${star} star`}
                  className="p-0.5"
                >
                  {(hoverRating || rating) >= star ? (
                    <FaStar className="w-7 h-7 text-[#9C7A4A]" />
                  ) : (
                    <FiStar className="w-7 h-7 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Review title (optional)
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum it up in a few words"
              className="
                w-full
                border border-gray-300
                rounded-md
                px-3.5 py-2.5
                text-sm
                text-gray-700
                placeholder:text-gray-400
                focus:outline-none
                focus:border-[#4B0F14]
              "
            />
          </div>

          {/* COMMENT */}
          <div className="mb-5">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Your review
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Tell us what you liked (or didn't)..."
              className="
                w-full
                border border-gray-300
                rounded-md
                px-3.5 py-2.5
                text-sm
                text-gray-700
                placeholder:text-gray-400
                focus:outline-none
                focus:border-[#4B0F14]
                resize-none
              "
            />
          </div>

          {/* PHOTO UPLOAD */}
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Add photos (optional)
            </label>

            <div className="flex flex-wrap gap-3">
              {photos.map((photo, i) => (
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
                    onClick={() => removePhoto(i)}
                    aria-label="Remove photo"
                    className="
                      absolute top-0.5 right-0.5
                      w-4 h-4 rounded-full
                      bg-black/60 text-white
                      flex items-center justify-center
                      text-[10px]
                    "
                  >
                    <FiX className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}

              {photos.length < 4 && (
                <label
                  className="
                    w-16 h-16 rounded-md
                    border border-dashed border-gray-300
                    flex flex-col items-center justify-center
                    text-gray-400
                    cursor-pointer
                    hover:border-[#4B0F14] hover:text-[#4B0F14]
                    transition-colors
                  "
                >
                  <FiCamera className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full py-3
              bg-[#4B0F14] text-white
              text-sm uppercase tracking-wide
              rounded-md
              hover:bg-[#3A0C10]
              disabled:opacity-50
              transition-colors
            "
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// PRODUCT DETAIL
// ============================================================

const ProductDetail = () => {
  // ==========================================================
  // IMAGE
  // ==========================================================

  const [selectedImage, setSelectedImage] = useState(product.images[3]);

  // ==========================================================
  // SIZE
  // ==========================================================

  const [selectedSize, setSelectedSize] = useState(null);

  // ==========================================================
  // PRICE BREAKUP CARD (Component/Rate/Weight/Final Value table)
  // Fetched separately from the quick price shown above — see
  // priceBreakupService.js. This is the admin-editable one.
  // ==========================================================

  const [priceBreakup, setPriceBreakup] = useState(null);

  const [priceBreakupLoading, setPriceBreakupLoading] = useState(true);

  // ==========================================================
  // QUANTITY
  // ==========================================================

  const [quantity, setQuantity] = useState(1);

  // ==========================================================
  // PRICING
  // ==========================================================

  const [pricing, setPricing] = useState(null);

  const [pricingLoading, setPricingLoading] = useState(true);

  // ==========================================================
  // RECENTLY VIEWED
  // ==========================================================

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // ==========================================================
  // REVIEWS
  // ==========================================================

  const [reviews, setReviews] = useState(initialReviews);

  const [showReviewModal, setShowReviewModal] = useState(false);

  // How many reviews to show before the person taps "View All"
  const REVIEWS_PREVIEW_COUNT = 4;

  const [showAllReviews, setShowAllReviews] = useState(false);

  // Tracks which reviews this visitor already voted on, so the
  // helpful/not-helpful buttons act as a one-time toggle rather
  // than letting the same person spam the count.
  const [votedReviews, setVotedReviews] = useState({});

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, REVIEWS_PREVIEW_COUNT);

  const handleReviewSubmit = ({ rating, title, comment, images }) => {
    setReviews((prev) => [
      {
        id: Date.now(),
        name: "You",
        rating,
        date: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
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

  const handleVote = (reviewId, type) => {
    if (votedReviews[reviewId]) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              helpful: type === "helpful" ? r.helpful + 1 : r.helpful,
              notHelpful:
                type === "notHelpful" ? r.notHelpful + 1 : r.notHelpful,
            }
          : r
      )
    );

    setVotedReviews((prev) => ({ ...prev, [reviewId]: type }));
  };

  // ==========================================================
  // CART / WISHLIST
  // ==========================================================

  const { addToCart, isInCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  // ==========================================================
  // LOAD PRICING
  // ==========================================================

  useEffect(() => {
    async function loadPricing() {
      try {
        const settings = await getPricingSettings();

        setPricing(settings);
      } catch (err) {
        console.error("Error loading pricing settings:", err);
      } finally {
        setPricingLoading(false);
      }
    }

    loadPricing();
  }, []);

  // ==========================================================
  // LOAD PRICE BREAKUP (for the sidebar card)
  // ==========================================================

  useEffect(() => {
    async function loadPriceBreakup() {
      try {
        const data = await getPriceBreakup(product.id);

        setPriceBreakup(data);
      } catch (err) {
        console.error("Error loading price breakup:", err);
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
    ? product.weightInGrams * pricing.goldRatePerGram
    : 0;

  const makingCharges =
    (goldValue * product.makingChargePercent) / 100;

  const subtotal = goldValue + makingCharges;

  const gstAmount = pricing
    ? (subtotal * pricing.gstPercent) / 100
    : 0;

  const totalPrice = subtotal + gstAmount;

  // ==========================================================
  // RECENTLY VIEWED
  // ==========================================================

  useEffect(() => {
    if (!pricing) return;

    const storedProducts =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // FIX: this used to only filter out entries matching the
    // CURRENT product's id. If localStorage already contained two
    // entries sharing the same id for some OTHER product (e.g. from
    // before this dedup logic existed), both would pass through
    // untouched and get rendered with the same key={item.id},
    // triggering React's "two children with the same key" warning.
    // Dedupe by id across the whole list, not just against the
    // product being viewed right now.
    const seenIds = new Set([product.id]);
    const filteredProducts = storedProducts.filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

    const currentProduct = {
      id: product.id,
      name: product.name,
      image: product.images[3],
      price: Math.round(totalPrice),
    };

    const updatedProducts = [
      currentProduct,
      ...filteredProducts,
    ].slice(0, 5);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updatedProducts)
    );

    setRecentlyViewed(updatedProducts);
  }, [pricing, totalPrice]);

  // ==========================================================
  // LOAD RECENTLY VIEWED ON FIRST RENDER
  // ==========================================================

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Same dedup applied here too, so a stale/corrupted localStorage
    // value from before this fix doesn't cause a duplicate-key
    // warning during the brief window before `pricing` loads and the
    // effect above re-saves a clean list.
    const seenIds = new Set();
    const dedupedProducts = storedProducts.filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

    setRecentlyViewed(dedupedProducts);
  }, []);

  // ==========================================================
  // SIZE REQUIREMENT
  // ==========================================================

  const requiresSize =
    product.sizes && product.sizes.length > 0;

  // ==========================================================
  // PRODUCT DETAILS ROWS
  // Shared between the compact "Product Details" tab inside
  // PriceBreakupCard and the full-width Product Details tab
  // further down the page, so both always show the same spec list.
  // ==========================================================

  const productDetailsRows = [
    ["Product", product.name],
    ["Category", product.category],
    ["Subcategory", product.subcategory],
    ["Metal", "18K Yellow Gold"],
    ["Purity", "75% Pure Gold"],
    ["Weight", `${product.weightInGrams} g`],
    ["Making Charges", `${product.makingChargePercent}%`],
  ];

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const handleAddToCart = () => {
    if (requiresSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (isInCart(product.id)) {
      toast("Already added in cart");
      return;
    }

    addToCart(
      {
        ...product,
        size: selectedSize,
        price: Math.round(totalPrice),
      },
      quantity
    );

    toast.success("Added to cart");
  };

  // ==========================================================
  // WISHLIST
  // ==========================================================

  const handleWishlistToggle = () => {
    const wasInWishlist = inWishlist;

    toggleWishlist(product);

    toast(
      wasInWishlist
        ? "Removed from wishlist"
        : "Added to wishlist",
      {
        icon: wasInWishlist ? undefined : "❤️",
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

      <div className="bg-[#FBF4EC] px-6 py-10">
        <div
          className="
            max-w-6xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            items-start
          "
        >
          {/* ==================================================
              IMAGE GALLERY (thumbnails + main image)
              Sticky on desktop — stays in view while the product
              info column on the right scrolls past it. Unsticks
              naturally once the info column (its containing row)
              ends, so it doesn't follow you into the sections
              further down the page.
              ================================================== */}

          <div className="lg:sticky lg:top-8 flex gap-3">
            {/* THUMBNAILS */}

            <div
              className="
                hidden
                lg:flex
                flex-col
                gap-3
                shrink-0
              "
            >
              {/* FIX: was product.images.slice(0, 3), which dropped
                  images[3] (the default selectedImage) from the rail
                  entirely — you could never highlight or click back to
                  the image the page opens on. Render all images so the
                  active thumbnail always matches what's on screen. */}
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`
                    w-20
                    h-20
                    rounded-md
                    overflow-hidden
                    border
                    transition-colors
                    ${
                      selectedImage === img
                        ? "border-[#4B0F14]"
                        : "border-gray-200"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}

            <div className="relative flex-1">
              <button
                onClick={handleWishlistToggle}
                aria-label={
                  inWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="
                  absolute
                  top-4
                  right-4
                  z-10
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  hover:scale-105
                  transition-transform
                "
              >
                {inWishlist ? (
                  <FaHeart className="w-4 h-4 text-red-500" />
                ) : (
                  <FiHeart className="w-4 h-4 text-gray-700" />
                )}
              </button>

              <div
                className="
                  aspect-[4/5]
                  w-full
                  overflow-hidden
                  rounded-md
                  bg-white
                "
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              PRODUCT INFORMATION
              ================================================== */}

          <div className="lg:pl-4">
            {/* CATEGORY */}

            <p
              className="
                text-xs
                tracking-[0.2em]
                uppercase
                text-gray-500
                mb-2
              "
            >
              {product.category} / {product.subcategory}
            </p>

            {/* NAME */}

            <h1
              className="
                font-serif
                text-3xl
                sm:text-4xl
                text-[#241F1C]
                mb-3
              "
            >
              {product.name}
            </h1>

            {/* PRICE */}

            {pricingLoading ? (
              <div
                className="
                  h-7
                  w-32
                  bg-gray-200
                  rounded
                  animate-pulse
                  mb-4
                "
              />
            ) : (
              <p
                className="
                  text-xl
                  text-[#9C7A4A]
                  font-medium
                  mb-4
                "
              >
                ₹{Math.round(totalPrice).toLocaleString("en-IN")}
              </p>
            )}

            {/* =================================================
                DESCRIPTION
                Moved up from the old lower tabs section — now a
                plain block, not a tab.
                ================================================= */}

            <h3
              className="
                text-xs
                uppercase
                tracking-wide
                text-gray-500
                mb-2
              "
            >
              Description
            </h3>

            <p
              className="
                text-sm
                text-gray-600
                leading-relaxed
                mb-6
              "
            >
              {product.description}
            </p>

            {/* =================================================
                PRICE BREAKUP CARD
                Replaces the old "View price breakup" toggle. Fully
                data-driven — see priceBreakupService.js for the
                shape an admin can edit on the backend. Its own
                "Product Details" tab covers what used to be the
                lower Product Details tab, so that section was
                removed rather than duplicated.
                ================================================= */}

            <PriceBreakupCard
              priceBreakup={priceBreakup}
              loading={priceBreakupLoading}
              productDetails={productDetailsRows}
            />

            <div className="border-t border-gray-300 my-6" />

            {/* =================================================
                SIZE
                ================================================= */}

            {requiresSize && (
              <>
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-2
                  "
                >
                  <h3
                    className="
                      text-xs
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Select size
                  </h3>

                  <button className="text-xs underline text-gray-700">
                    Size guide
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-12
                        h-12
                        border
                        rounded-md
                        text-sm
                        transition-colors
                        ${
                          selectedSize === size
                            ? "border-[#4B0F14] bg-[#4B0F14] text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-500"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* =================================================
                QUANTITY
                ================================================= */}

            <h3
              className="
                text-xs
                uppercase
                tracking-wide
                text-gray-500
                mb-2
              "
            >
              Quantity
            </h3>

            <div
              className="
                inline-flex
                items-center
                border
                border-gray-300
                rounded-full
                mb-6
              "
            >
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                disabled={quantity <= 1}
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  hover:text-black
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                "
              >
                −
              </button>

              <span
                className="
                  w-10
                  text-center
                  text-sm
                  font-medium
                "
              >
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  hover:text-black
                "
              >
                +
              </button>
            </div>

            {/* =================================================
                ADD TO CART
                ================================================= */}

            <button
              onClick={handleAddToCart}
              disabled={
                pricingLoading ||
                (requiresSize && !selectedSize)
              }
              className="
                w-full
                py-3.5
                bg-[#4B0F14]
                text-white
                text-sm
                uppercase
                tracking-wide
                hover:bg-[#3A0C10]
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-colors
                mb-4
              "
            >
              {pricingLoading
                ? "Loading price..."
                : requiresSize && !selectedSize
                ? "Select a size"
                : isInCart(product.id)
                ? "Already in cart"
                : "Add to cart"}
            </button>

            {/* SHIPPING */}

            <div
              className="
                space-y-2
                text-sm
                text-gray-600
              "
            >
              <div className="flex items-center gap-2">
                <FiTruck className="w-4 h-4 shrink-0" />

                <span>
                  Complimentary insured shipping on all orders.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiRotateCcw className="w-4 h-4 shrink-0" />

                <span>
                  30-day extended returns & exchanges.
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
        (item) => item.id !== product.id
      ).length > 0 && (
        <section
          className="
            px-6
            py-14
            bg-[#FBF4EC]
          "
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="
                font-serif
                text-2xl
                text-center
                text-[#241F1C]
                mb-10
                tracking-wide
              "
            >
              RECENTLY VIEWED
            </h2>

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-6
              "
            >
              {recentlyViewed
                .filter(
                  (item) => item.id !== product.id
                )
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/Products/${item.id}`}
                    className="group block"
                  >
                    <div
                      className="
                        aspect-square
                        overflow-hidden
                        bg-white
                        rounded-md
                        mb-3
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />
                    </div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-gray-700
                        mb-1
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        text-sm
                        text-[#9C7A4A]
                      "
                    >
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          REVIEWS
          Centered header + gold rating summary + pill CTA, then a
          flat list (title/comment/helpful-votes) capped at
          REVIEWS_PREVIEW_COUNT with a "View All" toggle beneath.
          ====================================================== */}

      <section
        className="
          bg-white
          px-6
          py-16
        "
      >
        <div className="max-w-3xl mx-auto">
          {/* CENTERED HEADER */}

          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-[#241F1C] mb-1">
              Customer Reviews
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              See what our clients have to say
            </p>
          </div>

          {/* GOLD RATING SUMMARY CARD */}

          <div
            className="
              mx-auto
              w-full
              max-w-xs
              rounded-xl
              px-8
              py-8
              text-center
              text-white
              mb-6
            "
            style={{
              background:
                "linear-gradient(160deg, #C79A56 0%, #9C7A4A 45%, #5a1b1b 100%)",
            }}
          >
            <p className="leading-none mb-3">
              <span className="font-serif text-5xl align-middle">
                {averageRating.toFixed(0)}
              </span>
              <span className="text-lg text-white/70 align-middle">
                /5
              </span>
            </p>

            <div className="flex justify-center mb-2">
              <Stars rating={Math.round(averageRating)} size="text-xl" />
            </div>

            <p className="text-xs tracking-wide text-white/85">
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* WRITE A REVIEW — PILL CTA */}

          <div className="flex justify-center mb-14">
            <button
              onClick={() => setShowReviewModal(true)}
              className="
                group
                inline-flex
                items-center
                gap-3
                bg-[#9C7A6B]
                text-white
                text-sm
                font-semibold
                tracking-wide
                pl-7
                pr-2
                py-2
                rounded-full
                hover:bg-[#8a6a5c]
                transition-colors
              "
            >
              Write A Review
              <span
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-white/20
                  flex
                  items-center
                  justify-center
                  group-hover:bg-white/30
                  transition-colors
                "
              >
                <FiChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* REVIEW LIST */}

          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {displayedReviews.map((review) => {
              const myVote = votedReviews[review.id];

              return (
                <div key={review.id} className="py-7">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className="text-xs font-bold tracking-wide text-[#241F1C] uppercase">
                      {review.name}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {review.date}
                    </span>
                  </div>

                  <Stars rating={review.rating} size="text-sm mb-3" />

                  {review.title && (
                    <p className="text-sm font-bold text-[#241F1C] mb-1.5">
                      {review.title}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>

                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.images.map((img, i) => (
                        <div
                          key={i}
                          className="
                            w-14
                            h-14
                            rounded-md
                            overflow-hidden
                            bg-gray-100
                            shrink-0
                          "
                        >
                          <img
                            src={img}
                            alt={`${review.name} review photo ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-xs text-gray-500">
                      Was this review helpful?
                    </span>

                    <button
                      onClick={() => handleVote(review.id, "helpful")}
                      disabled={!!myVote}
                      className={`
                        flex items-center gap-1 text-xs
                        ${
                          myVote === "helpful"
                            ? "text-[#4B0F14]"
                            : "text-gray-500 hover:text-[#4B0F14]"
                        }
                        disabled:cursor-default
                        transition-colors
                      `}
                    >
                      <FiThumbsUp className="w-3.5 h-3.5" />
                      {review.helpful}
                    </button>

                    <button
                      onClick={() => handleVote(review.id, "notHelpful")}
                      disabled={!!myVote}
                      className={`
                        flex items-center gap-1 text-xs
                        ${
                          myVote === "notHelpful"
                            ? "text-[#4B0F14]"
                            : "text-gray-500 hover:text-[#4B0F14]"
                        }
                        disabled:cursor-default
                        transition-colors
                      `}
                    >
                      <FiThumbsDown className="w-3.5 h-3.5" />
                      {review.notHelpful}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VIEW ALL / SHOW LESS */}

          {reviews.length > REVIEWS_PREVIEW_COUNT && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllReviews((v) => !v)}
                className="
                  border
                  border-[#4B0F14]
                  text-[#4B0F14]
                  px-6
                  py-2.5
                  text-sm
                  font-medium
                  rounded-full
                  hover:bg-[#4B0F14]
                  hover:text-white
                  transition-colors
                "
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
          WRITE A REVIEW MODAL
          ====================================================== */}

      <WriteReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />

      {/* ======================================================
          RELATED PRODUCTS
          ====================================================== */}

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="
              font-serif
              text-2xl
              text-center
              text-[#241F1C]
              tracking-wide
              mb-10
            "
          >
            PAIRS BEAUTIFULLY WITH
          </h2>

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-6
            "
          >
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/Products/${item.id}`}
                className="group block"
              >
                <div
                  className="
                    aspect-square
                    overflow-hidden
                    bg-gray-100
                    rounded-md
                    mb-3
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />
                </div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-gray-700
                    mb-1
                  "
                >
                  {item.name}
                </p>

                <p
                  className="
                    text-sm
                    text-[#9C7A4A]
                  "
                >
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </Link>
            ))}
          </div>
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