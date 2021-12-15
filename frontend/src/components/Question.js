import React, { useState, useEffect, useRef} from "react";
import Option from "./Option";
import uniqid from "uniqid";
import TypeContext from "./Context";

function Question({id, sendToForm}) {
  
  const [focused, setFocused] = useState(true);
  const start = useRef(null);
  const [row, setRow] = useState(1);
  const [question, setQuestion] = useState("Untitled Question");
  const [req, setReq] = useState(true);
  const [qType, setQType] = useState("multiline");

  const [info, setInfo] = useState({
    quesType: qType,
    questionData: question,
    quesOptions: [],
    correctAnswer: [],
    quesReq: req,
  });
  useEffect(() => {
      start.current.focus();
  }, [])
  useEffect(() => {
    sendToForm("update", id, info)
  }, [info])

  const [optArr, setOptArr] = useState([{ id: uniqid() }]);
  const callback = (data) => {
    if (data.action === "delete") {
      for (let i = 0; i < optArr.length; i++) {
        if (optArr[i].id === data.id) {
          setOptArr([...optArr.slice(0,i), ...optArr.slice(i+1)])
          setInfo({...info, quesOptions: [...info.quesOptions.slice(0,i),...info.quesOptions.slice(i+1)]})
        }
      }
    }else
    if(data.action  === "update"){
      for(let i=0; i<optArr.length; i++){
        if(optArr[i].id === data.id){
          setInfo({...info, quesOptions :[ ...info.quesOptions.slice(0,i),data.val,...info.quesOptions.slice(i+1)]})
        }
      }
    }
  };

  const handleOptions = () => {
    let u = uniqid();
    setOptArr([...optArr, { id: u }]);
  };

  return (
    <TypeContext.Provider value={qType}>
      <div
        className="my-5 bg-white w-full border-2 border-secondary-200 rounded border-t-8 border-l-8 pb-2"
        onMouseEnter={() => {
          setFocused(true);
        }}
        onMouseLeave={() =>{
          setFocused(false)
        }}
      >
        <div className="w-full lg:flex lg:flex-row lg:justify-between lg:items-center my-5 px-4">
          <textarea
            rows={row}
            className="focus:outline-none w-full lg:w-4/5 resize-none border-b-2 border-gray-300 focus:border-secondary-300 pt-2"
            value={question}
            ref={start}
            onChange={(e) => {
              setQuestion(e.target.value);
              let count = (e.target.value.match(/\r?\n|\r/g) || []).length;
              if (count !== 0 && count <= 7) {
                setRow(count);
              }
              setInfo({ ...info, questionData: e.target.value });
            }}
            onFocus={(e) => {
              e.target.select();
            }}
          />
          <div>
            <select
              name="type"
              id="type"
              className="bg-gray-200 p-2 border-2 border-solid border-secondary-300 rounded my-4"
              value={qType}
              onChange={(e) => {
                setQType(e.target.value);
                setInfo({ ...info, quesType: e.target.value });
              }}
            >
              <option value="simple">Simple </option>
              <option value="multiline">Paragraph </option>
              <option value="radio">Multiple</option>
              <option value="checkbox">Checkbox </option>
            </select>
          </div>
        </div>
        {(qType === "checkbox" || qType === "radio") && (
          <div>
            {optArr.map((ele) => {
              return (
                <Option key={ele.id} id={ele.id} sendToParent={callback} />
              );
            })}
          </div>
        )}
        {qType === "radio" || qType === "checkbox" ? (
          <div
            className="m-4 flex flex-row items-center "
            onClick={handleOptions}
          >
            {(qType === "radio" && focused) ? (
              <i
                className="fa fa-circle-thin mx-2 hover:text-secondary-400"
                aria-hidden="true"
              ></i>
            ) : focused && (
               <i
                className="fa fa-square-o mx-2 hover:text-secondary-400"
                aria-hidden="true"
              ></i>
            )}
           {focused&& <p className="hover:cursor-pointer focus:outline-none border-b-2 border-gray-300 focus:border-secondary-400 w-2/5">
              Add option
            </p>}
          </div>
        ) : (
          <div className="mx-4 border-b-2 border-gray-200">
            <p className="text-gray-400">
              {qType === "multiline" ? "Long" : "Short"} Answer
            </p>
          </div>
        )}
        <div className="flex mx-4 justify-between mt-4 items-center">
          <p>
            <i
              className="fa fa-trash-o hover:text-secondary-500 text-xl"
              aria-hidden="true"
              onClick={() =>{
                sendToForm("delete", id, "none")
              }}
            ></i>
            <i
              className="fa fa-plus-circle text-xl text-primary-500 mx-6 hover:text-secondary-500"
              aria-hidden="true"
              onClick={() =>{
                sendToForm("add", id, "none")
              }}
            ></i>
          </p>
          <p className="text-lg text-gray-600">
            Required
            {req ? (
              <i
                className="fa fa-toggle-on text-secondary-400 hover:text-primary-400 ml-2 text-lg"
                aria-hidden="true"
                onClick={() => {
                  setReq(false);
                  setInfo({ ...info, quesReq: false });
                }}
              ></i>
            ) : (
              <i
                className="fa fa-toggle-off text-gray-500 hover:text-primary-400 ml-2 text-lg"
                aria-hidden="true"
                onClick={() => {
                  setReq(true);
                  setInfo({ ...info, quesReq: true });
                }}
              ></i>
            )}
          </p>
        </div>
      </div>
    </TypeContext.Provider>
  );
}

export default Question;
