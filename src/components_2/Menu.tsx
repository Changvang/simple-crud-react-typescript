import React from "react";
import {NavLink} from 'react-router-dom'

export const Menu = () =>{
    return(
        <div className='menu-header'>
            <ul className='topnav'>
                <li><NavLink exact activeClassName="active" to='/'>HOME</NavLink></li>
                <li><NavLink activeClassName="active" to='/create'>CREATE</NavLink></li>
            </ul> 
            {/* <div className="topnav">
                <a className="active" href="/">Home</a>
                <a href="/create">Create</a>
            </div> */}
        </div>
    );
};