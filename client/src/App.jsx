import React, { use } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const isSellerPath= useLocation().pathname.includes('/seller'); //this will check if the current path includes '/seller'
  return (
    <div>
      {/* This conditionally renders the Navbar component only if the current path does not include '/seller'. */}
      {isSellerPath ? null : <Navbar />}
      <Toaster />
      <div className={`${isSellerPath ?"":"px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40"}`}> 
        {/* This conditionally applies padding based on the current path. If the path includes '/seller', no padding is applied, otherwise, it applies the specified padding. */}
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App