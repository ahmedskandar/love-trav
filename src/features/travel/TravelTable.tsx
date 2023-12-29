import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useGetTravels } from "../../hooks/useGetTravels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../hooks/useUser";
import { useDeleteTravel } from "./useDeleteTravel";
import { LatLngExpression } from "leaflet";

const TravelTable = ({
  isOpen,
  onOpenChange,
  setMapPosition,
  setShouldUpdateCenter,
  onFormOpen,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  setShouldUpdateCenter: React.Dispatch<React.SetStateAction<boolean>>;
  onFormOpen: () => void;
}) => {
  const { user } = useUser();
  const { deleteTravel, isTravelDeleting } = useDeleteTravel();
  const { travels, isGettingTravels } = useGetTravels(user!.id);
  return (
    <Modal
      size="3xl"
      backdrop="blur"
      className="z-10"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-serif text-3xl text-yellow-600">
              View your travels
            </ModalHeader>
            <ModalBody>
              <Table
                classNames={{
                  th: "bg-yellow-200",
                  table: isGettingTravels && "min-h-[300px]",
                }}
                removeWrapper
                aria-label="Example static collection table"
              >
                <TableHeader>
                  <TableColumn> </TableColumn>
                  <TableColumn>PLACE</TableColumn>
                  <TableColumn>LATITUDE</TableColumn>
                  <TableColumn>LONGITUDE</TableColumn>
                  <TableColumn>NOTES</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                  isLoading={isGettingTravels}
                  loadingContent={
                    <Spinner label="Loading..." color="warning" />
                  }
                  items={travels ?? []}
                  emptyContent={"No travels recorded yet."}
                >
                  {(travel) => (
                    <TableRow key={travel.id}>
                      <TableCell>{travel.id}</TableCell>
                      <TableCell>{travel.place}</TableCell>
                      <TableCell>{travel.latitude.toFixed(3)}</TableCell>
                      <TableCell>{travel.longitude.toFixed(3)}</TableCell>
                      <TableCell>{travel.notes}</TableCell>
                      <TableCell className="space-x-3">
                        <Tooltip content="View">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setMapPosition([
                                travel.latitude,
                                travel.longitude,
                              ]);
                              onClose();
                              setShouldUpdateCenter(true);
                              setTimeout(
                                () => setShouldUpdateCenter(false),
                                10,
                              );
                            }}
                            isIconOnly
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Edit">
                          <Button variant="flat" isIconOnly>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete" color="danger">
                          <Button
                            isLoading={isTravelDeleting}
                            color="danger"
                            onClick={() => deleteTravel(travel.id)}
                            isIconOnly
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {travels && (
                <Button
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                  onPress={() => {
                    setShouldUpdateCenter(true)
                    onClose()
                    onFormOpen();
                  }}
                >
                  Add travels
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TravelTable;
