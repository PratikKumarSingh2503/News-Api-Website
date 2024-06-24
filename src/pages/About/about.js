import React from 'react';
import './about.css';
import about1 from '../../assests/about1.webp';
import about2 from '../../assests/about2.png';
import aboutvideo from '../../assests/v1.mp4';

const About = () => {
    return (
        <section>

            <div className="about-us">
                <h1>About Us</h1>
                <div className="wrapper">
                    <div className="content">
                        <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                            exercitationem itaque. Maxime distinctio
                        </h3>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Mollitia iure debitis id facilis exercitationem aliquam quaerat
                            soluta perferendis quis quidem eos recusandae libero,
                            molestiae adipisci illum odit fugiat laborum blanditiis?
                        </p>

                        <div className="button">
                            <p>read more</p>
                            {/* <a href="#">read more</a> */}
                        </div>

                        <div className="social">
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-twitter"></i>
                        </div>
                    </div>

                    <div className="imagetop">
                        <img src={about1} alt="#" />
                    </div>

                </div>

                <div className="mission">
                    <div className="m-content">
                        <div className="imagemiddle">
                            <img src={about2} alt="#" height="350" width="450" />
                        </div>

                        <div className="m-heading">
                            <h2 className="head">Our Mission</h2><br />
                            <p className="para">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Impedit distinctio corrupti, quam, necessitatibus animi quae quis nobis facilis,
                                Ab id explicabo reiciendis earum veniam sequi dolor aut!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem consequatur
                                unde voluptatibus in aliquid, neque vero quisquam, eveniet ratione odit doloremque
                                est et dolores quod iste nobis suscipit maiores reprehenderit?
                            </p>
                        </div>
                    </div>
                </div>

                <div className="story">

                    <div className="s-content">

                        <h3 className="shead">Our Story</h3>

                        <p className="spara">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Perspiciatis veniam aspernatur corporis fuga.
                            Ipsum rerum necessitatibus ex facere a, modi itaque labore.
                            Velit, laborum ex! Aliquam aperiam ea non nulla. <br />
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus vitae a cumque, facilis eos
                            facere soluta officiis
                            quod at libero maiores perspiciatis quam laboriosam dignissimos quas aliquam harum, inventore
                            nostrum?
                        </p>

                    </div>

                    <video className='aboutvideo' controls autoPlay muted loop>
                        <source src={aboutvideo} type='video/mp4' alt='' />
                    </video>
                </div>
            </div>

        </section>
    )
};

export default About;