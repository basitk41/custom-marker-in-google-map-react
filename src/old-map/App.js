import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,
  Polygon,
  Marker,
  InfoBox,
  MarkerClusterer,
} from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import "../style.css";
import { regionData } from "../data";
import {
  faCircle as faIcon,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import Title from "./Title";
import {
  centralRegionCords,
  westRegionCords,
  eastRegionCords,
} from "../coordinates";
// mapLabel.set("position", { lat: 24.678857, lng: 46.689022 });
const App = () => {
  const [state, setState] = useState({ lat: null, lng: null });
  const [path, setPath] = useState(eastRegionCords);
  const [path1] = useState(westRegionCords);
  const [path2] = useState(centralRegionCords);

  const [markersData, setMarkersData] = useState([]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    // lat: 24.678857,
    // lng: 46.689022,
    lat: 24.284319,
    lng: 44.27684,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  const setGoogleMapRef = (map, maps) => {
    let markers = regionData.map((data) =>
      data.data.map((region, i) => (
        <Marker
          key={i}
          icon={{
            path:
              state.lat === region.lat ? faMapMarker.icon[4] : faIcon.icon[4],
            fillColor: "#ffff",
            fillOpacity: 1,
            // anchor: new window.google.maps.Point(
            //   faBus.icon[0] / 2, // width
            //   faBus.icon[1] // height
            // ),
            strokeWeight: 1,
            strokeColor: "#000",
            scale: 0.015,
          }}
          position={{
            lat: region.lat,
            lng: region.lng,
          }}
          onMouseOver={() => {
            setState({
              lat: region.lat,
              lng: region.lng,
            });
          }}
          onMouseOut={() => {
            setState({
              lat: null,
              lng: null,
            });
          }}
        >
          {state?.lat === region.lat && state?.lng === region.lng && (
            <InfoBox
              options={{
                closeBoxURL: ``,
                enableEventPropagation: true,
                pixelOffset: new window.google.maps.Size(-100, -100),
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
                    lat: region.lat,
                    lng: region.lng,
                  });
                }}
                onMouseOut={() => {
                  setState({
                    lat: null,
                    lng: null,
                  });
                }}
              >
                <span style={{ fontSize: "20px" }}>{region.name}</span>
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
          )}
          <Title
            keys="mtl"
            style={{
              padding: `0px 10px`,
              fontSize: "10px",
              color: `white`,
            }}
            pos={region}
            setState={setState}
          />
        </Marker>
      ))
    );
    let markerCluster = new MarkerClusterer(map, markers, {
      imagePath: "/success_icon.svg",
      gridSize: 10,
      minimumClusterSize: 2,
    });
    setMarkersData(markerCluster);
  };

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);
  console.log(path);
  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAGeEUT1rkoJCbpwl2pLzVaM7_04nQcZfI"
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
          center={position}
          onLoad={handleLoad}
          onDragEnd={handleCenter}
          zoom={6}
          version="weekly"
          yesIWantToUseGoogleMapApiInternals
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            // editable
            // draggable
            path={path1}
            options={{
              fillColor: "green",
              fillOpacity: 0.8,
              strokeColor: "red",
              strokeOpacity: 0.8,
              strokeWeight: 3,
            }}
            // Event used when manipulating and adding points
            // onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            // onDragEnd={onEdit}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          />
          <Polygon
            // Make the Polygon editable / draggable
            // editable
            // draggable
            path={path2}
            options={{
              fillColor: "green",
              fillOpacity: 0.8,
              strokeColor: "red",
              strokeOpacity: 0.8,
              strokeWeight: 3,
            }}
            // Event used when manipulating and adding points
            // onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            // onDragEnd={onEdit}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          />
          <Polygon
            // Make the Polygon editable / draggable
            // editable
            // draggable
            path={path}
            options={{
              fillColor: "green",
              fillOpacity: 0.8,
              strokeColor: "red",
              strokeOpacity: 0.8,
              strokeWeight: 3,
            }}
            // Event used when manipulating and adding points
            // onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            // onDragEnd={onEdit}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          />
          {/* <MarkerClusterer gridSize={60} minimumClusterSize={2}> */}
          {/* {markersData} */}
          {regionData.map((data) =>
            data.data.map((region, i) => (
              <Marker
                key={i}
                icon={{
                  path:
                    state.lat === region.lat
                      ? faMapMarker.icon[4]
                      : faIcon.icon[4],
                  fillColor: "#ffff",
                  fillOpacity: 1,
                  // anchor: new window.google.maps.Point(
                  //   faBus.icon[0] / 2, // width
                  //   faBus.icon[1] // height
                  // ),
                  strokeWeight: 1,
                  strokeColor: "#000",
                  scale: 0.015,
                }}
                position={{
                  lat: region.lat,
                  lng: region.lng,
                }}
                onMouseOver={() => {
                  setState({
                    lat: region.lat,
                    lng: region.lng,
                  });
                }}
                onMouseOut={() => {
                  setState({
                    lat: null,
                    lng: null,
                  });
                }}
              >
                {state?.lat === region.lat && state?.lng === region.lng && (
                  <InfoBox
                    options={{
                      closeBoxURL: ``,
                      enableEventPropagation: true,
                      pixelOffset: new window.google.maps.Size(-100, -100),
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
                          lat: region.lat,
                          lng: region.lng,
                        });
                      }}
                      onMouseOut={() => {
                        setState({
                          lat: null,
                          lng: null,
                        });
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{region.name}</span>
                      <p style={{ marginBottom: "19px" }}>
                        <span style={{ fontWeight: "bolder" }}>
                          SIM Activation
                        </span>
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
                        <span style={{ fontWeight: "bolder" }}>
                          MNP Activation
                        </span>
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
                )}
                <Title
                  keys="mtl"
                  style={{
                    padding: `0px 10px`,
                    fontSize: "10px",
                    color: `white`,
                  }}
                  pos={region}
                  setState={setState}
                />
              </Marker>
            ))
          )}
          {/* </MarkerClusterer> */}
          <Title
            keys="mtl"
            pos={{
              lat: 22.340525,
              lng: 41.811799,
              name: "Central Region",
            }}
            style={{
              fontSize: "25px",
              color: `white`,
              fontWeight: "bold",
            }}
          />
          <Title
            keys="mtl"
            pos={{
              lat: 21.407252,
              lng: 49.879925,
              name: "West Region",
            }}
            style={{
              fontSize: "25px",
              color: `white`,
              fontWeight: "bold",
            }}
          />
          <Title
            keys="mtl"
            pos={{
              lat: 29.192233,
              lng: 38.915745,
              name: "East Region",
            }}
            style={{
              fontSize: "25px",
              color: `white`,
              fontWeight: "bold",
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default App;
