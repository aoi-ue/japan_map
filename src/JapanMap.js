import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

import japanMap from "./japan.json";
import rawData from "./Raw_Data.csv";

const colorScale = scaleLinear()
  .domain([10000, 1000000])
  .range(["#ffedea", "#ff5233"]);

const JapanMap = ({ setTooltipContent, state }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(rawData).then(data => {
      setData(data);
    });
  }, []);

//   const ourCount = {};

//   data.forEach(entry => {
//     if (!ourCount[entry.State]) {
//       ourCount[entry.State] = 0;
//     }
//     ourCount[entry.State] += Number(entry["Total Population"]);
//   });

// //   console.log(ourCount)

// const output = data.reduce((accumulator, cur) => {
//   let state = cur.State;
//   let found = accumulator.find(elem => elem.State === state)
//   if (found) found["Total Population"] += Number(cur["Total Population"]);
//   else accumulator.push(cur);
//   return accumulator;
// }, []);

// console.log(output)


  return (
    <div>
      <ComposableMap data-tip="" projection="geoMercator">
        <ZoomableGroup center={[141.429741, 43.413327]} zoom={5}>
          <Geographies geography={japanMap.features}>
            {({ geographies }) =>
              geographies.map(geo => {
                const d = data.find(s => s.State === geo.properties.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["Total Population"]) : "#F5F4F6"}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltipContent(`${name}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    // style={{
                    //   default: {
                    //     fill: "#D6D6DA",
                    //     outline: "none"
                    //   },
                    //   hover: {
                    //     fill: "#F53",
                    //     outline: "none"
                    //   },
                    //   pressed: {
                    //     fill: "#E42",
                    //     outline: "none"
                    //   }
                    // }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default JapanMap;
