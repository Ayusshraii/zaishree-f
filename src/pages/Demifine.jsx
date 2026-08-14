import React from "react";

import Navbar from "../components/common/Navbar";
import Banner from "../components/common/banner";
import ShopByCategory from "../components/common/categories";
import HomeSections from "../components/common/HomeSecrion";
import ShopByBond from "../components/common/Shopbybond";
import Footer from "../components/common/Footer";
import ShopByColor from "../components/common/ShopbyColor";
import OurPromises from "../components/common/Promise";

const Demifine = () => {
  return (
    <div className="pb-[80px] md:pb-0">
      <Navbar />

      <Banner />

      <ShopByCategory />

      <HomeSections />

      <OurPromises />

      <ShopByColor />

      <ShopByBond />

      <Footer />
    </div>
  );
};

export default Demifine;