import React, { useState, useEffect, useRef } from "react";
import form from "./Assets/form.svg";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

function ForgetPassword() {
  const navigate = useNavigate()
  const start = useRef(null);
  const [user, setUser] = useState({
    email:"",
    securityAns:"",
    securityQues:"FirstSchool"
  });
  const handleInput = (e) => {
    setUser({...user, [e.target.name] :e.target.value});
  };
  useEffect(() => {
    start.current.focus();
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post("api/auth/forget", {user})
      if(res.status===200 && res.data){
        window.alert(`new password: \n ${res.data.password}`)
        navigate("/")
      }else{
        window.alert("SomeThing went wrong")
      }
    } catch (error) {
      window.alert("SomeThing went wrong")
    }
   
    
  }
  return (
    <>
      <div className="block m-auto mt-5">
        <p className="text-secondary-600 font-bold text-2xl lg:text-4xl">
          WELCOME TO EASY FORM
        </p>
      </div>
      <div className="w-11/12 lg:w-4/5 rounded p-4 lg:flex lg:justify-around focus:border-primary-700 focus:border-b-2">
        <div className="lg:block hidden w-1/3 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded ">
          <img
            src={form}
            alt="form registration"
            className="w-3/4 h-1/2 m-auto mt-2"
          />
          <p className="px-5 pt-5 pb-2 text-3xl font-bold text-white">
            EasyForm <br />
            <span>Forget Password</span>
          </p>
        </div>
        <div className="block lg:w-2/3 bg-white p-4">
          <form>
            <div>
              <p className="mx-4 my-2 text-secondary-500 font-bold text-xl">
                Forget Password
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
              
            </div>
            <div>
              <button
                className="rounded text-white bg-secondary-500 mx-4 my-2 font-medium px-4 py-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <span className="mx-4 text-sm">
                Don't have an{" "}
                <span className="text-secondary-500">
                  <Link to="/signup">Account</Link>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
