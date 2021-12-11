import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './Sidebar'

const Header = () => {
    return (
            <header>
                <Sidebar/>
                <h1>Recipe Management App</h1>
                <hr />
                {/* <div className="links">
                    <NavLink to="/" className="link">Recipe List</NavLink>
                    <NavLink to="/add" className="link">Add Recipe</NavLink>
                </div> */}
            </header>
    )
};

export default Header;