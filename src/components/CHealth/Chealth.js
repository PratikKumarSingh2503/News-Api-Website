import React, { useEffect, useState } from 'react';
import './Chealth.css';
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

const CHealth = () => {
    const [ChealthNews, setChealthNews] = useState([]);

    useEffect(() => {
        fetchData('health', 5).then(setChealthNews);
    }, []);

    return (
        <section className="Chealth">
            <div className="ChealthSec">
                <div className='ChealthTitle'>
                    <span>H</span>
                    <span>E</span>
                    <span>A</span>
                    <span>L</span>
                    <span>T</span>
                    <span>H</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>

                <div className="Chealthpage2">
                    <div className="Chealthnews" id="healthNews">
                        <div className="ChealthnewsBox">
                            {ChealthNews.map((news, index) => (
                                <div className="ChealthnewsCard" key={index}>
                                    <div className="Chealthimg">
                                        <img src={news.urlToImage} alt="health News" />
                                    </div>
                                    <div className="Chealthtext">
                                        <div className="Chealthtitle">
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

                <div className='toPhealth'>
                    <RouterLink to="/health" className='PhealthLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default CHealth;