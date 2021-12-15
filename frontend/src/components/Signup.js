import React, { useState, useEffect, useRef } from "react";
import form from "./Assets/form.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function Signup() {
  const [part, setPart] = useState(false);
  const [isAuth, setIsAuth] = useState({
    text: "",
    show: false,
    error: false,
    nav: "/",
  });
  const [passValidate, setPassValidate] = useState({
    char: false,
    num: false,
    sym: false,
    len: false,
  });
  const start = useRef(null);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    securityAns:"",
    securityQues:"FirstSchool",
  });
  useEffect(() => {
    setPart(false)
    if(start.current)
    start.current.focus();
  }, []);
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      let countsym = (e.target.value.match(/@|#|&/) || []).length;
      let countchar = (e.target.value.match(/([a-z]|[A-Z])/) || []).length;
      let countdigit = (e.target.value.match(/[0-9]/) || []).length;
      let sym = false;
      let num = false;
      let char = false;
      let len = false;
      if (countsym > 0) {
        sym = true;
      }
      if (countchar > 0) {
        char = true;
      }
      if (countdigit > 0) {
        num = true;
      }
      if (e.target.value.length >= 6) {
        len = true;
      }
      setPassValidate({ ...passValidate, sym, num, char, len });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      passValidate.num &&
      passValidate.sym &&
      passValidate.char &&
      passValidate.len
    ) {
      try {
        const res = await axios.post("api/auth/register", { user });
        if (res.data && res.status === 200) {
          const storage = window.localStorage;
          storage.setItem("token", res.data.token);
          storage.setItem("user", JSON.stringify(res.data.user));
          // console.log(res.data);
          setIsAuth({
            show: true,
            text: "Sign in successfull",
            error: false,
            nav: "/",
          });
        } else {
          setIsAuth({
            show: true,
            text: "Error occured while Signing",
            error: true,
            nav: "",
          });
        }
      } catch (error) {
        console.log(error, "==> error");
        setIsAuth({
          show: true,
          text: "Error occured while Signing",
          error: true,
          nav: "",
        });
      }
    }
  };
  const [togglePass, setTogglePass] = useState(false);
  const callback = () => {
    setIsAuth({ ...isAuth, show: false });
  };
  return (
    <>
      <div className="block m-auto mt-5">
        <p className="text-secondary-600 font-bold text-2xl lg:text-4xl">
          WELCOME TO EASY FORM
        </p>
      </div>
      <div className="lg:w-4/5 w-11/12 rounded p-4 lg:flex lg:justify-around">
        <Alert
          type={isAuth.type ? "secondary" : "primary"}
          text={isAuth.text}
          sendToParent={callback}
          show={isAuth.show}
          nav={isAuth.nav}
        />

        <div className="lg:block w-1/3 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded hidden ">
          <img
            src={form}
            alt="form registration"
            className="w-3/4 h-1/2 m-auto mt-2"
          />
          <p className="p-5 text-3xl font-bold text-white">
            EasyForm <br />
            <span>User Registration</span>
          </p>
        </div>
        <div className="block lg:w-2/3 w-full bg-white p-4">
          <form >
            <div>
              <p className="mx-4 my-2 text-secondary-500 font-bold text-xl">
                Registration
              </p>
            </div>
            {!part?
            <>
            <div className="flex flex-col">
              <label className=" font-medium  mx-4 py-1 mb-1" htmlFor="fname">
                First name
              </label>
              <div className="mx-4 w-9/10 border-b-2">
                <input
                  ref={start}
                  id="fname"
                  autoComplete="off"
                  required
                  onChange={handleInput}
                  className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
                  value={user.fname}
                  type="text"
                  name="fname"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className=" font-medium  mx-4 py-1 mb-1" htmlFor="lname">
                Last name
              </label>
              <div className="mx-4 w-9/10 border-b-2">
                <input
                  id="lname"
                  autoComplete="off"
                  required
                  onChange={handleInput}
                  className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
                  value={user.lname}
                  type="text"
                  name="lname"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className=" font-medium  mx-4 py-1 mb-1" htmlFor="email">
                Email
              </label>
              <div className="mx-4 w-9/10 border-b-2">
                <input
                  id="email"
                  autoComplete="off"
                  required
                  onChange={handleInput}
                  className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
                  value={user.email}
                  type="email"
                  name="email"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <label className=" font-medium  mx-4 py-1 mb-1" htmlFor="pass">
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
                  autoComplete="off"
                  required
                  onChange={handleInput}
                  className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
                  value={user.password}
                  type={!togglePass ? "password" : "text"}
                  name="password"
                />
              </div>
            </div>
            <div className="mx-4 text-primary-500">
              {!passValidate.len && (
                <p>Length of password must br greater than 6</p>
              )}
              {!passValidate.sym && <p>Must contain symbol from (@, #, &)</p>}
              {!passValidate.char && <p>Must contain Character</p>}
              {!passValidate.num && <p>Must contain digit</p>}
            </div>
            </>:
            <div className="flex flex-col">
              <label
                className="text-white-900 font-medium  mx-4 py-1 mb-1"
              >Chose a security Question</label>
              <div className="mx-4 w-9/10 border-b-2 my-4">
                <select name="securityQues" className="w-full py-1 bg-white" onChange={handleInput} value={user.securityQues}>
                  <option value="FirstSchool">First School</option>
                  <option value="FavouriteBook">Favourite book</option>
                  <option value="Petname">Pet name</option>
                </select>
              </div>

              <div className="mx-4 w-9/10 border-b-2 mb-4">
                <input
                  id="email"
                  autoComplete="off"
                  required
                  placeholder="Security answer"
                  onChange={handleInput}
                  className="bg-gray-100 py-1 pl-1 focus:outline-none w-full"
                  value={user.securityAns}
                  type="text"
                  name="securityAns"
                />
              </div>
              
            </div>}
            <div>
              {part ? (
                <button
                  className="rounded text-white bg-secondary-500 mx-4 my-2 font-medium px-4 py-2"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  className="rounded text-white bg-secondary-500 mx-4 my-2 font-medium px-4 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setPart(true)
                  }}
                >
                  Next
                </button>
              )}
              <span className="mx-4 text-sm block lg:inline-block">
                Already have an{" "}
                <span className="text-secondary-500">
                  <Link to="/login"> Account</Link>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
