import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
function Alert({ type, show, text, sendToParent, nav }) {
  const navigate = useNavigate();
  const [vis, setVis] = useState(show);
  useEffect(() => {
    setVis(show);
  }, [show]);
  return (
    <>
      {vis && (
        <div
          className={
            "fixed bottom-1/2 left-0 w-11/12 m-4 lg:left-1/4 lg:w-1/2 xl:left-1/4 xl:w-1/2 border-2 rounded-xl border-" +
            type +
            "-500  p-4 bg-gradient-to-r from-" +
            type +
            "-100 to-" +
            type +
            "-200 flex justify-between items-center"
          }
        >
          <div className={"p-1 px-2 rounded-lg block bg-" + type + "-500"}>
            <i
              className={
                (type === "primary"
                  ? "fa fa-check-square "
                  : type === "secondary"
                  ? "fa fa-info-circle "
                  : "fa fa-exclamation-triangle ") +
                "text-2xl " +
                (type === "gray" ? "text-primary-500" : "text-white")
              }
              aria-hidden="true"
            ></i>
          </div>
          <div className="w-3/4 font-semibold overflow-auto">
            <p>{text}</p>
          </div>
          <div>
            <i
              class="fa fa-times"
              aria-hidden="true"
              onClick={() => {
                setVis(false);
                sendToParent()
                if(nav !== ""){
                navigate(nav)
                }
              }}
            ></i>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
