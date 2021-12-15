import React from "react";
import {useNavigate} from "react-router-dom"

function Card({ title, desc, id }) {
    const navigate = useNavigate()

    const fetchDetails = () =>{
        navigate(`/formResult/${id}`)
    }


  return (
    <div className="overflow-hidden w-44 h-56 bg-secondary-100 rounded border-2 hover:border-secondary-200  my-2 mx-3">
      <div className="border-2 border-secondary-200  bg-white m-2 p-2 border-t-4 border-l-4 h-28">
        <p>{title}</p>
        <div className="text-normal font-thin  ">
          <p className="overflow-hidden text-ellipsis">{desc}</p>
        </div>
      </div>
      <div className="border-t-2 border-gray-500 bg-white h-24 p-2">
        <p>Type : Blank</p>
        <button className="border-2 hover:border-secondary-600 rounded p-1 bg-secondary-400 my-2 text-white font-semibold"
        onClick= {fetchDetails}
        >
          Open
        </button>
      </div>
    </div>
  );
}

export default Card;
