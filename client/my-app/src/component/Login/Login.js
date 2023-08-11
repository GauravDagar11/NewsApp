import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";

const Login = (props) => {
  const localStoragevalue = localStorage.getItem("active_btn");
  const parsedValue = JSON.parse(localStoragevalue);
  let siteId;
  if (parsedValue === null) {
    siteId = "all";
  } else {
    siteId = parsedValue;
  }
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (Cookies.get("jwt_token") !== undefined) {
      const { history } = props;
      history.replace(`/news/${siteId}`);
    }
    document.title = "Login";
  }, []);

  const changeUsername = (event) => {
    setUser({ ...user, name: event.target.value });
  };
  const changePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const fetchSuccess = (jwtToken) => {
    setError({
      username: "",
      password: "",
    });
    Cookies.set("jwt_token", jwtToken, { expires: 7 });
    const { history } = props;
    history.replace(`/news/${siteId}`);
  };

  const fetchError = (data) => {
    const { username, password } = data;

    if (username !== undefined) {
      setError({ username });
    }
    if (password !== undefined) {
      setError({ password });
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:5000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      fetchSuccess(data.jwtToken);
    } else {
      fetchError(data);
    }
  };

  const formEl = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="login-bg">
      <form className="form" onSubmit={formEl}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="USERNAME"
          required
          onChange={changeUsername}
        />
        <p className="error-msg">{error.username}</p>
        <input
          type="password"
          placeholder="PASSWORD"
          required
          onChange={changePassword}
        />
        <p className="error-msg">{error.password}</p>
        <button
          disabled={user.name === "" || user.password === ""}
          type="submit"
          className="btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
