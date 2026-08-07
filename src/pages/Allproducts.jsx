import React, { useState, useMemo } from "react";
import Navbar from "../components/common/Navbar";
import ProductCard from "../components/common/ProductCard";
import { FiFilter, FiX } from "react-icons/fi";

// mock product catalog — swap for a real API call later
const allProducts = [
  { id: 1, name: "Classic Gold Ring", category: "rings", material: "gold", price: 24999, rating: 4.8, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80" },
  { id: 2, name: "Diamond Necklace", category: "necklaces", material: "gold", price: 45999, rating: 4.9, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { id: 3, name: "Gold Bangle Set", category: "bracelets", material: "gold", price: 28999, rating: 4.6, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" },
  { id: 4, name: "Pearl Drop Earrings", category: "earrings", material: "silver", price: 8999, rating: 4.7, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
  { id: 5, name: "Layered Gold Chain", category: "necklaces", material: "gold", price: 32999, rating: 4.7, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80" },
  { id: 6, name: "Silver Hoop Earrings", category: "earrings", material: "silver", price: 3999, rating: 4.9, image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80" },
  { id: 7, name: "Minimal Silver Cuff", category: "bracelets", material: "silver", price: 5999, rating: 4.5, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80" },
  { id: 8, name: "Diamond Solitaire Ring", category: "rings", material: "gold", price: 55999, rating: 5.0, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { id: 9, name: "Rose Gold Pendant", category: "necklaces", material: "gold", price: 9999, rating: 4.7, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { id: 10, name: "Silver Chain Necklace", category: "necklaces", material: "silver", price: 5999, rating: 4.8, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80" },
  { id: 11, name: "Twisted Gold Band", category: "rings", material: "gold", price: 17999, rating: 4.6, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80" },
  { id: 12, name: "Silver Pendant", category: "necklaces", material: "silver", price: 6999, rating: 4.5, image: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=600&q=80" },
];

const categories = ["rings", "necklaces", "earrings", "bracelets"];
const materials = ["gold", "silver"];

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleMaterial = (mat) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMaxPrice(60000);
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const materialMatch =
        selectedMaterials.length === 0 || selectedMaterials.includes(p.material);
      const priceMatch = p.price <= maxPrice;
      return categoryMatch && materialMatch && priceMatch;
    });

    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategories, selectedMaterials, maxPrice, sortBy]);

  const activeFilterCount =
    selectedCategories.length + selectedMaterials.length + (maxPrice < 60000 ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-[#141311]">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#C9A66B] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs uppercase tracking-wide text-[#6B6858] font-medium mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-[#141311]"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="text-xs uppercase tracking-wide text-[#6B6858] font-medium mb-3">
          Material
        </h4>
        <div className="space-y-2">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="accent-[#141311]"
              />
              <span className="capitalize">{mat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs uppercase tracking-wide text-[#6B6858] font-medium mb-3">
          Max Price: ₹{maxPrice.toLocaleString("en-IN")}
        </h4>
        <input
          type="range"
          min="2000"
          max="60000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#141311]"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="text-center text-bold text-3xl p-7 underline">
        All Products
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-14">
        {/* Mobile filter toggle + sort bar */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded-full px-4 py-2"
          >
            <FiFilter className="w-4 h-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-full px-3 py-2"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto">
                <div className="flex justify-end mb-4">
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Product grid */}
          <div>
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-full px-3 py-2"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-sm text-gray-500">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;