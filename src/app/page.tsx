"use client";

import { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "1rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
};

const nairobiCenter = {
  lat: -1.286389,
  lng: 36.817223,
};

interface Property {
  id: string;
  lat: number;
  lng: number;
  name: string;
  price: string;
  roommatesAvailable: number;
}

const mockProperties: Property[] = [
  {
    id: "prop-1",
    lat: -1.300587,
    lng: 36.814392,
    name: "Qeja Hub - Madaraka",
    price: "KES 15,000/mo",
    roommatesAvailable: 2,
  },
  {
    id: "prop-2",
    lat: -1.292066,
    lng: 36.821946,
    name: "Campus View Apartments",
    price: "KES 12,500/mo",
    roommatesAvailable: 1,
  },
  {
    id: "prop-3",
    lat: -1.308726,
    lng: 36.812235,
    name: "Strathmore Annex Co-living",
    price: "KES 18,000/mo",
    roommatesAvailable: 3,
  },
  {
    id: "prop-4",
    lat: -1.283333,
    lng: 36.816667,
    name: "CBD Student Lofts",
    price: "KES 20,000/mo",
    roommatesAvailable: 4,
  },
];

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const onMapClick = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white text-red-500 font-medium">
        Error loading maps. Please check your API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-blue-900 font-medium animate-pulse">Loading Discovery Map...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 sm:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-6xl flex flex-col items-center">
        
        <div className="text-center mb-10 w-full max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight mb-4">
            Find Your Perfect <span className="text-blue-600">Qeja</span>
          </h1>
          <p className="text-lg text-slate-600">
            Discover verified student housing and co-living spaces around Nairobi. Flexible payments, trusted roommates.
          </p>
        </div>

        <div className="w-full bg-white p-4 rounded-2xl shadow-xl border border-blue-100/50">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={nairobiCenter}
            onClick={onMapClick}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
          >
            {mockProperties.map((prop) => (
              <Marker
                key={prop.id}
                position={{ lat: prop.lat, lng: prop.lng }}
                onClick={() => setSelectedProperty(prop)}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            ))}

            {selectedProperty && (
              <InfoWindow
                position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <div className="p-3 max-w-[250px] font-sans">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{selectedProperty.name}</h3>
                  <div className="w-full h-px bg-slate-100 mb-2"></div>
                  <p className="text-blue-600 font-semibold text-lg mb-2">{selectedProperty.price}</p>
                  <div className="flex items-center text-sm text-slate-600 bg-blue-50 py-1.5 px-3 rounded-md">
                    <span className="font-medium">Roommates available:</span>
                    <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full font-bold">
                      {selectedProperty.roommatesAvailable}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

      </div>
    </main>
  );
}
