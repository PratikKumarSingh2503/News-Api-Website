import React, { useEffect, useState } from 'react';
import './Csports.css';
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

const CSports = () => {
    const [CsportsNews, setCSportsNews] = useState([]);

    useEffect(() => {
        fetchData('sports', 5).then(setCSportsNews);
    }, []);

    return (
        <section className="Csports">
            <div className="CsportsSec">
                <div className='CsportsTitle'>
                    <span>S</span>
                    <span>P</span>
                    <span>O</span>
                    <span>R</span>
                    <span>T</span>
                    <span>S</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>

                <div className="Csportspage2">
                    <div className="Csportsnews" id="sportsNews">
                        <div className="CsportsnewsBox">
                            {CsportsNews.map((news, index) => (
                                <div className="CsportsnewsCard" key={index}>
                                    <div className="Csportsimg">
                                        <img src={news.urlToImage} alt="sports News" />
                                    </div>
                                    <div className="Csportstext">
                                        <div className="Csportstitle">
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

                <div className='toPsports'>
                    <RouterLink to="/sports" className='PsportsLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default CSports;