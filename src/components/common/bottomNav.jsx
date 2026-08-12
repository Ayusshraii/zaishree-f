import { Heart, StoreIcon, ShoppingBag, HomeIcon, User2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const stores = [
  { id: "silver", label: "925 Silver", path: "/" },
  { id: "gold", label: "Gold", path: "/gold" },
  { id: "demifine", label: "Demi-Fine", path: "/demifine" },
];

export default function MobileBottomNav({
  cartCount = 0,
  wishlistCount = 0,
  currentStore = "silver",
  onStoreChange,
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const current = stores.find((s) => s.id === currentStore) || stores[0];
  const isHome = location.pathname === "/";
  const isProfile = location.pathname === "/profile";

  const handleStoreSelect = (storeId) => {
    onStoreChange?.(storeId);
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F7F3EA] border-t border-[#EFE6D8] md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center py-2">
          {/* STORE SWITCHER TRIGGER */}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-center gap-1 text-xs text-[#6B6858]"
          >
            <StoreIcon size={22} strokeWidth={1.6} />
            <span>{current.label}</span>
          </button>

          {/* HOME */}
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 text-xs ${
              isHome ? "text-[#7A2E42]" : "text-[#6B6858]"
            }`}
          >
            <HomeIcon size={22} strokeWidth={1.6} />
            <span>Home</span>
          </Link>

          {/* WISHLIST */}
          <Link to="/wishlist" className="relative flex flex-col items-center gap-1 text-xs">
            <div className="relative">
              <Heart
                size={22}
                strokeWidth={1.6}
                className={
                  location.pathname === "/wishlist" ? "text-[#7A2E42]" : "text-[#6B6858]"
                }
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-[3px] flex items-center justify-center rounded-full bg-[#7A2E42] text-white text-[10px] font-medium">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </div>
            <span
              className={location.pathname === "/wishlist" ? "text-[#7A2E42]" : "text-[#6B6858]"}
            >
              Wishlist
            </span>
          </Link>

          {/* CART */}
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-xs">
            <div className="relative">
              <ShoppingBag
                size={22}
                strokeWidth={1.6}
                className={location.pathname === "/cart" ? "text-[#7A2E42]" : "text-[#6B6858]"}
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-[3px] flex items-center justify-center rounded-full bg-[#7A2E42] text-white text-[10px] font-medium">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            <span className={location.pathname === "/cart" ? "text-[#7A2E42]" : "text-[#6B6858]"}>
              Cart
            </span>
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 text-xs ${
              isProfile ? "text-[#7A2E42]" : "text-[#6B6858]"
            }`}
          >
            <User2 size={22} strokeWidth={1.6} />
            <span>Profile</span>
          </Link>
        </div>
      </nav>

      {/* STORE SWITCHER SHEET */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
            <h3 className="font-serif text-lg text-[#141311] mb-3 text-center">Choose Store</h3>
            <div className="space-y-2">
              {stores.map((store) => (
                <Link
                  key={store.id}
                  to={store.path}
                  onClick={() => handleStoreSelect(store.id)}
                  className={`block w-full text-center py-3 rounded-full text-sm font-medium ${
                    store.id === currentStore
                      ? "bg-[#7A2E42] text-white"
                      : "bg-[#F7F3EA] text-[#333333]"
                  }`}
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