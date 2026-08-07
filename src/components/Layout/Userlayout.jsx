import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Banner from '../common/banner'
import HomeSections from '../common/HomeSecrion'
import ShopByBond from '../common/Shopbybond'
import ShopByCategory from '../common/categories'
import Reviews from '../common/Review'


const Userlayout = () => {
  return (
   <>
 <div className='border-b-1 border-gray-300'><Header/></div>
 <div className=''><Banner /></div> 
 <ShopByCategory className=''/>
  <HomeSections  className=''/>
  <ShopByBond className=''/>
  <Reviews className=''/>
 <Footer/>
   </>
  )
}

export default Userlayout
