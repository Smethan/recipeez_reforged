import React from "react";
import { bubble as Menu } from 'react-burger-menu';
import '../Sidebar.css'

const Sidebar = () => {
    return (
        <Menu>
            <a className='menu-item' href='/'>Home</a>
            <a className='menu-item' href='/add'>Add Recipe</a>
            <a className='menu-item' href='/recipes'>Your Recipes</a>
        </Menu>
    );
}

export default Sidebar;