import { useEffect, useState } from "react";
import "./index.css";
import { IoMdArrowBack } from "react-icons/io";

const apiStatusContants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
};

const SavedNews = (props) => {
  const localStoragevalue = localStorage.getItem("active_btn");
  const parsedValue = JSON.parse(localStoragevalue);
  let siteId;
  if (parsedValue === null) {
    siteId = "all";
  } else {
    siteId = parsedValue;
  }
  const [data, setData] = useState([]);
  const [api, setApi] = useState(apiStatusContants.initial);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("saved_news_data");
    const parsedValue = JSON.parse(localStorageValue);
    if (parsedValue === null) {
      setData([]);
    } else {
      setData(parsedValue);
    }
  }, []);

  const backButton = () => {
    const { history } = props;
    history.replace(`/news/${siteId}`);
  };

  const renderEmptyView = () => (
    <div className="no-bookmark-container">
      <img
        src="https://img.freepik.com/premium-vector/no-data-concept-illustration_203587-28.jpg?w=2000"
        alt="not-found"
        className="not-found-img"
      />
      <h1 className="no-bookmark">No Bookmarks Found</h1>
      <button className="saved-news-btn" onClick={backButton}>
        Back <IoMdArrowBack />
      </button>
    </div>
  );
  const renderDataView = () => (
    <ul className="news-data-ul">
      {data.map((eachItem) => (
        <li className="news-data-li">
          <div>
            <h1 className="news-data-heading">{eachItem.name}</h1>
            <p className="news-data-description">{eachItem.description}</p>
          </div>
          <a href={eachItem.url} className="news-data-url" target="_blank">
            {eachItem.url}
          </a>
        </li>
      ))}
    </ul>
  );

  const renderView = () => {
    if (data.length === 0) {
      return renderEmptyView();
    } else {
      return renderDataView();
    }
  };

  return (
    <div className="news-bg">
      <nav className="nav-bg">
        <h1 className="app-logo">Global News</h1>
        <h1>Your Bookmarks</h1>
        <div className="saved-logout-btn-container">
          <button className="saved-news-btn" onClick={backButton}>
            Back <IoMdArrowBack />
          </button>
        </div>
      </nav>
      {renderView()}
    </div>
  );
};

export default SavedNews;
