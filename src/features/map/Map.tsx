import { LatLng, LatLngExpression } from "leaflet";
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
import { Avatar, Button, ButtonGroup, useDisclosure } from "@nextui-org/react";
import TravelTable from "../travel/TravelTable";
import TravelForm from "../travel/TravelForm";
import { useUser } from "../../hooks/useUser";
import { toast } from "sonner";
import { formatDate } from "../../lib/utils";
import { getPlaceByPosition } from "../../services/apiTravels";
import { TPlaceSchema } from "../../lib/types";

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
  const [place, setPlace] = useState<TPlaceSchema | undefined>();
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
        <ButtonGroup>
          <Button
            onPress={() => {
              onTableForm();
              setIsOpen(false);
            }}
            color="warning"
            className="font-serif text-lg font-bold"
          >
            View Travels
          </Button>
          <Button
            onPress={() => {
              onFormOpen();
              setIsOpen(false);
              // setPlaceError("");
              setUserSelectedPosition(undefined);
            }}
            color="warning"
            variant="faded"
            className="font-serif text-lg font-bold"
          >
            Add Travel
          </Button>
        </ButtonGroup>
      </div>
      <MapContainer className="z-0 h-screen" center={mapPosition} zoom={6}>
        <TileLayer
          noWrap={true}
          attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {travels?.map((travel, index) => (
          <Marker
            key={travel.id}
            position={[travel.latitude, travel.longitude]}
          >
            <Popup>
              <div className="flex items-center justify-center rounded-sm rounded-l-md bg-yellow-600 px-3 text-xl text-white">
                <span>{index + 1}</span>
              </div>
              <div className="space-y-2 rounded-r-md bg-gray-100 p-2 pl-4">
                <div className="flex items-center justify-center space-x-3">
                  <div>
                    <Avatar
                      size="sm"
                      showFallback
                      name={travel.country_code}
                      src={`https://flagcdn.com/${travel.country_code}.svg`}
                    />
                  </div>
                  {/* Add heading for semanticness */}
                  <div className="text-lg font-bold">
                    {travel.city}, {travel.country}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <time dateTime={travel.created_at.toString()}>
                    {formatDate(travel.created_at)}
                  </time>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {shouldUpdateCenter && <ChangeCenter position={mapPosition} />}
        <DetectClick
          setPlace={setPlace}
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
        // placeError={placeError}
        // setPlaceError={setPlaceError}
        place={place}
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
  setPlace,
}: {
  onOpen: () => void;
  setUserSelectedPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | undefined>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  setPlace: React.Dispatch<React.SetStateAction<TPlaceSchema | undefined>>;
}) => {
  // const [userSelectedPosition, setUserSelectedPosition] = useState<
  //   { lat: number; lng: number } | undefined
  // >();

  const checkUserPositionValidity = async (latlng: LatLng) => {
    let place;
    try {
      toast.loading("Loading...");
      place = await getPlaceByPosition({
        lat: latlng.lat,
        lng: latlng.lng,
      });
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      return;
    }
    //Place is valid and exists
    //Open form and do all those
    setPlace(place);
    setUserSelectedPosition({ lat: place.lat, lng: place.lon });
    onOpen();
    setIsOpen(false);
    setMapPosition(latlng);
  };

  useMapEvents({
    click: (e) => {
      void checkUserPositionValidity(e.latlng);
    },
  });
  return null;
};

export default Map;
