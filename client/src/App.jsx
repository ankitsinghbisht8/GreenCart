import React, { use } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import { AllProducts } from './pages/AllProducts'


const App = () => {

  const isSellerPath= useLocation().pathname.includes('/seller'); //this will check if the current path includes '/seller'
  const {showUserLogin}=useAppContext();
  return (
    <div>
      {/* This conditionally renders the Navbar component only if the current path does not include '/seller'. */}
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ?<Login/> : null}
      <Toaster />
      <div className={`${isSellerPath ?"":"px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40"}`}> 
        {/* This conditionally applies padding based on the current path. If the path includes '/seller', no padding is applied, otherwise, it applies the specified padding. */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProducts/>}/>
        </Routes>
      </div>

      {!isSellerPath && <Footer/>}
      
    </div>
  )
}

export default App