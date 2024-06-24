import React from "react";
import './navbar.css';
import { Link as RouterLink } from 'react-router-dom';
import DarkMode from "../../DarkMode/DarkMode";

const Navbar = () => {
    return (
        <div className='nav'>
            <div className='left'>
                <RouterLink to="/" className=''>
                    <h3>News.</h3>
                    <p>Explore<span> More</span></p>
                </RouterLink>
            </div>

            <div className='middle'>
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="Name" placeholder="Search for Famous, Tourist areas" required />
                </form>
            </div>

            <div className='right'>
                <li>
                    <RouterLink to="/login" className='rightlink'>LOGIN</RouterLink>
                </li>
            </div>
            <div className="darkMode"><DarkMode /></div>
        </div>
    );
}

export default Navbar;