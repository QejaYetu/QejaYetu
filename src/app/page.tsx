"use client";

import { useState, useCallback, FormEvent } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { LayoutGrid, Fingerprint, CalendarDays, ShieldCheck, ChevronLeft, Bed, Bath, Maximize } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
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
  dimension: string;
  landlordPhone: string;
  imageUrl: string;
  beds: number;
  baths: number;
  sqft: number;
}

const mockProperties: Property[] = [
  {
    id: "prop-1",
    lat: -1.300587,
    lng: 36.814392,
    name: "Qeja Hub - Madaraka",
    price: "KES 15,000/mo",
    dimension: "Single • Ensuite",
    landlordPhone: "+254700000001",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    beds: 1,
    baths: 1,
    sqft: 180,
  },
  {
    id: "prop-2",
    lat: -1.292066,
    lng: 36.821946,
    name: "Campus View Apartments",
    price: "KES 12,500/mo",
    dimension: "Double • Shared",
    landlordPhone: "+254700000002",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1e59235777?auto=format&fit=crop&w=800&q=80",
    beds: 2,
    baths: 1,
    sqft: 220,
  },
  {
    id: "prop-3",
    lat: -1.308726,
    lng: 36.812235,
    name: "Strathmore Annex Co-living",
    price: "KES 18,000/mo",
    dimension: "Studio • Private",
    landlordPhone: "+254700000003",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    beds: 1,
    baths: 1,
    sqft: 250,
  },
  {
    id: "prop-4",
    lat: -1.283333,
    lng: 36.816667,
    name: "CBD Student Lofts",
    price: "KES 20,000/mo",
    dimension: "Premium Studio",
    landlordPhone: "+254700000004",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    beds: 1,
    baths: 1,
    sqft: 300,
  },
];

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Form State
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [smsStatus, setSmsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onMapClick = useCallback(() => {
    // Optional
  }, []);

  const handleSmsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProperty || !phoneNumber || !studentName) return;

    setSmsStatus("loading");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentPhone: phoneNumber,
          landlordPhone: selectedProperty.landlordPhone,
          propertyName: `${selectedProperty.name} (Inquiry from ${studentName})`,
        }),
      });
      if (res.ok) {
        setSmsStatus("success");
        setTimeout(() => {
          setSmsStatus("idle");
          setStudentName("");
          setPhoneNumber("");
          setMessage("");
        }, 3000);
      } else {
        setSmsStatus("error");
      }
    } catch {
      setSmsStatus("error");
    }
  };

  return (
    <div className="bg-zinc-950 text-white font-sans selection:bg-zinc-800">
      
      {/* SECTION 1: Cinematic Hero */}
      <section className="min-h-screen relative flex flex-col justify-between py-8 px-6 sm:px-12 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-b border-zinc-900">
        <header className="flex justify-between items-center z-10 w-full max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-widest text-zinc-100">QY</div>
          <nav className="hidden md:flex space-x-10 text-xs tracking-widest font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">HOME</a>
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#" className="hover:text-white transition-colors">PROPERTIES</a>
            <a href="#" className="hover:text-white transition-colors">CONTACT</a>
          </nav>
          <div className="w-8 h-8"></div> {/* Spacer for flex balance */}
        </header>

        <div className="flex-1 flex flex-col justify-center items-center z-10 w-full text-center">
          <h1 className="text-[12vw] sm:text-[9vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
            QEJAYETU
          </h1>
        </div>

        <div className="z-10 w-full max-w-7xl mx-auto">
          <p className="text-sm tracking-[0.2em] font-semibold text-zinc-400 uppercase">
            A NEW STANDARD <br className="sm:hidden"/> OF STUDENT LIVING.
          </p>
        </div>

        {/* Cinematic abstract background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3f3f46 0%, #09090b 70%)' }}>
        </div>
      </section>

      {/* SECTION 2: Core Services */}
      <section className="py-32 px-6 sm:px-12 border-b border-zinc-900 w-full max-w-8xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">OUR PLATFORM</h2>
            <div className="h-1 w-12 bg-white"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-10">
            <div className="group">
              <span className="text-zinc-600 text-sm font-bold tracking-widest block mb-6">01</span>
              <LayoutGrid className="w-8 h-8 mb-6 text-zinc-400 group-hover:text-white transition-colors" />
              <h3 className="text-lg font-bold mb-3 tracking-wide">Verified Listings</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Curated and inspected properties ensuring safety and quality standards for student habitation.</p>
            </div>
            <div className="group">
              <span className="text-zinc-600 text-sm font-bold tracking-widest block mb-6">02</span>
              <Fingerprint className="w-8 h-8 mb-6 text-zinc-400 group-hover:text-white transition-colors" />
              <h3 className="text-lg font-bold mb-3 tracking-wide">Smart Matching</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Algorithm-driven roommate pairing based on lifestyle preferences and academic priorities.</p>
            </div>
            <div className="group">
              <span className="text-zinc-600 text-sm font-bold tracking-widest block mb-6">03</span>
              <CalendarDays className="w-8 h-8 mb-6 text-zinc-400 group-hover:text-white transition-colors" />
              <h3 className="text-lg font-bold mb-3 tracking-wide">Flexible Terms</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Accommodating payment structures aligned with academic semesters and student budgets.</p>
            </div>
            <div className="group">
              <span className="text-zinc-600 text-sm font-bold tracking-widest block mb-6">04</span>
              <ShieldCheck className="w-8 h-8 mb-6 text-zinc-400 group-hover:text-white transition-colors" />
              <h3 className="text-lg font-bold mb-3 tracking-wide">Secure Living</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Vetted landlords and standard digital agreements for transparent relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Property Discovery */}
      <section className="py-32 px-6 sm:px-12 max-w-8xl mx-auto relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">AVAILABLE SPACES</h2>
            <div className="h-1 w-12 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[900px]">
            {/* Left Column: Dynamic Content Area (List OR Detail View) */}
            <div className="col-span-1 border border-zinc-900 bg-zinc-950/50 flex flex-col overflow-hidden relative">
              
              {!selectedProperty ? (
                <>
                  <div className="p-6 border-b border-zinc-900 shrink-0">
                    <p className="text-xs font-bold tracking-widest text-zinc-500">INDEX</p>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ul className="divide-y divide-zinc-900">
                      {mockProperties.map((prop) => (
                        <li 
                          key={prop.id} 
                          onClick={() => setSelectedProperty(prop)}
                          className="p-6 cursor-pointer hover:bg-zinc-900/50 transition-all duration-300 flex items-center group"
                        >
                          {/* Thumbnail */}
                          <img 
                            src={prop.imageUrl} 
                            alt={prop.name} 
                            className="w-16 h-16 object-cover rounded-md mr-4 opacity-80 group-hover:opacity-100 transition-opacity" 
                          />
                          <div className="flex-1">
                            <h4 className="text-base font-bold mb-1 tracking-wide">{prop.name}</h4>
                            <p className="text-xs text-zinc-400 font-medium tracking-wide mb-1">{prop.dimension}</p>
                            <p className="text-sm font-bold text-white">{prop.price}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* Dynamic Detail View */
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950 animate-in slide-in-from-left flex flex-col">
                  {/* Hero Image */}
                  <div className="relative w-full h-64 shrink-0">
                    <img 
                      src={selectedProperty.imageUrl} 
                      alt={selectedProperty.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                    <button 
                      onClick={() => setSelectedProperty(null)}
                      className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-2xl font-bold mb-1">{selectedProperty.name}</h4>
                    <p className="text-xl font-bold text-zinc-300 mb-6 border-b border-zinc-900 pb-4">{selectedProperty.price}</p>
                    
                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                        <Bed className="w-5 h-5 text-zinc-400 mb-2" />
                        <span className="text-xs font-bold">{selectedProperty.beds} Bed</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                        <Bath className="w-5 h-5 text-zinc-400 mb-2" />
                        <span className="text-xs font-bold">{selectedProperty.baths} Bath</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                        <Maximize className="w-5 h-5 text-zinc-400 mb-2" />
                        <span className="text-xs font-bold">{selectedProperty.sqft} Sqft</span>
                      </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="mt-auto">
                      <h5 className="text-sm font-bold tracking-widest text-zinc-400 mb-6">CONTACT LANDLORD</h5>
                      <form onSubmit={handleSmsSubmit} className="space-y-4">
                        <div>
                          <input 
                            type="text" 
                            required
                            placeholder="Your Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
                          />
                        </div>
                        <div>
                          <input 
                            type="tel" 
                            required
                            placeholder="Phone Number (+254...)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
                          />
                        </div>
                        <div>
                          <textarea 
                            rows={3}
                            placeholder="I am interested in scheduling a viewing..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-none"
                          />
                        </div>

                        {smsStatus === "error" && (
                          <p className="text-red-500 text-xs font-bold tracking-widest">TRANSACTION FAILED. TRY AGAIN.</p>
                        )}
                        {smsStatus === "success" && (
                          <p className="text-emerald-500 text-xs font-bold tracking-widest">MESSAGE SENT SUCCESSFULLY.</p>
                        )}

                        <button 
                          type="submit" 
                          disabled={smsStatus === "loading" || smsStatus === "success"}
                          className="w-full py-4 mt-2 bg-white text-black text-sm font-bold tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {smsStatus === "loading" ? "TRANSMITTING..." : "SEND SECURE SMS"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Google Map */}
            <div className="col-span-1 lg:col-span-2 border border-zinc-900 bg-zinc-900/20 relative">
              {loadError && (
                <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm font-medium tracking-wide">
                  ERROR LOADING MAPS
                </div>
              )}
              {!isLoaded && !loadError && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm tracking-widest font-medium animate-pulse">
                  INITIALIZING FLOOR PLAN...
                </div>
              )}
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={13}
                  center={selectedProperty ? { lat: selectedProperty.lat, lng: selectedProperty.lng } : nairobiCenter}
                  onClick={onMapClick}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    styles: [
                      { elementType: "geometry", stylers: [{ color: "#212124" }] },
                      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                      { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                      { elementType: "labels.text.stroke", stylers: [{ color: "#212124" }] },
                      { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
                      { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                      { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
                      { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
                      { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                      { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#18181a" }] },
                      { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                      { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
                      { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
                      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
                      { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
                      { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
                      { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
                      { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                      { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                      { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
                      { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
                    ],
                  }}
                >
                  {mockProperties.map((prop) => (
                    <Marker
                      key={prop.id}
                      position={{ lat: prop.lat, lng: prop.lng }}
                      onClick={() => setSelectedProperty(prop)}
                      icon={{
                        url: selectedProperty?.id === prop.id 
                          ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                          : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      }}
                    />
                  ))}
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
