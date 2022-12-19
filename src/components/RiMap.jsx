import React, { useState } from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Input } from '@material-tailwind/react';
import { MapIcon } from '@heroicons/react/24/outline';

const options = {
  strokeColor: '#2196F3',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#2196F3',
  fillOpacity: 0.2,
};

const RiMap = () => {
  const [fenceData, setFenceData] = useState({
    center: {
      lat: 26.0289243,
      lng: 88.4682187,
    },
    radius: 100,
  });
  function setRadius(num) {
    setFenceData((prev) => ({ ...prev, radius: Number(num) }));
  }

  const setCenter = (e) => {
    setFenceData((prev) => ({
      ...prev,
      center: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    }));
  };
  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="w-full h-[400px] rounded-lg"
          zoom={16}
          center={fenceData.center}
          onClick={setCenter}
        >
          <Circle
            radius={fenceData.radius}
            center={fenceData.center}
            options={options}
          />
          <Marker
            position={fenceData.center}
            draggable={true}
            onDragEnd={setCenter}
          />
        </GoogleMap>
      </LoadScript>
      <div>
        <div className="mt-5 md:flex items-center gap-5">
          <Input
            type="number"
            label="Geofence Radius"
            size="lg"
            onChange={(e) => setRadius(e.target.value)}
            icon={<MapIcon />}
          />
          <div className="w-fit ml-auto my-5 md:my-0 flex gap-5">
            <Button color="red" variant="text">
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
        <p className="text-sm mt-5">
          <p className="font-bold">How To Change Geofence?</p>
          1. Click on the map or drag the marker to set Geofence center <br />
          2. Enter Geofence radius in meter
          <br />
          3. Check realtime preview & hit save!
        </p>
      </div>
    </>
  );
};

export default React.memo(RiMap);
