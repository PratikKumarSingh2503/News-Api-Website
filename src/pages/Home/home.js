import React from 'react';
import './home.css';
import Topbar from '../../components/Topbar/topbar';
import Header from '../../components/Header/header';
import CSience from '../../components/CScience/Cscience';
import CTechnology from '../../components/CTechnology/Ctechnology';
import CSports from '../../components/CSports/Csports';
import CEntertainment from '../../components/CEntertainment/Centertainment';
import CBusiness from '../../components/CBusiness/Cbusiness';
import CHealth from '../../components/CHealth/Chealth';
import Subscription from '../../components/Subscription/subscription';
import Client from '../../components/Client/client';
import Footer from '../../components/Footer/footer';

const home = () => {
  return (
    <div className='home'>
        <div className='homeContainer'>
            <Topbar />
            <Header />
            <CSience />
            <CTechnology />
            <CSports />
            <CEntertainment />
            <CBusiness />
            <CHealth />
            <Subscription />
            <Client />
        </div>
        <Footer />
    </div>
  )
}

export default home;