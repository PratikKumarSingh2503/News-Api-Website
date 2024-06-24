import React, { useState } from 'react';
import './login.css';
import user_icon from '../../assests/person.png';
import email_icon from '../../assests/email.png';
import password_icon from '../../assests/password.png'

const Login = () => {

  const [action, setAction] = useState("Login");
  return (
    <div className='login'>
      <div className='loginContainer'>
        <div className='loginheader'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action === "Login" ?
            <div></div>
            :
            <div className='input'>
              <img src={user_icon} alt='' />
              <input type='text' placeholder='Username' />
            </div>
          }
          <div className='input'>
            <img src={email_icon} alt='' />
            <input type='email' placeholder='Email Id' />
          </div>
          <div className='input'>
            <img src={password_icon} alt='' />
            <input type='password' placeholder='Password' />
          </div>
        </div>
        {action === "Sign Up" ?
          <div></div>
            :
          <div className='forget-password'>Lost Password ? <span>Click Here!</span></div>
        }
        <div className='submit-container'>
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
        </div>
      </div>
    </div>
  );
}

export default Login;