import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import Card from "./Card";

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState([]);
  const collectInfo = async (token) => {
    try {
      const res = await axios.get("api/home/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data);
      if (res.status === 200 && res.data) {
        setFormData([...res.data.formData]);
      }
    } catch (err) {
      console.log(err, "==> error");
    }
  };
  useEffect(() => {
    const storage = window.localStorage;
    const user = JSON.parse(storage.getItem("user"));
    const token = storage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
    collectInfo(token);
    if (user !== null)
      setUserName(user.fname.toUpperCase() + " " + user.lname.toUpperCase());
  }, [navigate]);
  return (
    <div className="w-full mt-5">
      <div className="flex justify-end items-center mx-5 bg-secondary-200 border-2 border-secondary-300 rounded-lg h-14">
        <p className="mr-8 font-semibold">{userName}</p>
        <button
          className="mr-4 font-bold text-white bg-secondary-400 px-4 py-2 rounded border-2 border-secondary-600 hover:border-secondary-800"
          onClick={() => {
            window.localStorage.clear();
            navigate("/signup");
          }}
        >
          Sign Out
        </button>
      </div>
      <div className="flex flex-row items-center justify-around my-4">
        <p className="text-left ml-5 w-max">Create a new Form</p>
        <div className="inline-block w-3/4  h-1 bg-gray-500 rounded "></div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <div
            className="w-32 h-32  border-2 border-gray-200 relative bg-gradient-to-r from-secondary-500 to-primary-500"
            onClick={() => {
              navigate("/form");
            }}
          >
            <div className="w-14 h-14 bg-white absolute top-0 left-0"></div>
            <div className="w-14 h-14 bg-white absolute top-0 right-0"></div>
            <div className="w-14 h-14 bg-white absolute bottom-0 left-0"></div>
            <div className="w-14 h-14 bg-white absolute bottom-0 right-0"></div>
            <div className="w-4 h-full bg-white absolute top-0 left-0"></div>
            <div className="w-4 h-full bg-white absolute top-0 right-0"></div>
            <div className="w-full h-4 bg-white absolute top-0 left-0"></div>
            <div className="w-full h-4 bg-white absolute bottom-0 right-0"></div>
          </div>
          <p
            className="align-text-center hover:cursor-pointer"
            onClick={() => {
              navigate("/form");
            }}
          >
            Blank
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around my-4">
        <p className="text-left  w-max">Recent Forms</p>
        <div className="inline-block w-3/4 h-1 bg-gray-500 rounded "></div>
      </div>
      <div className="m-auto w-3/4 flex flex-wrap justify-start">
        {formData.map((ele) => {
          return (
            <Card
              id={ele.id}
              title={ele.title}
              desc={ele.info}
              key={uniqid()}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
