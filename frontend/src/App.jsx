import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
  
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Feed from "../../front/src/components/pages/Feed";

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ='/' element = {Home} />
                <Route path ='/login' element = {Login} />
                <Route path ='/profil' element = {Profil} />
                <Route path ='/feed' element = {Feed} />
            </Routes>
        </BrowserRouter>
    )
}

export default index