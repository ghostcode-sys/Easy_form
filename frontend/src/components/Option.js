import React, { useState, useEffect, useContext } from "react";
import TypeContext from "./Context";

function Option({ id,sendToParent }) {

  const context = useContext(TypeContext)
  const [type,setType] = useState("radio")
  const [opt, setOpt] = useState("Untitled Option");
  useEffect(() => {
    setType(context)
    let data = {
      action: "update",
      id: id,
      val: opt,
    };
    sendToParent(data)
  }, [context])
  const handleChange = (e) => {
    setOpt(e.target.value);
    let data = {
      action: "update",
      id: id,
      val: e.target.value,
    };
    sendToParent(data);
  };
  return (
    <div className="m-4 ">
      {type === "radio" ? (
        <i
          className="fa fa-circle-thin mx-2 hover:text-secondary-300"
          aria-hidden="true"
        ></i>
      ) : type === "checkbox" ? (
        <i
          className="fa fa-square-o mx-2 hover:text-secondary-300"
          aria-hidden="true"
        ></i>
      ) : (
        <i
          className="fa fa-circle-thin mx-2 hover:text-secondary-300"
          aria-hidden="true"
        ></i>
      )}
      <input
        className="focus:outline-none border-b-2 border-gray-300 focus:border-secondary-300 w-3/5"
        value={opt}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />

      <i
        className="fa fa-trash-o hover:text-secondary-500 text-xl ml-4"
        aria-hidden="true"
        onClick={() =>{
            let data = {
                action:"delete",
                id:id
            }
            sendToParent(data)
        }}
      ></i>
    </div>
  );
}

export default Option;
