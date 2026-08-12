import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";

// Matches other price displays in the app (see ProductDetail.jsx).
const formatINR = (value) =>
  Math.round(value).toLocaleString("en-IN");

// Column widths shared by the header row and every data row, so
// everything lines up. Component gets the most space; the other
// three columns are roughly even.
const GRID_COLS = "grid-cols-[2fr_1fr_1fr_1.3fr]";

// ============================================================
// PRICE BREAKUP CARD
// ------------------------------------------------------------
// Two tabs:
//   - "breakup": the Component/Rate/Weight/Final Value table +
//     the highlighted total bar + "View in Detail" link
//   - "details": a compact spec list (reuses the same
//     [label, value] rows as the full Product Details tab further
//     down the page, passed in as `productDetails`)
//
// Everything shown on the breakup tab comes from the `priceBreakup`
// prop (see priceBreakupService.js for the shape) — this component
// has no pricing logic of its own, so an admin editing a row on the
// backend is all it takes to change what renders here.
//
// Props:
//   priceBreakup   - { productName, components[], total } or null
//                     while loading
//   loading        - true while priceBreakup is being fetched
//   productDetails - [[label, value], ...] for the Product Details tab
//   onViewDetail   - optional, called (in addition to switching to
//                    the details tab) when "View in Detail" is clicked
// ============================================================
const PriceBreakupCard = ({
  priceBreakup,
  loading = false,
  productDetails = [],
  onViewDetail,
}) => {
  const [tab, setTab] = useState("breakup");

  const tabButtonClass = (isActive) =>
    `flex-1 py-2 rounded-full text-sm font-medium text-center transition-colors ${
      isActive
        ? "bg-gradient-to-r from-[#D9B872] to-[#F5EBD8] text-[#241F1C]"
        : "text-gray-500 hover:text-[#241F1C]"
    }`;

  return (
    <div className="rounded-2xl border border-[#E8DFD0] bg-white shadow-sm p-5">
      {/* TAB SWITCH */}
      <div className="flex items-center gap-1 rounded-full border border-[#E8DFD0] p-1 mb-4">
        <button
          type="button"
          onClick={() => setTab("breakup")}
          className={tabButtonClass(tab === "breakup")}
        >
          Price Breakup
        </button>

        <button
          type="button"
          onClick={() => setTab("details")}
          className={tabButtonClass(tab === "details")}
        >
          Product Details
        </button>
      </div>

      {/* LOADING STATE — shown while the price-breakup API call is
          in flight, so the card doesn't flash empty/broken content. */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>
      )}

      {/* PRICE BREAKUP TAB */}
      {!loading &&
        tab === "breakup" &&
        (Array.isArray(priceBreakup?.components) && priceBreakup?.total ? (
          <>
            <h3 className="font-semibold text-[#241F1C] mb-4">
              {priceBreakup.productName}
            </h3>

            {/* HEADER ROW */}
            <div
              className={`grid ${GRID_COLS} gap-2 pb-2 text-xs font-semibold text-[#9C7A4A]`}
            >
              <span>Component</span>
              <span>Rate</span>
              <span className="flex items-center gap-1">
                Weight
                <FiInfo
                  className="w-3 h-3 shrink-0"
                  title="Weight of this component in the finished piece"
                />
              </span>
              <span className="flex items-center gap-1">
                Final Value
                <FiInfo
                  className="w-3 h-3 shrink-0"
                  title="Value after any applicable discount"
                />
              </span>
            </div>

            {/* COMPONENT ROWS — purely driven by priceBreakup.components,
                so adding/removing/reordering rows is a backend change,
                not a frontend one. */}
            {priceBreakup.components.map((component) => (
              <div
                key={component.id}
                className={`grid ${GRID_COLS} gap-2 py-2 text-sm ${
                  component.bold
                    ? "font-semibold text-[#241F1C]"
                    : "text-gray-700"
                }`}
              >
                <span>{component.label}</span>
                <span>{component.rate}</span>
                <span>{component.weight}</span>
                <span>
                  {component.originalValue != null && (
                    <span className="line-through text-gray-400 mr-1">
                      ₹{formatINR(component.originalValue)}
                    </span>
                  )}
                  {component.value != null &&
                    `₹${formatINR(component.value)}`}
                </span>
              </div>
            ))}

            {/* TOTAL BAR — bleeds to the card's edges (negative margin
                matches the card's own padding) and picks up the card's
                rounded bottom corners. */}
            <div className="-mx-5 -mb-5 mt-3 px-5 py-4 bg-[#F7F1E4] rounded-b-2xl flex items-center justify-between">
              <span className="font-semibold text-[#241F1C]">
                Total (Incl. of all taxes)
              </span>

              <span className="flex items-baseline gap-2">
                {priceBreakup.total.originalValue != null && (
                  <span className="line-through text-gray-400 text-sm">
                    ₹{formatINR(priceBreakup.total.originalValue)}
                  </span>
                )}
                <span className="font-semibold text-lg text-[#241F1C]">
                  ₹{formatINR(priceBreakup.total.value)}
                </span>
              </span>
            </div>

       
             
          </>
        ) : (
          // FIX: previously this whole tab crashed with
          // "Cannot read properties of undefined (reading 'map')"
          // whenever `priceBreakup` was truthy but didn't actually
          // have the expected `{ components: [], total: {} }` shape
          // (e.g. a real backend response that doesn't match the
          // documented contract yet, or an unexpected error payload).
          // Fail soft instead of crashing the whole component.
          <p className="text-sm text-gray-500 py-4">
            Price breakup isn't available for this product right now.
          </p>
        ))}


      {/* PRODUCT DETAILS TAB — reuses the same rows shown in the
          full-width Product Details tab further down the page. */}
      {!loading && tab === "details" && (
        <div className="divide-y divide-gray-100">
          {productDetails.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between py-2.5 text-sm"
            >
              <span className="text-gray-500">{label}</span>
              <span className="text-[#241F1C] font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceBreakupCard;