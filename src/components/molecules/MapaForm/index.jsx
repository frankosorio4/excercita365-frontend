import { Grid } from "@mui/material";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importa o CSS padrão do Leaflet

function MapaForm(dadosLocal) {
    const mapConfig = {
        lat: dadosLocal.latitude,
        lng: dadosLocal.longitude,
        zoom: 10
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                height: { xs: "300px", md: "60vh" },
                width: { xs: "100%", md: "60vw" },
                marginTop: "15px",
                marginBottom: "15px",
                overflow: "hidden",
                borderRadius: "0px",
            }}
        >
            <MapContainer
                center={[mapConfig.lat, mapConfig.lng]}
                zoom={mapConfig.zoom}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "0px",
                }}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[mapConfig.lat, mapConfig.lng]}>
                    <Popup>Aqui está o seu local</Popup>
                </Marker>
            </MapContainer>
        </Grid>
    );
}

export default MapaForm;
