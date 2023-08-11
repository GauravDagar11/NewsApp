import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { BsBookmarkCheck } from "react-icons/bs";
import "./index.css";

const buttonList = [
  {
    id: "all",
    display: "All",
  },
  {
    id: "business",
    display: "Business",
  },
  {
    id: "technology",
    display: "Technology",
  },
  {
    id: "sports",
    display: "Sports",
  },
  {
    id: "health",
    display: "Health",
  },
];

const Navbar = (props) => {
  const localStorageValue = localStorage.getItem("active_btn");
  const parsedValue = JSON.parse(localStorageValue);
  console.log(parsedValue);
  const [activeBtn, setActiveBtn] = useState(
    parsedValue === null ? buttonList[0].id : parsedValue
  );
  const { activeCategoryButton } = props;
  const categoryButton = (id) => {
    setActiveBtn(id);
    localStorage.setItem("active_btn", JSON.stringify(id));
    activeCategoryButton(id);
  };

  const savedNewsButton = () => {
    const { history } = props;
    history.push("/saved-news");
  };

  const logoutButton = () => {
    localStorage.removeItem("active_btn");
    localStorage.removeItem("saved_news_data");
    Cookies.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };

  return (
    <div className="nav-bg">
      <h1 className="app-logo">Global News</h1>
      <ul className="ul-list">
        {buttonList.map((eachITem) => (
          <Link to={`/news/${eachITem.id}`} className="link-btn">
            <li key={eachITem.id}>
              <button
                type="button"
                onClick={() => categoryButton(eachITem.id)}
                className={
                  eachITem.id === activeBtn ? "active-btn" : "inactive-btn"
                }
              >
                {eachITem.display}
              </button>
            </li>
          </Link>
        ))}
      </ul>
      <div className="saved-logout-btn-container">
        <button
          type="button"
          className="saved-news-btn"
          onClick={savedNewsButton}
        >
          Saved News <BsBookmarkCheck />
        </button>
        <button type="button" className="logout-btn" onClick={logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
