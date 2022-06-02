import React from "react";
import Marker from "./Marker";
const SimpleMarker = ({ id, lat, lng, regionName }) => {
  return (
    <Marker key={id} lat={lat} lng={lng}>
      <div className="tooltip-wrap">
        <i
          className="fa fa-circle"
          style={{
            color: "white",
            fontSize: "8px",
            width: `${regionName.length * 10}px`,
          }}
        >
          &nbsp;{regionName}
        </i>

        <div className="tooltip-content">
          <p style={{ fontSize: "20px", margin: "10px" }}>{regionName}</p>
          <p style={{ marginBottom: "19px" }}>
            <span style={{ fontWeight: "bolder" }}>SIM Activation</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              style={{
                color: "green",
                fontSize: "15px",
                fontWeight: "bolder",
              }}
            >
              123
            </span>
            <br />
            <span style={{ fontWeight: "bolder" }}>MNP Activation</span>
            &nbsp;&nbsp;&nbsp;
            <span
              style={{
                color: "green",
                fontSize: "15px",
                fontWeight: "bolder",
              }}
            >
              123
            </span>
          </p>
        </div>
      </div>
    </Marker>
  );
};

export default SimpleMarker;
