import React from "react";
import './topbar.css';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Topbar = () => {
    return (
        <nav class="topbar">
            <div className="desktopMenu">
                <li>
                    <RouterLink to="/about" className="desktopMenuListItem">
                        <span>About</span>
                    </RouterLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Cscience' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Science</ScrollLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Ctechnology' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Technology</ScrollLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Csports' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Sports</ScrollLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Centertainment' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Entertainment</ScrollLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Cbusiness' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Business</ScrollLink>
                </li>
                <li>
                    <ScrollLink activeClass='active' to='Chealth' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Health</ScrollLink>
                </li>
                <li>
                    <RouterLink to="/contact&us" className="desktopMenuListItem">
                        <span>Contact Us </span>
                        <i class="fa-solid fa-caret-right" style={{ fontSize: '20px' }}></i>
                    </RouterLink>
                </li>
            </div>
        </nav>
    );
}

export default Topbar;