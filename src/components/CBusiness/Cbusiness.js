import React, { useEffect, useState } from 'react';
import './Cbusiness.css';
import { Link as RouterLink } from 'react-router-dom';

const apiKey = "35774b6ef5cf4c50a38a1d9332761028";

const fetchData = async (category, pageSize) => {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

const CBusiness = () => {
    const [CbusinessNews, setCbusinessNews] = useState([]);

    useEffect(() => {
        fetchData('business', 5).then(setCbusinessNews);
    }, []);

    return (
        <section className="Cbusiness">
            <div className="CbusinessSec">
                <div className='CbusinessTitle'>
                    <span>B</span>
                    <span>U</span>
                    <span>S</span>
                    <span>I</span>
                    <span>N</span>
                    <span>E</span>
                    <span>E</span>
                    <span>S</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>

                <div className="Cbusinesspage2">
                    <div className="Cbusinessnews" id="businessNews">
                        <div className="CbusinessnewsBox">
                            {CbusinessNews.map((news, index) => (
                                <div className="CbusinessnewsCard" key={index}>
                                    <div className="Cbusinessimg">
                                        <img src={news.urlToImage} alt="business News" />
                                    </div>
                                    <div className="Cbusinesstext">
                                        <div className="Cbusinesstitle">
                                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                                <p>{news.title.length < 100 ? news.title : `${news.title.slice(0, 100)}...`}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='toPbusiness'>
                    <RouterLink to="/business" className='PbusinessLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default CBusiness;