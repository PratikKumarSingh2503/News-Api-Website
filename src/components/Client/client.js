import React from 'react';
import './client.css';
import client1 from '../../assests/client1.webp';
import client2 from '../../assests/client2.png';
import client3 from '../../assests/client3.png';
import client4 from '../../assests/client4.png';

const Client = () => {
  return (
    <div className='client'>
      <div className='clientSec'>
        <div className='clientImage'>
          <img src={client1} alt='' />
          <img src={client2} alt=''  />
          <img src={client3} alt='' />
          <img src={client4} alt='' />
        </div>
      </div>
    </div>
  );
}

export default Client;