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

const TravelForm = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      backdrop="blur"
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
              <Input color="warning" label="City" />
              <Input color="warning" label="Country" isDisabled />
              <Input
                color="warning"
                type="number"
                label="Latitude"
                isDisabled
              />
              <Input
                color="warning"
                type="number"
                label="Longitude"
                isDisabled
              />
              <Textarea color="warning" label="Notes" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                onPress={onClose}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TravelForm;
