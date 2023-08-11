import { useEffect, useState } from "react";
import "./register.css";
import { PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";
import { v4 as uuidv4 } from "uuid";

const Register = (props) => {
  const [phone, setPhone] = useState("");
  const phoneValidation = usePhoneValidation(phone);
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const changeUsername = (event) => {
    setUser({ ...user, name: event.target.value });
  };
  const changeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  useEffect(() => {
    const { name, password, email, number } = user;
    if (name !== "" && email !== "" && number !== "" && password !== "") {
      uploadData();
    }
    document.title = "Register";
  }, []);

  const dataSuccess = () => {
    setError({
      username: "",
      email: "",
      password: "",
      number: "",
    });
    const { history } = props;
    history.replace("/login");
  };

  const dataFailure = (responseData) => {
    const { username, email, number } = responseData;
    let value = {
      username: "",
      email: "",
      number: "",
    };

    if (username !== undefined) {
      value.username = username;
    }

    if (email !== undefined) {
      value.email = email;
    }

    if (number !== undefined) {
      value.number = number;
    }

    setError({
      username: value.username,
      email: value.email,
      number: value.number,
    });
  };

  const uploadData = async () => {
    const { name, email, password } = user;
    const data = {
      id: uuidv4(),
      name,
      email,
      password,
      number: phone,
    };

    const url = "http://localhost:5000/registration";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      dataSuccess();
    } else {
      dataFailure(responseData);
    }
  };

  const validatePassword = () => {
    const { password } = user;
    if (
      /^[A-Za-z0-9]/.test(password) === false ||
      /\d/.test(password) === false ||
      /(?=.*[A-Z])(?=.*[a-z])/.test(password) === false
    ) {
      setError({
        ...error,
        password:
          "Password must contain atleast One Capital and Lower Letter. Special characters and digits.",
      });
    } else {
      setError({ ...error, password: "" });
    }
  };
  const formEl = (event) => {
    const { password } = user;
    event.preventDefault();
    validatePassword();
    if (
      /^[A-Za-z0-9]/.test(password) &&
      /\d/.test(password) &&
      /(?=.*[A-Z])(?=.*[a-z])/.test(password)
    ) {
      uploadData();
    }
  };

  const loginButton = () => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <div className="bg">
      <form className="form" onSubmit={formEl}>
        <h1>Register Now</h1>
        <input
          type="text"
          placeholder="USERNAME"
          onChange={changeUsername}
          required
        />
        <p className="error-msg">{error.username}</p>
        <input
          type="email"
          placeholder="EMAIL"
          onChange={changeEmail}
          required
        />
        <p className="error-msg">{error.email}</p>
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={changePassword}
          required
        />
        <p className="error-msg">{error.password}</p>
        <PhoneInput
          inputStyle={{
            backgroundColor: "transparent",
            color: "#ffffff",
            width: "100%",
          }}
          defaultCountry="in"
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
        <p className="error-msg">{error.number}</p>
        <button
          type="submit"
          disabled={!phoneValidation.isValid}
          className="btn"
        >
          Register
        </button>
        <p className="or">-----OR-----</p>
        <button className="login-btn" onClick={loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};
export default Register;
