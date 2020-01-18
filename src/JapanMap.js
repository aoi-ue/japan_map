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

const JapanMap = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(rawData).then(data => {
      setData(data);
    });
  }, []);

  return (
    <div className="map">
      <ComposableMap data-tip="" projection="geoMercator">
        <ZoomableGroup center={[141.429741, 43.413327]} zoom={6}>
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
