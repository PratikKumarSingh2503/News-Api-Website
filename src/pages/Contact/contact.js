import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact">
        <div className="content">
            <h2>Contact Us</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatum accusantium illo temporibus
                animi aperiam obcaecati beatae enim. Ex suscipit unde natus deleniti officia? Necessitatibus quas
                explicabo temporibus et labore!
            </p>
        </div>
        <div className="container">
            <div className="contactInfo">
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
                    <div className="text">
                        <h3>Address</h3>
                        <p>Lorem ipsum dolor sit<br />Lorem ipsum<br />Lorem</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-phone"></i></div>
                    <div className="text">
                        <h3>Phone</h3>
                        <p>123-456-7890</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                    <div className="text">
                        <h3>Email</h3>
                        <p>abc123@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="contactForm">
                <form>
                    <h2>Send Message</h2>
                    <div className="inputBox">
                        <input type="text" name="" required="required" />
                        <span>Full Name</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="" required="required" />
                        <span>Email</span>
                    </div>
                    <div className="inputBox">
                        <textarea required="required"></textarea>
                        <span>Type your Message...</span>
                    </div>
                    <div className="inputBox">
                        <input type="submit" name="" value="Send" />
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
};

export default Contact;