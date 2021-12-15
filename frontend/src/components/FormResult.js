import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { useParams, useNavigate } from "react-router-dom";
import Response from "./Response";

function FormResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(false);
  const [isAns, setIsAns] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [info, setInfo] = useState("");
  const [ques, setQues] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const deleteForm = async (action) => {
    // "/responseEdit"
    try {
      const res = await axios.put("/api/form/responseEdit", {
        id: id,
        action: action,
      });
      if (res.data && res.status === 200 && action === "delete") {
        console.log("i am gere");
        navigate("/");
      } else if (res.data && res.status === 200) {
        setResponse(action);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/form/answer/${id}`);
      if (res.data && res.status === 200) {
        let question = res.data.question;
        setLink(res.data.link)
        setTitle(question.title);
        setInfo(question.information);
        setQues([...question.question]);
        // console.log(question.takingResponse)
        setResponse(question.takingResponse);
        setAnswerData([...res.data.answer.answers]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-secondary-200 border-2 border-secondary-300 rounded-lg h-14  my-4 mx-4 ">
        <p className="ml-5 text-2xl font-bold hidden lg:block">{title}</p>
        <p className="px-4">
          {answerData.length > 0 && answerData.length + " Responses"}
        </p>
        <button
          className="mr-4 font-bold text-white bg-secondary-400 px-4 py-2 rounded border-2 border-secondary-600 hover:border-secondary-800"
          onClick={() => {
            setIsAns(!isAns);
          }}
        >
          {!isAns ? "Responses" : "Form"}
        </button>
      </div>
      <div className="md:flex block justify-between items-center md:h-14  my-4 mx-4 ">
        <button 
        className="mr-4 font-bold text-white bg-secondary-400 px-4 py-2 rounded border-2 border-secondary-600 hover:border-secondary-800"
        onClick={() => {
          navigator.clipboard.writeText(`${link}easy/${id}`);
        }}
        >
          Sharing Link
        </button>
        <div>
          <span className="text-lg">Take Responses</span>
          {response ? (
            <i
              className="fa fa-toggle-on ml-2 text-lg text-secondary-500"
              aria-hidden="true"
              onClick={() => {
                deleteForm(false);
              }}
            ></i>
          ) : (
            <i
              className="fa fa-toggle-off ml-2 text-lg text-gray-500"
              aria-hidden="true"
              onClick={() => {
                deleteForm(true);
              }}
            ></i>
          )}
        </div>
        <button
          className="mr-4 font-bold text-white bg-gray-400 px-4 py-2 rounded border-2 border-gray-600 hover:border-gray-800"
          onClick={() => {
            deleteForm("delete");
          }}
        >
          Delete form
        </button>
      </div>
      {!isAns ? (
        <div className="m-auto my-10 block lg:w-3/4 xl:w-3/5 w-11/12">
          <div className="w-full bg-white border-secondary-200 border-2 border-t-8 border-l-8 rounded">
            <p className="border-gray-200 border-b-2 mx-4 my-4 text-4xl font-bold">
              {title}
            </p>
            <p className="border-gray-200 border-b-2 mx-4 my-4 text-lg max-h-24 overflow-y-auto">
              {info}
            </p>
          </div>
          <div>
            {ques.map((ele) => {
              if (ele.quesType === "simple" || ele.quesType === "multiline") {
                return (
                  <div
                    className="w-full bg-white border-secondary-200 border-2 border-t-8 border-l-8 rounded flex flex-col mt-8"
                    key={uniqid()}
                  >
                    <label className="mx-4 my-2 border-b-2 border-gray-200">
                      {ele.questionData}
                    </label>
                    <p className="mx-4 my-2 border-b-2 border-gray-200 text-gray-400">
                      {ele.quesType === "simple" ? "Short" : "Long"} Answer
                    </p>
                  </div>
                );
              } else if (
                ele.quesType === "radio" ||
                ele.quesType === "checkbox"
              ) {
                return (
                  <div
                    className="w-full bg-white border-secondary-200 border-2 border-t-8 border-l-8 rounded flex flex-col mt-8"
                    key={uniqid()}
                  >
                    <label className="mx-4 my-2 border-b-2 border-gray-200">
                      {ele.questionData}
                    </label>
                    {ele.quesOptions.map((opt) => {
                      return (
                        <div
                          className="border-gray-200 border-b-2 w-3/4  mx-4 my-2 hover:border-blue-200"
                          key={uniqid()}
                        >
                          <input
                            className="focus:outline-none border-b-2 border-gray-200 focus:border-blue-200 mr-2 focus:bg-gray-100 hover:bg-gray-100"
                            type={ele.quesType}
                          />
                          <label>{opt}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <Response ansData={answerData} quesData={ques} id={id}/>
      )}
    </div>
  );
}

export default FormResult;
