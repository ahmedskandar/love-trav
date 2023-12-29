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
} from "@nextui-org/react";
import { LatLngExpression } from "leaflet";
import { useForm } from "react-hook-form";
import { travelFormSchema } from "../../lib/schemas";
import { TTravelFormSchema } from "../../lib/types";
import { useAddTravel } from "./useAddTravel";
import { useUser } from "../../hooks/useUser";

const TravelForm = ({
  isOpen,
  onOpenChange,
  setShouldUpdateCenter,
  setMapPosition,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void,
  onOpenChange: () => void;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  setShouldUpdateCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TTravelFormSchema>({
    resolver: zodResolver(travelFormSchema),
  });

  const {user} = useUser()
  const {addTravel, isTravelAdding} = useAddTravel()

  const onSubmit = (data: TTravelFormSchema) => {
    addTravel({...data, user_id: user!.id})
     setMapPosition([data.latitude, data.longitude]);
     setTimeout(() => {
       onClose();
       setShouldUpdateCenter(false);
     }, 1);
     reset()
  };

  return (
    <Modal
      backdrop="blur"
      onClose={() => setShouldUpdateCenter(false)}
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
                <Input
                  {...register("latitude")}
                  isInvalid={!!errors.latitude}
                  errorMessage={errors.latitude?.message}
                  color="warning"
                  type="number"
                  label="Latitude"
                />
                <Input
                  {...register("longitude")}
                  isInvalid={!!errors.longitude}
                  errorMessage={errors.longitude?.message}
                  color="warning"
                  type="number"
                  label="Longitude"
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
                  <Button isLoading={isTravelAdding} type="submit" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white">
                    ADD
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}; // onPress={() => {
  // setMapPosition([40, 0]);
  // setTimeout(() => {
  //   onClose();
  // }, 1);
// }}

export default TravelForm;
