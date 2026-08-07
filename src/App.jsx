import { Routes, Route } from "react-router-dom";
import Userlayout from "./components/Layout/Userlayout";
import Subscription from "./pages/Subscription";
import Products from "./pages/Allproducts";
import ProductDetail from "./pages/Productdetail";
import { CartProvider } from "./context/Cartcontext";
import { WishlistProvider } from "./context/WishlistContext";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BondProducts from "./pages/Bondproducts";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Userlayout />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bond/:slug" element={<BondProducts />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
