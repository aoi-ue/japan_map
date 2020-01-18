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

const findTotalGenderPopulation = (array, ageRange, gender) => {
  let groupByAge = groupBy(array, "Age");
  if (array === undefined) return null;
  let key = groupByAge[ageRange];
  if (key === undefined) return null;
  const result = key.map(el =>
    Object.keys(el).find(key => el[key] === gender)
      ? el["Total Population"]
      : undefined
  );
  return result.filter(el => el);
};

const sum = a => (a ? a.reduce((a, b) => +a + +b, 0) : null);

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
  return +result.filter(el => el);
};

const convert = value => {
  let length = (value + "").length,
    index = Math.ceil((length - 3) / 3),
    suffix = ["K", "M", "B", "T"];
  if (length < 4) return value;
  return (value / Math.pow(1000, index)).toFixed(1) + suffix[index - 1];
};

const Table = ({ content }) => {
  const [data, setData] = useState([]);

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
          ? convert(Object.values(total).reduce((a, b) => a + b, 0))
          : convert(total[content])}
      </h2>
      <h3>
        {content === ""
          ? `Male:${convert(totalGender.Male)}, Female:${convert(
              totalGender.Female
            )}`
          : `Male:${convert(getPref(content).Male)} , Female:${convert(
              getPref(content).Male
            )}`}
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
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Below 20", "Male")))
                : convert(
                    findSpecificPopulation(data, content, "Below 20", "Male")
                  )}
            </td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Below 20", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "Below 20", "Female")
                  )}
            </td>

            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Below 20", "Male")) +
                  sum(findTotalGenderPopulation(data, "Below 20", "Female")))
                : convert(
                    findSpecificPopulation(
                      data,
                      content,
                      "Below 20",
                      "Female"
                    ) +
                      findSpecificPopulation(data, content, "Below 20", "Male")
                  )}
            </td>
          </tr>

          <tr>
            <td>20-40</td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "20-40", "Male")))
                : convert(
                    findSpecificPopulation(data, content, "20-40", "Male")
                  )}
            </td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "20-40", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "20-40", "Female")
                  )}
            </td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "20-40", "Male")) +
                  sum(findTotalGenderPopulation(data, "20-40", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "20-40", "Female") +
                      findSpecificPopulation(data, content, "20-40", "Male")
                  )}
            </td>
          </tr>

          <tr>
            <td>40-60</td>
            <td>
              {" "}
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "40-60", "Male")))
                : convert(
                    findSpecificPopulation(data, content, "40-60", "Male")
                  )}
            </td>
            <td>
              {" "}
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "40-60", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "40-60", "Female")
                  )}
            </td>

            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "40-60", "Male")) +
                  sum(findTotalGenderPopulation(data, "40-60", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "40-60", "Female") +
                      findSpecificPopulation(data, content, "40-60", "Male")
                  )}
            </td>
          </tr>

          <tr>
            <td>Above 60</td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Above 60", "Male")))
                : convert(
                    findSpecificPopulation(data, content, "Above 60", "Male")
                  )}
            </td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Above 60", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "Above 60", "Female")
                  )}
            </td>
            <td>
              {content === ""
                ? convert(sum(findTotalGenderPopulation(data, "Above 60", "Male")) +
                  sum(findTotalGenderPopulation(data, "Above 60", "Female")))
                : convert(
                    findSpecificPopulation(data, content, "Above 60", "Female") +
                      findSpecificPopulation(data, content, "Above 60", "Male")
                  )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
