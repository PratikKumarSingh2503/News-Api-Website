import React from 'react';
import './header.css';
import homevideo from '../../assests/homevideo.mp4';

const Header = () => {
  return (
    <div className='header'>
      <div className='headerTitle'>
        {/* <span className='title1'>Escape, Explore, Experience</span> */}
        {/* <span className='title2'>Travel with Ease, Explore with Joy!</span> */}
      </div>

      <video className='headerImg' controls autoPlay muted loop>
        <source src={homevideo} type='video/mp4' alt='' />
      </video>
    </div>
  )
};

export default Header;