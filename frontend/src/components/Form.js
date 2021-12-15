import React, { useState} from "react";
import Question from "./Question";
import uniqid from "uniqid";
import axios from "axios";
import Alert from "./Alert";
import {useNavigate} from "react-router-dom"

function Form() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    text:"",
    error:false,
    show:false,
    nav:""
  })
  const [title, setTitle] = useState("Untitled Form");
  const [titleFocus, setTitleFocus] = useState(false);
  const [desc, setDesc] = useState("Description");
  const [descFocus, setDescFocus] = useState(false);
  const [row, setRow] = useState(1);
  const [quesArr, setQuesArr] = useState([{ id: uniqid() }]);
  const [quesData, setQuesData] = useState([]);

  const submitForm = async () => {
    try {
      const storage = window.localStorage;
      const token = storage.getItem("token");
      const res = await axios.post(
        "/api/form/formques",
        {
          formData: {
            formType: "blank",
            title: title,
            information: desc,
            question: quesData,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 && res.data) {
        setAlert({
          show:true,
          text:res.data.link,
          error:false,
          nav:"/"
        })
      }else{
        setAlert({
          show:true,
          text:"Something Went wrong, comeback after sometime",
          error:true,
          nav:"/"
        })
      }
    } catch (e) {
      setAlert({
        show:true,
        text:"Something Went wrong, comeback after sometime",
        error:true,
        nav:"/"
      })
      console.log(e);
    }
  };

  const handleDesc = (ele) => {
    setDesc(ele.target.value);
    let count = (ele.target.value.match(/\r?\n|\r/g) || []).length;
    if (count !== 0 && count <= 7) {
      setRow(count+1);
    }
  };
  const callback = (action, id, data) => {
    if (action === "add") {
      for (let i = 0; i < quesArr.length; i++) {
        if (quesArr[i].id === id) {
          setQuesArr([
            ...quesArr.slice(0, i + 1),
            { id: uniqid() },
            ...quesArr.slice(i + 1),
          ]);
          setQuesData([
            ...quesData.slice(0, i + 1),
            { ...data },
            ...quesData.slice(i + 1),
          ]);
        }
      }
    } else if (action === "delete") {
      if (quesArr.length === 1) {
        return;
      }
      for (let i = 0; i < quesArr.length; i++) {
        if (quesArr[i].id === id) {
          setQuesArr([...quesArr.slice(0, i), ...quesArr.slice(i + 1)]);
          setQuesData([...quesData.slice(0, i), ...quesData.slice(i + 1)]);
        }
      }
    } else if (action === "update") {
      for (let i = 0; i < quesArr.length; i++) {
        if (quesArr[i].id === id) {
          setQuesData([
            ...quesData.slice(0, i),
            { ...data },
            ...quesData.slice(i + 1),
          ]);
        }
      }
    }
  };
  return (
    <div className="w-full">
      <div className="flex md:justify-between justify-end items-center bg-secondary-200 border-2 border-secondary-300 rounded-lg h-14  my-4 mx-4 ">
        <p className="ml-5 text-2xl font-bold hidden md:block">{title}</p>
        <button
          className="mr-4 font-bold text-white bg-secondary-400 px-4 py-2 rounded border-2 border-secondary-600 hover:border-secondary-800"
          onClick={ () => {
            submitForm()
          }}
        >
          Share
        </button>
      </div>
      <Alert
          type={alert.type ? "secondary" : "primary"}
          text={alert.text}
          sendToParent={callback}
          show={alert.show}
          nav={alert.nav}
        />
      <div className="rounded w-11/12 lg:w-3/5 m-auto block mt-8">
        <div className="rounded-lg border-2 border-secondary-200 bg-white px-4 py-2 border-t-8  border-l-8">
          <div>
            <input
              Z
              className={
                titleFocus
                  ? "focus:outline-none border-b-4 border-secondary-300 font-semibold w-full text-2xl subpixel-antialiased mb-4"
                  : "focus:outline-none  font-semibold w-full text-2xl subpixel-antialiased border-b-2 border-gray-300 mb-4"
              }
              value={title}
              onFocus={(e) => {
                setTitleFocus(true);
                e.target.select();
              }}
              onBlur={() => {
                setTitleFocus(false);
              }}
              onChange={(ele) => {
                setTitle(ele.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              rows={row}
              value={desc}
              onChange={handleDesc}
              onFocus={(e) => {
                setDescFocus(true);
                e.target.select();
              }}
              onBlur={() => {
                setDescFocus(false);
              }}
              className={
                descFocus
                  ? "focus:outline-none border-b-4 border-secondary-300 font-light w-full text-lg subpixel-antialiased mb-4 resize-none"
                  : "focus:outline-none  font-light w-full text-lg  subpixel-antialiased border-b-2 border-gray-300 mb-4 resize-none"
              }
            />
          </div>
        </div>
        <div>
          {quesArr.map((ele) => {
            return <Question id={ele.id} sendToForm={callback} key={ele.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Form;
