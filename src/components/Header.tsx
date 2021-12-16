import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './Sidebar'
import SearchBar from "./SearchBar";
import profile from '../profile.jpg'

const Header = () => {
    return (
        <div className="container-fluid">
            <header className="row">
                <div className="col-md-2"><Sidebar />  </div>          
                <div className="col-md-8"><SearchBar /></div>
                <div className='col-md-2'><img src={profile} style={{borderRadius: '50%', height: '50px', width: '50px', marginTop: "5px"}}/></div>
                
            </header>
            <hr />
        </div>
    )
};

export default Header;