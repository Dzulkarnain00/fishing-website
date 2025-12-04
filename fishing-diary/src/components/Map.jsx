import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./map.css";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map() {
    return (
        <MapContainer
            center={[5.4164, 100.3327]} // Penang
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[5.4164, 100.3327]}>
                <Popup>Default Marker Example</Popup>
            </Marker>
        </MapContainer>
    );
}
