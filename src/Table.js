import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";

import rawData from "./Raw_Data.csv";

const groupBy = (array, key) => {
  if (array === undefined) return;
  return array.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const findSpecificPopulation = (array, state, ageRange, gender) => {
  let groupByState = groupBy(array, "State");
  if (array === undefined) return null;
  let groupBySpecific = groupBy(groupByState[state], "Age");
  if (groupBySpecific === undefined) return null;
  let key = groupBySpecific[ageRange];
  const result = key.map(el =>
    Object.keys(el).find(key => el[key] === gender)
      ? el["Total Population"]
      : undefined
  );
  return result.filter(el => el);
};

function convert(value) {
    var length = (value + '').length,
        index = Math.ceil((length - 3) / 3),
        suffix = ['K', 'M', 'B', 'T'];

    if (length < 4) return value;
    return (value / Math.pow(1000, index)).toFixed(1) + suffix[index - 1];
}

const Table = ({ content }) => {
  const [data, setData] = useState([]);
  // const getPref = input => data.filter(el => el.State === input);

  const total = data.reduce(function(pv, cv) {
    if (pv[cv.State]) {
      pv[cv.State] += Number(cv["Total Population"]);
    } else {
      pv[cv.State] = Number(cv["Total Population"]);
    }
    return pv;
  }, {});

  const totalGender = data.reduce(function(pv, cv) {
    if (pv[cv.Gender]) {
      pv[cv.Gender] += Number(cv["Total Population"]);
    } else {
      pv[cv.Gender] = Number(cv["Total Population"]);
    }
    return pv;
  }, {});

  const getPref = input =>
    data
      .filter(el => el.State === input)
      .reduce(function(pv, cv) {
        if (pv[cv.Gender]) {
          pv[cv.Gender] += Number(cv["Total Population"]);
        } else {
          pv[cv.Gender] = Number(cv["Total Population"]);
        }
        return pv;
      }, {});

  useEffect(() => {
    csv(rawData).then(data => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="table">
      <h1> total Population </h1>
      <h2>
        {content === ""
          ? Object.values(total).reduce((a, b) => a + b, 0)
          : total[content]}
      </h2>
      <h3>
        {content === ""
          ? `Male:${totalGender.Male}, Female:${totalGender.Female}`
          : `Male:${getPref(content).Male} , Female:${getPref(content).Male}`}
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Age</td>
            <td>Male</td>
            <td>Female</td>
            <td>Total</td>
          </tr>

          <tr>
            <td>Below 20</td>
            <td>{findSpecificPopulation(data, content, "Below 20", "Male")}</td>
            <td>
              {findSpecificPopulation(data, content, "Below 20", "Female")}
            </td>
          </tr>

          <tr>
            <td>20-40</td>
            <td>{findSpecificPopulation(data, content, "20-40", "Male")}</td>
            <td>{findSpecificPopulation(data, content, "20-40", "Female")}</td>
          </tr>

          <tr>
            <td>40-60</td>
            <td>{findSpecificPopulation(data, content, "40-60", "Male")}</td>
            <td>{findSpecificPopulation(data, content, "40-60", "Female")}</td>
          </tr>

          <tr>
            <td>Above 60</td>
            <td>{findSpecificPopulation(data, content, "Above 60", "Male")}</td>
            <td>
              {findSpecificPopulation(data, content, "Above 60", "Female")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
