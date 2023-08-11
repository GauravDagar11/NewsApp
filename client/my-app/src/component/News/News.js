import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import { BsBookmarkPlus } from "react-icons/bs";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
};

const News = () => {
  const localStorageValue = localStorage.getItem("saved_news_data");
  const parsedValue = JSON.parse(localStorageValue);
  const [newsData, setData] = useState([]);
  const [api, setApi] = useState(apiStatusConstants.initial);
  const [savedNews, setsavedNews] = useState(
    parsedValue === null ? [] : parsedValue
  );

  useEffect(() => {
    localStorage.setItem("saved_news_data", JSON.stringify(savedNews));
  }, [savedNews]);

  const fetchData = async () => {
    setApi(apiStatusConstants.loading);
    const localStorageValue = localStorage.getItem("active_btn");
    const parsedValue = JSON.parse(localStorageValue);
    let url;
    if (parsedValue === null || parsedValue === "all") {
      url =
        "https://newsapi.org/v2/top-headlines/sources?apiKey=a743e7630faf488fbee7e587feaa3d15";
    }

    if (parsedValue !== null && parsedValue !== "all") {
      url = `https://newsapi.org/v2/top-headlines/sources?category=${parsedValue}&apiKey=a743e7630faf488fbee7e587feaa3d15`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setApi(apiStatusConstants.success);
      setData(data.sources);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeCategoryButton = () => {
    fetchData();
  };

  const saveNewsButton = (item) => {
    setsavedNews([...savedNews, item]);
  };

  const renderLoadingView = () => (
    <div className="loader">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );

  const renderSuccessView = () => (
    <ul className="news-data-ul">
      {newsData.map((eachItem) => (
        <li className="news-data-li">
          <div>
            <h1 className="news-data-heading">{eachItem.name}</h1>
            <p className="news-data-description">{eachItem.description}</p>
          </div>
          <div className="url-bookmark-container">
            <a href={eachItem.url} className="news-data-url" target="_blank">
              {eachItem.url}
            </a>
            <BsBookmarkPlus
              className="save-icon"
              onClick={() => saveNewsButton(eachItem)}
            />
          </div>
        </li>
      ))}
    </ul>
  );

  const renderSwitchView = () => {
    switch (api) {
      case apiStatusConstants.loading:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="news-bg">
      <Navbar activeCategoryButton={activeCategoryButton} />
      {renderSwitchView()}
    </div>
  );
};
export default News;
