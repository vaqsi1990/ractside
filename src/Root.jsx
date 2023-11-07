import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './parts/Navbar'

export default function Root() {
  return (
    <div>
        
      <Outlet/> 
    </div>
  )
}
