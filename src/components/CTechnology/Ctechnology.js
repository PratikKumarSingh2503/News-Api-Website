import React, { useEffect, useState } from 'react';
import './Ctechnology.css';
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

const Ctechnology = () => {
    const [CtechnologyNews, setCTechnologyNews] = useState([]);

    useEffect(() => {
        fetchData('technology', 5).then(setCTechnologyNews);
    }, []);

    return (
        <section className="Ctechnology">
            <div className="CtechnologySec">
                <div className='CtechnologyTitle'>
                    <span>T</span>
                    <span>E</span>
                    <span>C</span>
                    <span>H</span>
                    <span>N</span>
                    <span>O</span>
                    <span>L</span>
                    <span>O</span>
                    <span>G</span>
                    <span>Y</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>
                
                <div className="Ctechnologypage2">
                    <div className="Ctechnologynews" id="technologyNews">
                        <div className="CtechnologynewsBox">
                            {CtechnologyNews.map((news, index) => (
                                <div className="CtechnologynewsCard" key={index}>
                                    <div className="Ctechnologyimg">
                                        <img src={news.urlToImage} alt="Technology News" />
                                    </div>
                                    <div className="Ctechnologytext">
                                        <div className="Ctechnologytitle">
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

                <div className='toPtechnology'>
                    <RouterLink to="/technology" className='PtechnologyLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default Ctechnology;