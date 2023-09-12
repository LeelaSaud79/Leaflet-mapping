import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  Circle,
  CircleMarker,
  Polyline,
  Polygon,
  Rectangle,
} from "react-leaflet";
import "./App.scss";
import "leaflet/dist/leaflet.css";
import Geocoding from "./container/Geocoding";
import Loading from "./container/Loading";

import { ReverseGeocoding } from "./container/ReverseGeocoding";

const center = [28.3949, 84.1240];

const polygon2 = [
  [85.30967229911812, 27.732066805778018],
  [85.30967229911812, 27.719569967078925],
  [85.33763105057045, 27.719569967078925],
  [85.33763105057045, 27.732066805778018],
  [85.30967229911812, 27.732066805778018],
];

const polyline = [
  [82.6491653579942, 28.30460238465554],
  [84.58356098629224, 28.159115043356834],
];

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
];

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
];


const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

const position = [51.505, -0.09];

function Map() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        setLocation([
          geoPosition.coords.latitude,
          geoPosition.coords.longitude,
        ]);
        setMarkerPosition([
          geoPosition.coords.latitude,
          geoPosition.coords.longitude,
        ]);
        setLoading(false);
      },
      (geoError) => {
        setError(geoError.message);
        setLocation(position);
        setLoading(false);
      }
    );
  }, []);
  console.log(markerPosition);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="map-container">
        
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle center={center} pathOptions={fillBlueOptions} radius={200} />

        

          <CircleMarker
            center={[51.51, -0.12]}
            pathOptions={redOptions}
            radius={20}
          >
            <Popup>Popup in CircleMarker</Popup>
          </CircleMarker>

          <Polyline pathOptions={limeOptions} positions={multiPolyline} />

          <Polyline pathOptions={limeOptions} positions={polyline} />
          <Polygon pathOptions={purpleOptions} positions={polygon2} />

          <ReverseGeocoding location={markerPosition} />

          <ScaleControl imperial={false} />
          <Geocoding />
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
