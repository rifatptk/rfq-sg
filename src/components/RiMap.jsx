import React, { useState } from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Input } from '@material-tailwind/react';
import { MapIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from '@/apiConfigs';
import { toast } from 'react-toastify';

const options = {
  strokeColor: '#2196F3',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#2196F3',
  fillOpacity: 0.2,
};

const CENTER = {
  lat: 26.0289243,
  long: 88.4682187,
  radius: 200,
};

const RiMap = ({ geofence = CENTER, userId, token, refetch }) => {
  const API_FENCE = geofence;
  const [fenceData, setFenceData] = useState(geofence);
  function setRadius(num) {
    setFenceData((prev) => ({ ...prev, radius: Number(num) }));
  }

  const setCenter = (e) => {
    setFenceData((prev) => ({
      ...prev,
      lat: e.latLng.lat(),
      long: e.latLng.lng(),
    }));
  };

  function updateGeofence() {
    console.log('update geofence', fenceData);
    fetch(`${BASE_URL}/api/admin/update/location/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(fenceData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch({ force: true });
          toast.success('Successfully updated geofence!');
        } else {
          console.log(data);
          toast.error('Failed to update geofence');
        }
      });
  }
  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="w-full h-[400px] rounded-lg"
          zoom={14}
          center={{
            lng: Number(fenceData.long),
            lat: Number(fenceData.lat),
          }}
          onClick={setCenter}
        >
          <Circle
            radius={Number(fenceData.radius)}
            center={{
              lng: Number(fenceData.long),
              lat: Number(fenceData.lat),
            }}
            options={options}
          />
          <Marker
            position={{
              lng: Number(fenceData.long),
              lat: Number(fenceData.lat),
            }}
            draggable={true}
            onDragEnd={setCenter}
          />
        </GoogleMap>
      </LoadScript>
      <div>
        <div className="mt-5 md:flex items-center gap-5">
          <Input
            type="number"
            label="Geofence Radius in KM"
            size="lg"
            // value={fenceData.radius / 1000}
            onChange={(e) => setRadius(e.target.value * 1000)}
            icon={<MapIcon />}
          />
          <div className="w-fit ml-auto my-5 md:my-0 flex gap-5">
            <Button
              color="red"
              variant="text"
              onClick={() => setFenceData(API_FENCE)}
            >
              Cancel
            </Button>
            <Button onClick={updateGeofence}>Save</Button>
          </div>
        </div>
        <div className="text-sm mt-5">
          <p className="font-bold">How To Change Geofence?</p>
          1. Click on the map or drag the marker to set Geofence center <br />
          2. Enter Geofence radius in KM
          <br />
          3. Check realtime preview & hit save!
        </div>
      </div>
    </>
  );
};

export default React.memo(RiMap);
// export default RiMap;
