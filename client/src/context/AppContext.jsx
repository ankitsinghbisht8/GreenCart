//This file is for global state management for variables and functions
//This code sets up a global state management system in React using the Context API. It allows different components in your React app to share variables and functions without having to pass them manually as props.
// createContext()--> Creates a context object
// AppContextProvider--> Provides the shared data/functions to children
// useAppContext()--> Custom hook to access context easily
// value--> The object containing variables and functions you want globally accessible

import { createContext, useContext , useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate(); // now i can access this components anywhere
    const [user,setUser]= useState(null);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserLogin,setShowUserLogin]= useState(false);
    const value = {navigate,user,isSeller,setUser,setIsSeller,showUserLogin,setShowUserLogin};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}