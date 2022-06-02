import React from "react";
import Marker from "./Marker";
const ClusterMarker = ({
  cluster,
  lat,
  lng,
  supercluster,
  mapRef,
  pointCount,
}) => {
  return (
    <Marker key={`cluster-${cluster.id}`} lat={lat} lng={lng}>
      <div
        style={{
          color: "#FFF",
          borderRadius: "50%",
          padding: "10px",
          display: "flex",
          width: `${pointCount}px`,
          height: `${pointCount}px`,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue",
        }}
        onClick={() => {
          const expensionZoom = Math.min(
            supercluster.getClusterExpansionZoom(cluster.id),
            20
          );
          mapRef.current.setZoom(expensionZoom);
          mapRef.current.panTo({ lat, lng });
        }}
      >
        {pointCount}
      </div>
    </Marker>
  );
};

export default ClusterMarker;
