import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

function Response({ ansData, quesData,id }) {
  const [isHover, setIsHover] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [header, setHeader] = useState([]);
  useEffect(() => {
    let quesObj = {};
    for (let i = 0; i < quesData.length; i++) {
      let data = {
        [`ques${i}`]: { ques: quesData[i].questionData, id: quesData[i]._id },
      };
      quesObj = { ...quesObj, ...data };
    }
    setHeader([...Object.values(quesObj)]);
    setTableData([...ansData]);
  }, [ansData, quesData]);
  return (
    <div>
      <div className="flex w-full justify-end items-center">
       {isHover && <p className="text-secondary-600">Click to download csv file</p>}
      <a href={`http://localhost:8000/responseSheet/${id}/response`} download="reponse"><i 
      className="fa fa-file-excel-o mr-10 ml-5 text-3xl cursor-pointer text-primary-600 hover:text-secondary-600" 
      aria-hidden="true"
      onMouseEnter={() => {setIsHover(true)}}
      onMouseLeave={() => {setIsHover(false)}}
      ></i></a>
      </div>
      <div className="width-full overflow-auto flex justify-center">
        <table className="table-auto border-collapse border-4 border-gray-700 mx-5 my-5">
          <caption>RESPONSES</caption>
          <thead>
            <tr>
              <th
                className="border-2 bg-gray-100 border-gray-700 p-2"
                key={uniqid()}
              >
                S No.
              </th>
              {header.map((ele, index) => {
                return (
                  <th
                    className="border-2 bg-gray-100 border-gray-700 p-2"
                    key={uniqid()}
                  >
                    {ele.ques}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((ele, index) => {
              return (
                <tr key={uniqid()}>
                  <td className="border-2 border-gray-700 p-2" key={uniqid()}>
                    {index}
                  </td>
                  {header.map((e) => {
                    let data = ele.answer[0][e.id];
                    if (Array.isArray(data)) {
                      data = data.join(", ");
                    }
                    //  console.log(data)
                    return (
                      <td className="border-2 border-gray-700 p-2" key={uniqid()}>
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Response;
