import React from 'react'
import Navbar from '../components/common/Navbar'
import Banner from '../components/common/banner'
import CategoryPage from './CategoryPage'
import ShopByCategory from '../components/common/categories'
import HomeSections from '../components/common/HomeSecrion'
import ShopByBond from '../components/common/Shopbybond'
import Subscription from './Subscription'

const Demifine = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <ShopByCategory/>
       <HomeSections  className=''/>
       <ShopByBond className=''/>
       <Subscription className=''/>
    </div>
  )
}

export default Demifine
