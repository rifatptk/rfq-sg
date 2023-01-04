import { BASE_URL } from '@/apiConfigs';
import { Marker } from '@react-google-maps/api';
import React from 'react';
import { useQuery } from 'react-query';

const RiUserLocation = ({ userId, token }) => {
  //current user location
  const { data: userLocation } = useQuery(
    ['userLocation', userId],
    () =>
      fetch(`${BASE_URL}/api/admin/user-location/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => data.userLocaton),
    {
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {userLocation ? (
        <Marker
          icon="/img/user-32.png"
          clickable={false}
          zIndex={-1}
          position={{
            lng: Number(userLocation.long),
            lat: Number(userLocation.lat),
          }}
        />
      ) : null}
    </>
  );
};

export default RiUserLocation;
