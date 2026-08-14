import React, { useState, useMemo } from "react";
import Navbar from "../components/common/Navbar";
import ProductCard from "../components/common/ProductCard";
import { FiFilter, FiX } from "react-icons/fi";

// ============================================================
// MOCK PRODUCT CATALOG
// ============================================================

const allProducts = [
  {
    id: 1,
    name: "Classic Gold Ring",
    category: "rings",
    material: "gold",
    price: 24999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 2,
    name: "Diamond Necklace",
    category: "necklaces",
    material: "gold",
    price: 45999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    isPremium: true,
  },
  {
    id: 3,
    name: "Gold Bangle Set",
    category: "bracelets",
    material: "gold",
    price: 28999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: 4,
    name: "Pearl Drop Earrings",
    category: "earrings",
    material: "silver",
    price: 8999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1605100804763-263566ae5e4d?w=600&q=80",
  },
  {
    id: 5,
    name: "Layered Gold Chain",
    category: "necklaces",
    material: "gold",
    price: 32999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 6,
    name: "Silver Hoop Earrings",
    category: "earrings",
    material: "silver",
    price: 3999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80",
  },
  {
    id: 7,
    name: "Minimal Silver Cuff",
    category: "bracelets",
    material: "silver",
    price: 5999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 8,
    name: "Diamond Solitaire Ring",
    category: "rings",
    material: "gold",
    price: 55999,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    isPremium: true,
  },
  {
    id: 9,
    name: "Rose Gold Pendant",
    category: "necklaces",
    material: "gold",
    price: 9999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  {
    id: 10,
    name: "Silver Chain Necklace",
    category: "necklaces",
    material: "silver",
    price: 5999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 11,
    name: "Twisted Gold Band",
    category: "rings",
    material: "gold",
    price: 17999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 12,
    name: "Silver Pendant",
    category: "necklaces",
    material: "silver",
    price: 6999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=600&q=80",
    isPremium: true,
  },
  {
    id: 13,
    name: "Demi-Fine Layered Necklace",
    category: "necklaces",
    material: "demi-fine",
    price: 4999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: 14,
    name: "Demi-Fine Stacking Ring",
    category: "rings",
    material: "demi-fine",
    price: 2999,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
];

const categories = [
  "rings",
  "necklaces",
  "earrings",
  "bracelets",
];

const materials = [
  "gold",
  "silver",
  "demifine",
];

// ============================================================
// PRODUCTS
// ============================================================

const Products = () => {
  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedMaterials, setSelectedMaterials] =
    useState([]);

  const [maxPrice, setMaxPrice] =
    useState(60000);

  const [premiumOnly, setPremiumOnly] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("featured");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  // ==========================================================
  // CATEGORY
  // ==========================================================

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  // ==========================================================
  // MATERIAL
  // ==========================================================

  const toggleMaterial = (mat) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat)
        ? prev.filter((m) => m !== mat)
        : [...prev, mat]
    );
  };

  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMaxPrice(60000);
    setPremiumOnly(false);
  };

  // ==========================================================
  // FILTER PRODUCTS
  // ==========================================================

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(p.material);

      const priceMatch =
        p.price <= maxPrice;

      const premiumMatch =
        !premiumOnly || p.isPremium;

      return (
        categoryMatch &&
        materialMatch &&
        priceMatch &&
        premiumMatch
      );
    });

    // SORT

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [
    selectedCategories,
    selectedMaterials,
    maxPrice,
    premiumOnly,
    sortBy,
  ]);

  // ==========================================================
  // ACTIVE FILTER COUNT
  // ==========================================================

  const activeFilterCount =
    selectedCategories.length +
    selectedMaterials.length +
    (maxPrice < 60000 ? 1 : 0) +
    (premiumOnly ? 1 : 0);

  // ==========================================================
  // FILTER SIDEBAR
  // ==========================================================

  const FilterSidebar = () => (
    <div className="space-y-8">

      {/* FILTER HEADER */}

      <div className="flex items-center justify-between">

        <h3 className="font-serif text-lg text-[#2E2E2E]">
          Filters
        </h3>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="
              text-xs
              text-[#B76E79]
              hover:text-[#9F5965]
              hover:underline
              transition-colors
            "
          >
            Clear all
          </button>
        )}

      </div>

      {/* ======================================================
          CATEGORY
          ====================================================== */}

      <div>

        <h4
          className="
            text-xs
            uppercase
            tracking-wide
            text-[#6B6B6B]
            font-medium
            mb-3
          "
        >
          Category
        </h4>

        <div className="space-y-2">

          {categories.map((cat) => (
            <label
              key={cat}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-[#444444]
                cursor-pointer
                hover:text-[#B76E79]
                transition-colors
              "
            >

              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="
                  accent-[#B76E79]
                  w-4
                  h-4
                "
              />

              <span className="capitalize">
                {cat}
              </span>

            </label>
          ))}

        </div>

      </div>

      {/* ======================================================
          MATERIAL
          ====================================================== */}

      <div>

        <h4
          className="
            text-xs
            uppercase
            tracking-wide
            text-[#6B6B6B]
            font-medium
            mb-3
          "
        >
          Material
        </h4>

        <div className="space-y-2">

          {materials.map((mat) => (
            <label
              key={mat}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-[#444444]
                cursor-pointer
                hover:text-[#B76E79]
                transition-colors
              "
            >

              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="
                  accent-[#B76E79]
                  w-4
                  h-4
                "
              />

              <span className="capitalize">
                {mat}
              </span>

            </label>
          ))}

        </div>

      </div>

      {/* ======================================================
          PREMIUM
          ====================================================== */}

      <div>

        <h4
          className="
            text-xs
            uppercase
            tracking-wide
            text-[#6B6B6B]
            font-medium
            mb-3
          "
        >
          Availability
        </h4>

        <label
          className="
            flex
            items-center
            gap-2
            text-sm
            text-[#444444]
            cursor-pointer
            hover:text-[#B76E79]
            transition-colors
          "
        >

          <input
            type="checkbox"
            checked={premiumOnly}
            onChange={() =>
              setPremiumOnly((prev) => !prev)
            }
            className="
              accent-[#B76E79]
              w-4
              h-4
            "
          />

          <span>
            Premium only
          </span>

        </label>

      </div>

      {/* ======================================================
          PRICE
          ====================================================== */}

      <div>

        <h4
          className="
            text-xs
            uppercase
            tracking-wide
            text-[#6B6B6B]
            font-medium
            mb-3
          "
        >
          Max Price: ₹
          {maxPrice.toLocaleString("en-IN")}
        </h4>

        <input
          type="range"
          min="2000"
          max="60000"
          step="1000"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="
            w-full
            accent-[#B76E79]
          "
        />

        <div className="flex justify-between mt-2">

          <span className="text-[11px] text-[#888888]">
            ₹2,000
          </span>

          <span className="text-[11px] text-[#888888]">
            ₹60,000
          </span>

        </div>

      </div>

    </div>
  );

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <>
      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <div
        className="
          border-b
          border-[#E8DDD3]
          text-[#2E2E2E]
        "
      >
        <Navbar />
      </div>

      {/* ======================================================
          PAGE TITLE
          ====================================================== */}

      <div className="text-center py-8 px-6">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-[#B76E79]
            mb-2
          "
        >
          Discover Your Style
        </p>

        <h1
          className="
            text-3xl
            md:text-4xl
            font-serif
            font-normal
            text-[#2E2E2E]
          "
        >
          All Products
        </h1>

        <div
          className="
            w-12
            h-px
            bg-[#B76E79]
            mx-auto
            mt-4
          "
        />

      </div>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          pb-20
        "
      >

        {/* ====================================================
            MOBILE FILTER + SORT
            ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-6
            lg:hidden
          "
        >

          <button
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              border
              border-[#E8DDD3]
              rounded-full
              px-4
              py-2
              text-[#444444]
              hover:border-[#B76E79]
              hover:text-[#B76E79]
              transition-colors
            "
          >

            <FiFilter
              className="
                w-4
                h-4
                text-[#B76E79]
              "
            />

            Filters

            {activeFilterCount > 0 &&
              ` (${activeFilterCount})`}

          </button>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
              text-sm
              border
              border-[#E8DDD3]
              rounded-full
              px-3
              py-2
              bg-[#FAF7F4]
              text-[#444444]
              outline-none
              focus:border-[#B76E79]
            "
          >

            <option value="featured">
              Featured
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Top Rated
            </option>

          </select>

        </div>

        {/* ====================================================
            GRID
            ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[220px_1fr]
            gap-10
            items-start
          "
        >

          {/* ==================================================
              DESKTOP SIDEBAR
              ================================================== */}

          <aside
            className="
              hidden
              lg:block
              sticky
              top-24
              self-start
            "
          >
            <FilterSidebar />
          </aside>

          {/* ==================================================
              MOBILE FILTER DRAWER
              ================================================== */}

          {mobileFiltersOpen && (
            <div
              className="
                fixed
                inset-0
                z-50
                lg:hidden
              "
            >

              {/* BACKDROP */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#2E2E2E]/40
                "
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              />

              {/* DRAWER */}

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-72
                  bg-[#FFFFFF]
                  border-l
                  border-[#E8DDD3]
                  p-6
                  overflow-y-auto
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-6
                  "
                >

                  <h3
                    className="
                      font-serif
                      text-lg
                      text-[#2E2E2E]
                    "
                  >
                    Filters
                  </h3>

                  <button
                    onClick={() =>
                      setMobileFiltersOpen(false)
                    }
                    className="
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-[#FAF7F4]
                      text-[#444444]
                      hover:bg-[#F5E8EA]
                      hover:text-[#B76E79]
                      transition-colors
                    "
                  >

                    <FiX className="w-5 h-5" />

                  </button>

                </div>

                <FilterSidebar />

              </div>

            </div>
          )}

          {/* ==================================================
              PRODUCTS
              ================================================== */}

          <div>

            {/* DESKTOP SORT */}

            <div
              className="
                hidden
                lg:flex
                items-center
                justify-between
                mb-6
                pb-4
                border-b
                border-[#E8DDD3]
              "
            >

              <p className="text-sm text-[#777777]">
                {filteredProducts.length} products
              </p>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  text-sm
                  border
                  border-[#E8DDD3]
                  rounded-full
                  px-4
                  py-2
                  bg-[#FFFFFF]
                  text-[#444444]
                  outline-none
                  focus:border-[#B76E79]
                "
              >

                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Rated
                </option>

              </select>

            </div>

            {/* EMPTY STATE */}

            {filteredProducts.length === 0 ? (

              <div
                className="
                  text-center
                  py-20
                  border
                  border-[#E8DDD3]
                  rounded-2xl
                  bg-[#FAF7F4]
                "
              >

                <p className="text-sm text-[#777777]">
                  No products match your filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="
                    mt-4
                    text-sm
                    text-[#B76E79]
                    hover:underline
                  "
                >
                  Clear filters
                </button>

              </div>

            ) : (

              /* PRODUCT GRID */

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  gap-x-4
                  gap-y-8
                  sm:gap-6
                "
              >

                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Products;