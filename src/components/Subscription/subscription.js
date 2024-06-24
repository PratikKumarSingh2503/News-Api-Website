import React from 'react';
import './subscription.css';

const Subscription = () => {
    return (
        <div className='subscription'>
            <div className="subscriptionSec">
                <div className='subscriptionTitle'>
                    <span>S</span>
                    <span>U</span>
                    <span>B</span>
                    <span>S</span>
                    <span>C</span>
                    <span>R</span>
                    <span>I</span>
                    <span>B</span>
                    <span>E</span>
                    <span> </span>
                    <span>N</span>
                    <span>O</span>
                    <span>W</span>
                </div>

                <div className='subscriptionContainer'>
                    <p>
                        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." <br/>
                        "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                    </p>
                    <form action="https://api.web3forms.com/submit" method="POST" className='subscriptionForm'>
                    <input type="hidden" name="access_key" value="b207f59b-f227-43e6-8dc5-e7f4de80eed8" />
                        <label htmlFor="name"></label>
                        <input type="text" id="name" name="Name" placeholder="abc123@gmail.com" required />
                        <button type="submit">
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Subscription;