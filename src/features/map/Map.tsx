import { LatLngExpression } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGetTravels } from "../../hooks/useGetTravels";
import { Button, useDisclosure } from "@nextui-org/react";
import TravelTable from "../travel/TravelTable";
import TravelForm from "../travel/TravelForm";
import { useUser } from "../../hooks/useUser";
import { toast } from "sonner";

const Map = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const { travels, isGettingTravels } = useGetTravels(user!.id);
  const [shouldUpdateCenter, setShouldUpdateCenter] = useState(false);
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onOpenChange: onFormOpenChange,
    onClose: onFormClose
  } = useDisclosure();

  if (isGettingTravels) toast.loading("Loading travel positions");

  return (
    <>
      <div className="absolute left-1/2 top-8 z-10 mt-5 -translate-x-1/2 -translate-y-1/2">
        <Button
          onClick={() => {
            onOpen();
            setIsOpen(false);
          }}
          color="warning"
          className="font-serif text-lg font-bold"
        >
          View Travels
        </Button>
      </div>
      <MapContainer className="z-0 h-screen" center={mapPosition} zoom={6}>
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {travels?.map((travel) => (
          <Marker
            key={travel.id}
            position={[travel.latitude, travel.longitude]}
          >
            <Popup>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-600 text-lg text-white">
                <span>{travel.id}</span>
              </div>
              <div>{travel.place}</div>
            </Popup>
          </Marker>
        ))}
        {shouldUpdateCenter && <ChangeCenter position={mapPosition} />}
        <DetectClick
          setMapPosition={setMapPosition}
          onOpen={() => {
            setShouldUpdateCenter(true);
            onFormOpen();
          }}
          setIsOpen={setIsOpen}
        />
      </MapContainer>
      <TravelTable
        setMapPosition={setMapPosition}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setShouldUpdateCenter={setShouldUpdateCenter}
      />
      <TravelForm
        setMapPosition={setMapPosition}
        onClose={onFormClose}
        isOpen={isFormOpen}
        setShouldUpdateCenter={setShouldUpdateCenter}
        onOpenChange={onFormOpenChange}
      />
    </>
  );
};

const ChangeCenter = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = ({
  onOpen,
  setIsOpen,
  setMapPosition,
}: {
  onOpen: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
}) => {
  useMapEvents({
    click: (e) => {
      onOpen();
      setIsOpen(false);
      setMapPosition(e.latlng);
    },
  });
  return null;
};

export default Map;
