import React, { useState, useRef, useEffect } from "react";
import form from "./Assets/form.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
function Login() {
  const start = useRef(null);
  useEffect(() => {
    start.current.focus();
  }, []);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [togglePass, setTogglePass] = useState(false);
  const [isAuth, setIsAuth] = useState({
    error: false,
    show: false,
    text: "",
    nav:"/"
  });
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/auth/login", { user });
      console.log(res.data, "==>resposse");
      if (res.data && res.status === 200) {
        const storage = window.localStorage;
        storage.setItem("token", res.data.token);
        storage.setItem("user", JSON.stringify(res.data.user));
        setIsAuth({
          error: false,
          show: true,
          text: "Login Successfull",
          nav:"/"
        });
      } else {
        console.log("i am here");
        setIsAuth({
          error: true,
          show: true,
          text: "Error occured while Logging",
          nav:""
        });
      }
    } catch (error) {
      console.log(" at catch");
      setIsAuth({
        error: true,
        show: true,
        text: "Error occured while Logging",
        nav:""
      });
    }
  };

  const callback = () => {
    setIsAuth({...isAuth, show:false})
  }
  return (
    <>
    <div className="block m-auto mt-5">
    <p className="text-secondary-600 font-bold text-2xl lg:text-4xl">WELCOME TO EASY FORM</p>
  </div>
    <div className="w-11/12 lg:w-4/5 rounded p-4 lg:flex lg:justify-around focus:border-primary-700 focus:border-b-2">
      <Alert
        type={isAuth.error ? "gray" : "primary"}
        show={isAuth.show}
        text={isAuth.text}
        sendToParent={callback}
        nav={isAuth.nav}
      />
      <div className="lg:block hidden w-1/3 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded ">
        <img
          src={form}
          alt="form registration"
          className="w-3/4 h-1/2 m-auto mt-2"
        />
        <p className="px-5 pt-5 pb-2 text-3xl font-bold text-white">
          EasyForm <br />
          <span>User Login</span>
        </p>
      </div>
      <div className="block lg:w-2/3 bg-white p-4">
        <form>
          <div>
            <p className="mx-4 my-2 text-secondary-500 font-bold text-xl">
              Login
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className="text-white-900 font-medium  mx-4 py-1 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mx-4 w-9/10 border-b-2">
              <input
                id="email"
                name="email"
                value={user.email}
                type="email"
                ref={start}
                onChange={handleInput}
                className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <label
                className="text-white-900 font-medium  mx-4 py-1 mb-1"
                htmlFor="pass"
              >
                Password
              </label>
              {!togglePass ? (
                <i
                  className="fa fa-eye ml-10"
                  aria-hidden="true"
                  onClick={() => {
                    setTogglePass(!togglePass);
                  }}
                ></i>
              ) : (
                <i
                  className="fa fa-eye-slash ml-10"
                  aria-hidden="true"
                  onClick={() => {
                    setTogglePass(!togglePass);
                  }}
                ></i>
              )}
            </div>
            <div className="mx-4 w-9/10 border-b-2">
              <input
                id="pass"
                type={togglePass ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInput}
                className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <button
              className="rounded text-white bg-secondary-500 mx-4 my-2 font-medium px-4 py-2"
              onClick={handleSubmit}
            >
              Login
            </button>
            <span className="mx-4 text-sm">
              Don't have an{" "}
              <span className="text-secondary-500">
                <Link to="/signup">Account</Link>
              </span>
            </span>
          </div>
          <div className="mx-4 mt-2 font-medium text-sm">
            <Link to="/forgot" className="text-secondary-500">
              Forgotten
            </Link>{" "}
            Password
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
