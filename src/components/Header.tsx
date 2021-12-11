import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './Sidebar'
import SearchBar from "./SearchBar";

const Header = () => {
    return (
            <header>
                <Sidebar/>
                <SearchBar/>
                <hr />
            </header>
    )
};

export default Header;