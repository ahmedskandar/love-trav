import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import { LatLngExpression } from "leaflet";
import { useForm } from "react-hook-form";
import { travelFormSchema } from "../../lib/schemas";
import { TTravelFormSchema } from "../../lib/types";
import { useAddTravel } from "./useAddTravel";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { getPlaceByPosition } from "../../services/apiTravels";
import { toast } from "sonner";

const TravelForm = ({
  isOpen,
  onOpenChange,
  userSelectedPosition,
  setShouldUpdateCenter,
  setUserSelectedPosition,
  setMapPosition,
  onClose,
}: {
  isOpen: boolean;
  setUserSelectedPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | undefined>
  >;
  onClose: () => void;
  userSelectedPosition: { lat: number; lng: number } | undefined;
  onOpenChange: () => void;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  setShouldUpdateCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TTravelFormSchema>({
    resolver: zodResolver(travelFormSchema),
  });

  const { user } = useUser();
  const { addTravel, isTravelAdding } = useAddTravel();
  const [isPlaceLoading, setIsPlaceLoading] = useState(false);
  const [placeError, setPLaceError] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const onSubmit = (data: TTravelFormSchema) => {
    setMapPosition([data.latitude, data.longitude]);
    addTravel({ ...data, country_code: countryCode, user_id: user!.id });
    //Update center position to the new travel position after submitting the form and disabling it
    setShouldUpdateCenter(true);
    setTimeout(() => {
      onClose();
      setShouldUpdateCenter(false);
    }, 1);
    reset();
    setUserSelectedPosition(undefined);
  };

  // defaultValue only sets the initial value when the component is first rendered,
  //and it won’t update if the userSelectedPosition state changes.
  useEffect(() => {
    if (userSelectedPosition) {
      setValue("latitude", userSelectedPosition.lat);
      setValue("longitude", userSelectedPosition.lng);

      const getPlace = async () => {
        setPLaceError("");
        setIsPlaceLoading(true);
        const place = await getPlaceByPosition({
          lat: userSelectedPosition.lat.toString(),
          lon: userSelectedPosition.lng.toString(),
        });
        setCountryCode(place?.address.country_code ?? "");
        const city =
          place?.address.state ??
          place?.address.country ??
          place?.address.region ??
          place?.address.locality ??
          place?.address.village ??
          "";
        setValue("city", city);
        setValue("country", place?.address.country ?? "");
        !place?.address.country && !city && setPLaceError("Error");
        setIsPlaceLoading(false);
      };

      void getPlace();
    }
  }, [userSelectedPosition, setValue]);

  if(isPlaceLoading) toast.loading("Loading...")

  return (
    <>
      {!isPlaceLoading && !placeError && (
        <Modal
          backdrop="blur"
          onClose={() => {
            setShouldUpdateCenter(false);
            setUserSelectedPosition(undefined);
            reset();
          }}
          className="z-10"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-serif text-3xl text-yellow-600">
                  Add Travel
                </ModalHeader>
                <ModalBody>
                  {/* eslint-disable-next-line */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* When input is disabled, it returns undefined value */}
                    <Input
                      {...register("city")}
                      isInvalid={!!errors.city}
                      errorMessage={errors.city?.message}
                      color="warning"
                      isRequired
                      value={getValues("city") ?? ""}
                      label="City"
                      isDisabled
                    />
                    <Input
                      {...register("country")}
                      isInvalid={!!errors.country}
                      errorMessage={errors.country?.message}
                      color="warning"
                      isRequired
                      endContent={
                        <Avatar
                          className="h-6 w-6"
                          showFallback
                          name={countryCode}
                          src={`https://flagcdn.com/${countryCode}.svg`}
                        />
                      }
                      value={getValues("country") ?? ""}
                      label="Country"
                      isDisabled
                    />
                    <Input
                      {...register("latitude")}
                      isInvalid={!!errors.latitude}
                      errorMessage={errors.latitude?.message}
                      color="warning"
                      type="number"
                      isRequired
                      defaultValue={userSelectedPosition?.lat?.toString() ?? ""}
                      label="Latitude"
                      isDisabled={!!userSelectedPosition}
                    />
                    <Input
                      {...register("longitude")}
                      isRequired
                      isInvalid={!!errors.longitude}
                      errorMessage={errors.longitude?.message}
                      color="warning"
                      type="number"
                      // value={Math.random().toString()}
                      label="Longitude"
                      isDisabled={!!userSelectedPosition}
                      defaultValue={userSelectedPosition?.lng?.toString() ?? ""}
                      // isReadOnly={!!userSelectedPosition}
                    />
                    <Textarea
                      color="warning"
                      label="Notes"
                      {...register("notes")}
                    />
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        isLoading={isTravelAdding}
                        type="submit"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                      >
                        ADD
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}; // onPress={() => {
// setMapPosition([40, 0]);
// setTimeout(() => {
//   onClose();
// }, 1);
// }}

export default TravelForm;
