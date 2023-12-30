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
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
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
  //Guard against map center alteration upon any component rerender
  const [shouldUpdateCenter, setShouldUpdateCenter] = useState(false);
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const [userSelectedPosition, setUserSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >();
  const {
    isOpen,
    onOpen: onTableForm,
    onOpenChange: onTableOpenChange,
  } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onOpenChange: onFormOpenChange,
    onClose: onFormClose,
  } = useDisclosure();

  if (isGettingTravels) toast.loading("Loading travel positions");

  return (
    <>
      <div className="absolute left-1/2 top-8 z-10 mt-5 -translate-x-1/2 -translate-y-1/2">
        <Button
          onClick={() => {
            onTableForm();
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
          noWrap={true}
          attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {travels?.map((travel) => (
          <Marker
            key={travel.id}
            position={[travel.latitude, travel.longitude]}
          >
            <Popup>
              <div className="flex items-center justify-center rounded-md bg-yellow-600 p-2 text-lg text-white">
                <span>{travel.id}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-3">
                  <Avatar
                    className="inline-block h-6 w-6"
                    showFallback
                    name={travel.country_code}
                    src={`https://flagcdn.com/${travel.country_code}.svg`}
                  />
                  <span className="text-lg font-bold">
                    {travel.city}, {travel.country}
                  </span>
                </div>
                <div>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(travel.created_at))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {shouldUpdateCenter && <ChangeCenter position={mapPosition} />}
        <DetectClick
          setUserSelectedPosition={setUserSelectedPosition}
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
        onOpenChange={onTableOpenChange}
        onFormOpen={onFormOpen}
        setShouldUpdateCenter={setShouldUpdateCenter}
      />
      <TravelForm
        userSelectedPosition={userSelectedPosition}
        setMapPosition={setMapPosition}
        setUserSelectedPosition={setUserSelectedPosition}
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
  setUserSelectedPosition,
}: {
  onOpen: () => void;
  setUserSelectedPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | undefined>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
}) => {
  useMapEvents({
    click: (e) => {
      onOpen();
      setIsOpen(false);
      setMapPosition(e.latlng);
      setUserSelectedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

export default Map;
