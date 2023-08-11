import Cookies from "js-cookie";
import { useEffect } from "react";
import "./index.css";

const Homepage = (props) => {
  const localStoragevalue = localStorage.getItem("active_btn");
  const parsedValue = JSON.parse(localStoragevalue);
  let siteId;
  if (parsedValue === null) {
    siteId = "all";
  } else {
    siteId = parsedValue;
  }
  useEffect(() => {
    if (Cookies.get("jwt_token") !== undefined) {
      const { history } = props;
      history.replace(`/news/${siteId}`);
    }
    document.title = "Welcome To Global News";
  }, []);
  const registerButton = () => {
    const { history } = props;
    history.push("/register");
  };
  const loginButton = () => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <div className="homepage-bg">
      <div className="details-container">
        <h1 className="welcome-heading">Welcome To Global News</h1>
        <div className="login-register-details">
          <p className="para">Register yourself to view all the latest news</p>
          <div className="btn-container">
            <button className="homepage-btn" onClick={registerButton}>
              Register
            </button>
          </div>
          <p className="and">---------------&----------------</p>
          <p className="para">If you already have an account. Please login</p>
          <div className="btn-container">
            <button className="homepage-btn" onClick={loginButton}>
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="newspaper-img-container">
        <img
          src="https://mcdn.wallpapersafari.com/medium/65/32/kbayB2.jpg"
          alt="newspaper"
          className="newspaper-img"
        />
      </div>
    </div>
  );
};

export default Homepage;
