import {
  Heart,
  StoreIcon,
  ShoppingBag,
  HomeIcon,
  User2,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

// ============================================================
// STORE CONFIG
// ============================================================

const stores = [
  {
    id: "gold",
    label: "Gold Jewellery",
    shortLabel: "Gold",
    path: "/",
  },
  {
    id: "silver",
    label: "Silver Jewellery",
    shortLabel: "Silver",
    path: "/silver",
  },
  {
    id: "demifine",
    label: "Demifine Jewellery",
    shortLabel: "Demifine",
    path: "/demifine",
  },
];

// ============================================================
// MOBILE BOTTOM NAV
// ============================================================

export default function MobileBottomNav({
  cartCount = 0,
  wishlistCount = 0,
  currentStore,
  onStoreChange,
}) {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  // ==========================================================
  // DETERMINE CURRENT STORE
  // ==========================================================

  const routeMap = {
    "/": "gold",
    "/silver": "silver",
    "/demifine": "demifine",
  };

  const selected =
    routeMap[location.pathname] ||
    currentStore ||
    "silver";

  const current =
    stores.find((store) => store.id === selected) || stores[0];

  // ==========================================================
  // ACTIVE ROUTES
  // ==========================================================

  const isHome = location.pathname === "/";

  const isWishlist =
    location.pathname === "/wishlist";

  const isCart =
    location.pathname === "/cart";

  const isProfile =
    location.pathname === "/profile";

  // ==========================================================
  // STORE SELECT
  // ==========================================================

  const handleStoreSelect = (storeId) => {
    onStoreChange?.(storeId);
    setOpen(false);
  };

  return (
    <>
      {/* ======================================================
          MOBILE BOTTOM NAV
          ====================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-white
          border-t
          border-[#E8DDD3]
          md:hidden
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <div
          className="
            grid
            grid-cols-5
            items-center
            h-[64px]
            px-1
          "
        >
          {/* ==================================================
              HOME
              ================================================== */}

          <Link
            to="/"
            className={`
              flex
              flex-col
              items-center
              justify-center
              gap-1
              h-full
              text-xs
              transition-colors
              ${
                isHome
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            `}
          >
            <HomeIcon
              size={22}
              strokeWidth={1.6}
            />

            <span>Home</span>
          </Link>

          {/* ==================================================
              WISHLIST
              ================================================== */}

          <Link
            to="/wishlist"
            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              gap-1
              h-full
              text-xs
              transition-colors
              ${
                isWishlist
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            `}
          >
            <div className="relative">
              <Heart
                size={22}
                strokeWidth={1.6}
                className={
                  isWishlist
                    ? "text-[#B76E79]"
                    : "text-[#2E2E2E]/55"
                }
              />

              {/* Wishlist Count */}

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    min-w-[16px]
                    h-[16px]
                    px-[3px]
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B76E79]
                    text-white
                    text-[10px]
                    font-medium
                  "
                >
                  {wishlistCount > 9
                    ? "9+"
                    : wishlistCount}
                </span>
              )}
            </div>

            <span
              className={
                isWishlist
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            >
              Wishlist
            </span>
          </Link>

          {/* ==================================================
              STORE SWITCHER
              ================================================== */}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              h-full
              text-xs
              text-[#2E2E2E]/55
              transition-colors
            "
          >
            <StoreIcon
              size={22}
              strokeWidth={1.6}
              className="text-[#B76E79]"
            />

            {/* Always show Store */}

            <span>Store</span>
          </button>

          {/* ==================================================
              CART
              ================================================== */}

          <Link
            to="/cart"
            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              gap-1
              h-full
              text-xs
              transition-colors
              ${
                isCart
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            `}
          >
            <div className="relative">
              <ShoppingBag
                size={22}
                strokeWidth={1.6}
                className={
                  isCart
                    ? "text-[#B76E79]"
                    : "text-[#2E2E2E]/55"
                }
              />

              {/* Cart Count */}

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    min-w-[16px]
                    h-[16px]
                    px-[3px]
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B76E79]
                    text-white
                    text-[10px]
                    font-medium
                  "
                >
                  {cartCount > 9
                    ? "9+"
                    : cartCount}
                </span>
              )}
            </div>

            <span
              className={
                isCart
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            >
              Cart
            </span>
          </Link>

          {/* ==================================================
              PROFILE
              ================================================== */}

          <Link
            to="/profile"
            className={`
              flex
              flex-col
              items-center
              justify-center
              gap-1
              h-full
              text-xs
              transition-colors
              ${
                isProfile
                  ? "text-[#B76E79]"
                  : "text-[#2E2E2E]/55"
              }
            `}
          >
            <User2
              size={22}
              strokeWidth={1.6}
            />

            <span>Profile</span>
          </Link>
        </div>
      </nav>

      {/* ======================================================
          STORE SWITCHER BOTTOM SHEET
          ====================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            md:hidden
          "
        >
          {/* ==================================================
              BACKDROP
              ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-[#2E2E2E]/40
            "
            onClick={() => setOpen(false)}
          />

          {/* ==================================================
              SHEET
              ================================================== */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              bg-white
              rounded-t-2xl
              border-t
              border-[#E8DDD3]
              p-4
              pb-[calc(env(safe-area-inset-bottom)+16px)]
            "
          >
            {/* ==================================================
                DRAG HANDLE
                ================================================== */}

            <div
              className="
                w-10
                h-1
                rounded-full
                bg-[#E8DDD3]
                mx-auto
                mb-4
              "
            />

            {/* ==================================================
                TITLE
                ================================================== */}

            <h3
              className="
                font-serif
                text-lg
                text-[#2E2E2E]
                mb-4
                text-center
              "
            >
              Choose Store
            </h3>

            {/* ==================================================
                STORE OPTIONS
                ================================================== */}

            <div className="space-y-2">
              {stores.map((store) => (
                <Link
                  key={store.id}
                  to={store.path}
                  onClick={() =>
                    handleStoreSelect(store.id)
                  }
                  className={`
                    block
                    w-full
                    text-center
                    py-3
                    rounded-full
                    text-sm
                    font-medium
                    transition-all

                    ${
                      store.id === selected
                        ? `
                          bg-[#B76E79]
                          text-white
                        `
                        : `
                          bg-[#FAF7F4]
                          text-[#2E2E2E]
                          border
                          border-[#E8DDD3]
                          hover:bg-[#F5E8EA]
                          hover:text-[#B76E79]
                        `
                    }
                  `}
                >
                  {store.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}