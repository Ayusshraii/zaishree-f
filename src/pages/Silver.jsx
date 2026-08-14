import React from 'react'
import Navbar from '../components/common/Navbar'
import Banner from '../components/common/banner'
import CategoryPage from './CategoryPage'
import ShopByCategory from '../components/common/categories'
import HomeSections from '../components/common/HomeSecrion'
import ShopByBond from '../components/common/Shopbybond'
import Subscription from './Subscription'
import Shopbycolor from '../components/common/ShopbyColor'
import OurPromises from '../components/common/Promise'
import Footer from '../components/common/Footer'

const Gold = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <ShopByCategory/>
       <HomeSections  className=''/>
       <OurPromises/>
       <Shopbycolor/>
       <ShopByBond className=''/>
       <Footer/>
    </div>
  )
}

export default Gold
