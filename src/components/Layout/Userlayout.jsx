import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Banner from '../common/banner'
import HomeSections from '../common/HomeSecrion'
import ShopByBond from '../common/Shopbybond'
import ShopByCategory from '../common/categories'
import Reviews from '../common/Review'
import MobileBottomNav from '../common/bottomNav'
import Promise from '../common/Promise'
import ShopByColor from '../common/ShopbyColor'


const Userlayout = () => {
  return (
   <>
 <div className='border-b-1 border-gray-300'><Header/></div>
 <div className=''><Banner /></div> 
 <ShopByCategory className=''/>
  <HomeSections  className=''/>
  <Banner
  type="sale"
  height="h-[280px] md:h-[400px]"
  autoPlay={true}
  interval={3500}
/>
  <Promise/>
  <ShopByColor/>
  <ShopByBond className=''/>

 <Footer/>
   </>
  )
}

export default Userlayout
