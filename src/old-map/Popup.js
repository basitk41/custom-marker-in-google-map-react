import React, { memo } from "react";
import { InfoBox } from "@react-google-maps/api";
const Popup = ({ pos, setState = () => {} }) => {
  return (
    <InfoBox
      options={{
        closeBoxURL: ``,
        enableEventPropagation: true,
        pixelOffset: window.google && new window.google.maps.Size(-100, -100),
        boxStyle: {
          backgroundColor: `white`,
          opacity: 0.9,
          // width: "50px",
          borderRadius: "5px",
        },
      }}
    >
      <div
        className="popover__content"
        onMouseOver={() => {
          setState({
            lat: pos.lat,
            lng: pos.lng,
          });
        }}
        onMouseOut={() => {
          setState({
            lat: null,
            lng: null,
          });
        }}
      >
        <span style={{ fontSize: "20px" }}>{pos.name}</span>
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
    </InfoBox>
  );
};

export default memo(Popup);
