import React, { useEffect, useState } from 'react';
import './technology.css';

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

const Technology = () => {
  const [breakingNews, setBreakingNews] = useState(null);
  const [topNews, setTopNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);

  useEffect(() => {
    fetchData('technology', 1).then((data) => {
      setBreakingNews(data[0]);
    });
    fetchData('technology', 5).then(setTopNews);
    fetchData('technology', 21).then(setTechnologyNews);
  }, []);

  return (
    <section className="technology">
      <div className="content">
        <h2>Technology News</h2>
      </div>
      <div className="topHeadlines">
        <div className="left">
          <div className="title">
            <h2>Breaking News</h2>
          </div>
          {breakingNews && (
            <>
              <div className="img" id="breakingImg">
                <img src={breakingNews.urlToImage} alt="Breaking News" />
              </div>
              <div className="text" id="breakingNews">
                <div className="title">
                  <a href={breakingNews.url} target="_blank" rel="noopener noreferrer">
                    <h2>{breakingNews.title}</h2>
                  </a>
                </div>
                <div className="description">
                  {breakingNews.description}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="right">
          <div className="title">
            <h2>Top Headlines</h2>
          </div>
          <div className="topNews">
            {topNews.map((news, index) => (
              <div className="news" key={index}>
                <div className="img">
                  <img src={news.urlToImage} alt="Top News" />
                </div>
                <div className="text">
                  <div className="title">
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
      <div className="page2">
        <div className="news" id="technologyNews">
          <div className="title">
            <h2>Daily News</h2>
          </div>
          <div className="newsBox">
            {technologyNews.map((news, index) => (
              <div className="newsCard" key={index}>
                <div className="img">
                  <img src={news.urlToImage} alt="Technology News" />
                </div>
                <div className="text">
                  <div className="title">
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
    </section>
  );
};

export default Technology;