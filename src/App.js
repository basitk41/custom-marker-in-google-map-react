import React, { useRef, useState } from "react";
import GoogleMap from "google-map-react";
import useSupercluster from "use-supercluster";
import { regionData } from "./data";
import { regionsCords, titles } from "./coordinates";
import SimpleMarker from "./components/SimpleMarker";
import ClusterMarker from "./components/ClusterMarker";
import Marker from "./components/Marker";
import "./style.css";

const Test = () => {
  // map setup
  const mapRef = useRef();
  const [zoom, setZoom] = useState(6);
  const [bounds, setBounds] = useState(null);

  // load and format data
  const points = regionData.map((point, i) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: i + 1,
      regionName: point.name,
    },
    geometry: {
      type: "Point",
      coordinates: [point.lng, point.lat],
    },
  }));

  // setup supercluster
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  // polygon
  const handleApiLoaded = (map, maps) => {
    regionsCords.map((region) => {
      var mappedRegion = new maps.Polygon({
        paths: region.data,
        fillColor: "green",
        fillOpacity: 0.8,
        strokeColor: "red",
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });
      mappedRegion.setMap(map);
    });
  };

  // render the map
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        }}
        defaultCenter={{ lat: 24.284319, lng: 44.27684 }}
        defaultZoom={6}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          handleApiLoaded(map, maps);
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {titles.map((title, i) => (
          <Marker key={`a-${i}`} lat={title.lat} lng={title.lng}>
            <div
              style={{
                width: "200px",
                color: "white",
                fontSize: `${zoom * 3}px`,
                fontWeight: "bolder",
              }}
            >
              {title.name}
            </div>
          </Marker>
        ))}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
            id,
            regionName,
          } = cluster.properties;
          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                cluster={cluster}
                lat={latitude}
                lng={longitude}
                supercluster={supercluster}
                mapRef={mapRef}
                pointCount={pointCount}
              />
            );
          }
          return (
            <SimpleMarker
              key={`marker-${id}`}
              id={id}
              lat={latitude}
              lng={longitude}
              regionName={regionName}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Test;
