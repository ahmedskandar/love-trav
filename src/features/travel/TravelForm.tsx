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
import { TEditForm, TPlaceSchema, TTravelFormSchema } from "../../lib/types";
import { useAddTravel } from "./useAddTravel";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { getPlaceByPosition } from "../../services/apiTravels";
import { toast } from "sonner";
import { useEditTravel } from "./useEditTravel";

const TravelForm = ({
  isOpen,
  onOpenChange,
  userSelectedPosition,
  setShouldUpdateCenter,
  setUserSelectedPosition,
  setMapPosition,
  onClose,
  place,
  editTravelValues,
  setEditTravelValues,
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
  place: TPlaceSchema | undefined;
  setEditTravelValues: React.Dispatch<
    React.SetStateAction<TEditForm | undefined>
  >;
  editTravelValues: TEditForm | undefined;
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
  const { editTravel, isTravelEditing } = useEditTravel();
  const [isPlaceLoading, setIsPlaceLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [isPlaceError, setIsPlaceError] = useState(false);

  const onSubmit = (data: TTravelFormSchema) => {
    if (isPlaceError) return toast.error("Please input a valid location");
    if (
      (data.city === editTravelValues?.city &&
      data.country === editTravelValues?.country &&
      data.latitude === editTravelValues?.latitude &&
      data.longitude === editTravelValues?.longitude &&
      data.notes === editTravelValues?.notes)
    ) {
      return toast.info("Nothing was updated")
    } else console.log("diff");
    if (editTravelValues) {
      editTravel({
        id: editTravelValues.id,
        latitude: data.latitude,
        longitude: data.longitude,
        notes: data.notes,
        city: data.city,
        country: data.country,
      });
      onClose();
    } else {
      addTravel({ ...data, country_code: countryCode, user_id: user!.id });
      setMapPosition([data.latitude, data.longitude]);
      //Update center position to the new travel position after submitting the form and disabling it
      setShouldUpdateCenter(true);
      setTimeout(() => {
        onClose();
        setShouldUpdateCenter(false);
      }, 1);
    }

    reset({
      city: "",
      country: "",
      notes: "",
      latitude: undefined,
      longitude: undefined,
    });
    setUserSelectedPosition(undefined);
    setCountryCode("");
    setIsPlaceError(false);
    setEditTravelValues(undefined);
  };
 
  const handleBlur = () => {
    const fetchData = async () => {
      if (getValues("latitude") && getValues("longitude")) {
        let place;
        try {
          setIsPlaceError(false);
          setIsPlaceLoading(true);
          place = await getPlaceByPosition({
            lat: getValues("latitude"),
            lng: getValues("longitude"),
          });
        } catch (e) {
          setCountryCode("");
          setValue("city", "");
          setValue("country", "");
          if (e instanceof Error) {
            setIsPlaceError(true);
            toast.error(e.message);
          }
          return;
        } finally {
          setIsPlaceLoading(false);
        }
        const city =
          place?.address.state ??
          place?.address.country ??
          place?.address.region ??
          place?.address.locality ??
          place?.address.village ??
          "";
        setValue("city", city);
        setCountryCode(place?.address.country_code ?? "");
        setValue("country", place?.address.country ?? "");
        setIsPlaceLoading(false);
      }
    };

    void fetchData();
  };
  // console.log('render') ****FIX COMPONENT RENDERING WHEN PARENT COMPONENTS RENDER LATER!

  // defaultValue only sets the initial value when the component is first rendered,
  //and it won’t update if the userSelectedPosition state changes.
  useEffect(() => {
    if (userSelectedPosition) {
      setCountryCode(place?.address.country_code ?? "");
      const city =
        place?.address.state ??
        place?.address.country ??
        place?.address.region ??
        place?.address.locality ??
        place?.address.village ??
        "";
      setValue("latitude", userSelectedPosition.lat);
      setValue("longitude", userSelectedPosition.lng);
      setValue("city", city);
      setValue("country", place?.address.country ?? "");
      return;
    }
    if (editTravelValues) {
      //  setCountryCode(editTravelValues.country ?? "");

      setValue("latitude", editTravelValues.latitude);
      setValue("longitude", editTravelValues.longitude);
      setValue("city", editTravelValues.city);
      setValue("country", editTravelValues.country ?? "");
      setValue('notes', editTravelValues.notes)
      return;
    }
  }, [place?.address, setValue, userSelectedPosition, editTravelValues]);
  return (
    <>
      <Modal
        backdrop="blur"
        onClose={() => {
          setShouldUpdateCenter(false);
          setUserSelectedPosition(undefined);
          setCountryCode("");
          setIsPlaceError(false);
          setEditTravelValues(undefined);
          // setValue("latitude", 0);
          // setValue("longitude", 0);
          // setValue("city", "");
          // setValue("country", "");
          //Reset in react hook form resets the value to the defaultValue (which is not what I want)
          reset({
            city: "",
            country: "",
            notes: "",
            latitude: 0,
            longitude: 0,
          });
        }}
        className="z-10"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-serif text-3xl text-yellow-600">
                {editTravelValues ? "Edit Travel" : "Add Travel"}
              </ModalHeader>
              <ModalBody>
                {/* eslint-disable-next-line */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <Input
                    {...register("city")}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                    color="warning"
                    isRequired
                    value={
                      isPlaceLoading ? "Loading..." : getValues("city") ?? ""
                    }
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
                      countryCode && (
                        <Avatar
                          className="h-6 w-6"
                          showFallback={true}
                          name={countryCode}
                          src={`https://flagcdn.com/${countryCode}.svg`}
                        />
                      )
                    }
                    value={
                      isPlaceLoading ? "Loading..." : getValues("country") ?? ""
                    }
                    label="Country"
                    isDisabled
                  />
                  <Input
                    {...register("latitude")}
                    isInvalid={!!errors.latitude}
                    errorMessage={errors.latitude?.message}
                    color="warning"
                    isRequired
                    onBlur={handleBlur}
                    defaultValue={
                      userSelectedPosition?.lat?.toString() ??
                      editTravelValues?.latitude.toString() ??
                      ""
                    }
                    label="Latitude"
                    isDisabled={!!userSelectedPosition}
                    placeholder="0"
                  />
                  <Input
                    {...register("longitude")}
                    onBlur={handleBlur}
                    isRequired
                    isInvalid={!!errors.longitude}
                    errorMessage={errors.longitude?.message}
                    color="warning"
                    type="number"
                    label="Longitude"
                    isDisabled={!!userSelectedPosition}
                    defaultValue={
                      userSelectedPosition?.lng?.toString() ??
                      editTravelValues?.longitude.toString() ??
                      ""
                    }
                    placeholder="0"
                  />
                  <Textarea
                    color="warning"
                    defaultValue={editTravelValues?.notes}
                    label="Notes"
                    {...register("notes")}
                  />
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      isLoading={
                        isTravelAdding || isPlaceLoading || isTravelEditing
                      }
                      type="submit"
                      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                    >
                      {editTravelValues ? "EDIT" : "ADD"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TravelForm;
