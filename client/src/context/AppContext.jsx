//This file is for global state management for variables and functions
//This code sets up a global state management system in React using the Context API. It allows different components in your React app to share variables and functions without having to pass them manually as props.
// createContext()--> Creates a context object
// AppContextProvider--> Provides the shared data/functions to children
// useAppContext()--> Custom hook to access context easily
// value--> The object containing variables and functions you want globally accessible

import { createContext, useContext , useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency=import.meta.env.VITE_CURRENCY; // this is how we can access the environment variables in react

    const navigate = useNavigate(); // now i can access this components anywhere
    const [user,setUser]= useState(null);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserLogin,setShowUserLogin]= useState(false);
    const [products,setProducts]= useState([]);
    const [cartItems,setCartItems]= useState({});

    //Fetch products from dummy data or API
    const fetchProducts = async()=>{
        setProducts(dummyProducts);
    }
    //Add product to cart 
    const addToCart= (itemId)=>{
        let cartData= structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1; // Increment quantity if item already exists
        }
        else{
            cartData[itemId] = 1; // Add new item with quantity 1
        }
        setCartItems(cartData);
        toast.success("Item added to cart successfully!");
    }

    //Update cart item quantity
    const updateCartItem = (itemId , quantity) => {
        let cartData =structuredClone(cartItems);
        cartItems[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated successfully!");
    }

    //remove item from cart
    const removeCartItem=(itemId)=>{
        let cartData= structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1; // Remove item from cart
            if(cartData[itemId] <= 0) {
                delete cartData[itemId]; // If quantity is 0, remove item from cart
            }
        }
        toast.success("Removed from cart!");
        setCartItems(cartData);
    }
    
    useEffect(()=>{
        fetchProducts();
    },[])

    const value = {navigate,user,isSeller,setUser,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeCartItem,cartItems};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}