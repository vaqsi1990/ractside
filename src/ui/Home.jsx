import React from 'react'
import Navbar from '../parts/Navbar'
import Middle from '../parts/Middle'
import Hero from '../parts/Hero'
import Filter from '../parts/filter/Filter'
import Footer from '../parts/Footer'
import './home.css'


 function Home() {
  return (
    <div style={{backgroundColor: '#0b0c2a'}}>

      <Navbar />
      <Hero/>
    
      <Middle />
      <Footer />
    </div>
    
  )
}


export default Home