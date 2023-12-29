import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Switch,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useState } from "react";

const TravelForm = ({
  isOpen,
  onOpenChange,
  setShouldUpdateCenter,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  setShouldUpdateCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPositionSelected, setIsPositionSelected] = useState(false);

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
              <Switch
                isSelected={isPositionSelected}
                onValueChange={setIsPositionSelected}
                color="warning"
              >
                Search by position
              </Switch>
              <Autocomplete
                isRequired
                color="warning"
                label="Search place"
                isDisabled={isPositionSelected}
              >
                <AutocompleteItem key="cat" value="cat">
                  Cat
                </AutocompleteItem>
                <AutocompleteItem key="dog" value="dog">
                  Dog
                </AutocompleteItem>
              </Autocomplete>
              <Input
                color="warning"
                type="number"
                label="Latitude"
                isDisabled={!isPositionSelected}
              />
              <Input
                color="warning"
                type="number"
                label="Longitude"
                isDisabled={!isPositionSelected}
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
