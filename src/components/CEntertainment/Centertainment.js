import React, { useEffect, useState } from 'react';
import './Centertainment.css';
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

const CEntertainment = () => {
    const [CentertainmentNews, setCEntertainmentNews] = useState([]);

    useEffect(() => {
        fetchData('entertainment', 5).then(setCEntertainmentNews);
    }, []);

    return (
        <section className="Centertainment">
            <div className="CentertainmentSec">
                <div className='CentertainmentTitle'>
                    <span>E</span>
                    <span>N</span>
                    <span>T</span>
                    <span>E</span>
                    <span>R</span>
                    <span>T</span>
                    <span>A</span>
                    <span>I</span>
                    <span>N</span>
                    <span>T</span>
                    <span>E</span>
                    <span>N</span>
                    <span>T</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>

                <div className="Centertainmentpage2">
                    <div className="Centertainmentnews" id="entertainmentNews">
                        <div className="CentertainmentnewsBox">
                            {CentertainmentNews.map((news, index) => (
                                <div className="CentertainmentnewsCard" key={index}>
                                    <div className="Centertainmentimg">
                                        <img src={news.urlToImage} alt="entertainment News" />
                                    </div>
                                    <div className="Centertainmenttext">
                                        <div className="Centertainmenttitle">
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

                <div className='toPentertainment'>
                    <RouterLink to="/entertainment" className='PentertainmentLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default CEntertainment;