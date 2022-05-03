import React from "react"
import { Box, Paper } from "@mui/material"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import { Icon } from "leaflet"
import logoPin from "../images/logopin.png"

const LocationMap = () => {
  const latLong = [28.605255522154454, -13.896758287291519]
  return typeof window !== "undefined" ? (
    <Box width="100%">
      <Paper elevation={5}>
        <MapContainer
          center={latLong}
          zoom={12}
          style={{
            height: "20rem",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker
            position={latLong}
            icon={
              new Icon({
                iconUrl: logoPin,
                iconAnchor: [20, 80],
              })
            }
          />
        </MapContainer>
      </Paper>
    </Box>
  ) : null
}

export default LocationMap
