import React, { useEffect, useState } from 'react';
import './Cscience.css';
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

const CScience = () => {
    const [CscienceNews, setCScienceNews] = useState([]);

    useEffect(() => {
        fetchData('science', 5).then(setCScienceNews);
    }, []);

    return (
        <section className="Cscience">
            <div className="CscienceSec">
                <div className='CscienceTitle'>
                    <span>S</span>
                    <span>C</span>
                    <span>I</span>
                    <span>E</span>
                    <span>N</span>
                    <span>C</span>
                    <span>E</span>
                    <span></span>
                    <span>N</span>
                    <span>E</span>
                    <span>W</span>
                    <span>S</span>
                </div>

                <div className="Csciencepage2">
                    <div className="Csciencenews" id="scienceNews">
                        <div className="CsciencenewsBox">
                            {CscienceNews.map((news, index) => (
                                <div className="CsciencenewsCard" key={index}>
                                    <div className="Cscienceimg">
                                        <img src={news.urlToImage} alt="science News" />
                                    </div>
                                    <div className="Csciencetext">
                                        <div className="Csciencetitle">
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

                <div className='toPscience'>
                    <RouterLink to="/science" className='PscienceLink'>
                        <button>More</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    )
};

export default CScience;