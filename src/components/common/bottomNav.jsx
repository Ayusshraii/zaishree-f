import {
  Heart,
  StoreIcon,
  ShoppingBag,
  HomeIcon,
  User2,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

// ============================================================
// STORE CONFIG
// SAME AS YOUR DESKTOP SWITCH
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
  const [open, setOpen] =
    useState(false);

  const location =
    useLocation();

  // ==========================================================
  // DETERMINE CURRENT STORE
  // SAME LOGIC AS DESKTOP SWITCH
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
    stores.find(
      (store) =>
        store.id === selected
    ) || stores[0];

  // ==========================================================
  // ACTIVE ROUTES
  // ==========================================================

  const isHome =
    location.pathname === "/";

  const isWishlist =
    location.pathname ===
    "/wishlist";

  const isCart =
    location.pathname ===
    "/cart";

  const isProfile =
    location.pathname ===
    "/profile";

  // ==========================================================
  // STORE SELECT
  // ==========================================================

  const handleStoreSelect = (
    storeId
  ) => {
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
          bg-[#F7F3EA]
          border-t
          border-[#EFE6D8]
          md:hidden
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <div
          className="
            grid
            grid-cols-5
            items-center
            py-2
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
              text-xs
              ${
                isHome
                  ? "text-[#7A2E42]"
                  : "text-[#6B6858]"
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
            className="
              relative
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-xs
            "
          >
            <div className="relative">
              <Heart
                size={22}
                strokeWidth={1.6}
                className={
                  isWishlist
                    ? "text-[#7A2E42]"
                    : "text-[#6B6858]"
                }
              />

              {wishlistCount >
                0 && (
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
                    bg-[#7A2E42]
                    text-white
                    text-[10px]
                    font-medium
                  "
                >
                  {wishlistCount >
                  9
                    ? "9+"
                    : wishlistCount}
                </span>
              )}
            </div>

            <span
              className={
                isWishlist
                  ? "text-[#7A2E42]"
                  : "text-[#6B6858]"
              }
            >
              Wishlist
            </span>
          </Link>

          {/* ==================================================
              STORE SWITCHER
              CENTER BUTTON
              ================================================== */}

          <button
            type="button"
            onClick={() =>
              setOpen(true)
            }
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-xs
              text-[#6B6858]
            "
          >
            <StoreIcon
              size={22}
              strokeWidth={1.6}
              className="text-[#7A2E42]"
            />

            <span>
              {current.shortLabel}
            </span>
          </button>

          {/* ==================================================
              CART
              ================================================== */}

          <Link
            to="/cart"
            className="
              relative
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-xs
            "
          >
            <div className="relative">
              <ShoppingBag
                size={22}
                strokeWidth={1.6}
                className={
                  isCart
                    ? "text-[#7A2E42]"
                    : "text-[#6B6858]"
                }
              />

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
                    bg-[#7A2E42]
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
                  ? "text-[#7A2E42]"
                  : "text-[#6B6858]"
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
              text-xs
              ${
                isProfile
                  ? "text-[#7A2E42]"
                  : "text-[#6B6858]"
              }
            `}
          >
            <User2
              size={22}
              strokeWidth={1.6}
            />

            <span>
              Profile
            </span>
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
          {/* BACKDROP */}

          <div
            className="
              absolute
              inset-0
              bg-black/40
            "
            onClick={() =>
              setOpen(false)
            }
          />

          {/* SHEET */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              bg-white
              rounded-t-2xl
              p-4
              pb-[calc(env(safe-area-inset-bottom)+16px)]
            "
          >
            {/* DRAG HANDLE */}

            <div
              className="
                w-10
                h-1
                rounded-full
                bg-gray-300
                mx-auto
                mb-4
              "
            />

            <h3
              className="
                font-serif
                text-lg
                text-[#141311]
                mb-4
                text-center
              "
            >
              Choose Store
            </h3>

            {/* ==================================================
                SAME ORDER AS DESKTOP SWITCH
                GOLD → SILVER → DEMIFINE
                ================================================== */}

            <div className="space-y-2">
              {stores.map(
                (store) => (
                  <Link
                    key={store.id}
                    to={store.path}
                    onClick={() =>
                      handleStoreSelect(
                        store.id
                      )
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
                        store.id ===
                        selected
                          ? "bg-[#7A2E42] text-white"
                          : "bg-[#F7F3EA] text-[#333333]"
                      }
                    `}
                  >
                    {store.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}