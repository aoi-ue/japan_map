import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";

import rawData from "./Raw_Data.csv";

const Table = ({ content }) => {
  const [data, setData] = useState([]);

  const getPref = input => data.filter(el => el.State === input);

  useEffect(() => {
    csv(rawData).then(data => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      <h1> {content} </h1>
      {/* {getPref(content).map((el, i) => (
        <li key={i}>{el["Total Population"]}</li>
      ))} */}
      <table>
        {/* <tr>
          <td>Age</td>
          <td>Male</td>
          <td>Female</td>
          <td>Age</td>
        </tr> */}

        {getPref(content).map((el, i) => (
          <tr key={i}>
            <td>{el["Age"]} </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Table;
