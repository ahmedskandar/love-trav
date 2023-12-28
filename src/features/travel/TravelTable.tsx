import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
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
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../hooks/useUser";
import { useDeleteTravel } from "./useDeleteTravel";

const TravelTable = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { user } = useUser();
  const { deleteTravel, isTravelDeleting } = useDeleteTravel();
  const { travels, isGettingTravels } = useGetTravels(user!.id);
  if (isGettingTravels) return;
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
                }}
                removeWrapper
                aria-label="Example static collection table"
              >
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>CITY</TableColumn>
                  <TableColumn>COUNTRY</TableColumn>
                  <TableColumn>LATITUDE</TableColumn>
                  <TableColumn>LONGITUDE</TableColumn>
                  <TableColumn>NOTES</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                  items={travels}
                  emptyContent={"No travels recorded yet."}
                >
                  {(travel) => (
                    <TableRow key={travel.id}>
                      <TableCell>{travel.id}</TableCell>
                      <TableCell>{travel.city}</TableCell>
                      <TableCell>{travel.country}</TableCell>
                      <TableCell>{travel.latitude.toFixed(3)}</TableCell>
                      <TableCell>{travel.longitude.toFixed(3)}</TableCell>
                      <TableCell>{travel.notes}</TableCell>
                      <TableCell className="space-x-3">
                        <Tooltip content="Edit">
                          <Button variant="ghost" isIconOnly>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <Button
                            isLoading={isTravelDeleting}
                            variant="flat"
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
              {travels && <Button onPress={onClose}>Add travels</Button>}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TravelTable;
