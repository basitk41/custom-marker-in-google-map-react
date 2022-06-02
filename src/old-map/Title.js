import React, { memo } from "react";
import { OverlayView } from "@react-google-maps/api";
const Title = ({ pos, style, keys, setState = () => {} }) => {
  return (
    <OverlayView
      key={keys}
      position={{
        lat: pos.lat,
        lng: pos.lng,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        //   className="popover__wrapper"
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
        style={style}
      >
        {pos.name}
      </div>
    </OverlayView>
  );
};

export default memo(Title);
