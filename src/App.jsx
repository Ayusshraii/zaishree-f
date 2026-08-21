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
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BondProducts from "./pages/Bondproducts";
import Login from "./pages/login";
import Silver from "./pages/Silver";
import Demifine from "./pages/Demifine";
 import MobileBottomNav from "./components/common/bottomNav";
import { useState } from "react";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/common/ScrollToTop";
import About from "./pages/about";
import Contact from "./pages/contact";
import TermsAndConditions from "./pages/tnc"
import PrivacyPolicy from "./pages/privacy";
const App = () => {

  const[currentStore , setCurrentStore] = useState("silver")
  return (
    <AuthProvider>
        <ScrollToTop />

          <Routes>
            <Route path="/" element={<Userlayout />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bond/:slug" element={<BondProducts />} />
            <Route  path="/login" element={<Login />} />
            <Route path="/silver" element={<Silver/>} />
            <Route path="/demifine" element={<Demifine/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/about" element={<About/>}/>
             <Route path="/contact" element={<Contact/>}/>
             <Route path ="/TermsAndConditions" element={<TermsAndConditions/>}/>
             <Route path="/policy" element={<PrivacyPolicy />} />


          </Routes>

          <MobileBottomNav
          cartCount={0}
          wishlistCount={0}
          currentStore={currentStore}
          onStoreChange={setCurrentStore}/>
    </AuthProvider>
  );
};

export default App;
