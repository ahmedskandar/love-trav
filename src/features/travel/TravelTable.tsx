import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Spinner,
  Avatar,
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
import { TEditForm } from "../../lib/types";

const TravelTable = ({
  isOpen,
  onOpenChange,
  setMapPosition,
  setShouldUpdateCenter,
  onFormOpen,
  setEditTravelValues,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  setShouldUpdateCenter: React.Dispatch<React.SetStateAction<boolean>>;
  onFormOpen: () => void;
  setEditTravelValues: React.Dispatch<React.SetStateAction<TEditForm | undefined>>;
}) => {
  const { user } = useUser();
  const { deleteTravel, isTravelDeleting } = useDeleteTravel();
  const { travels, isGettingTravels } = useGetTravels(user!.id);
const sortedTravels = travels?.slice().sort((a, b) => a.id - b.id);

  return (
    <Modal
      size="5xl"
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
                isStriped
                classNames={{
                  th: "bg-yellow-200",
                  table: isGettingTravels && "min-h-[300px]",
                }}
                removeWrapper
                aria-label="Example static collection table"
              >
                <TableHeader>
                  <TableColumn>NO.</TableColumn>
                  <TableColumn>CITY</TableColumn>
                  <TableColumn>COUNTRY</TableColumn>
                  <TableColumn>LATITUDE</TableColumn>
                  <TableColumn>LONGITUDE</TableColumn>
                  <TableColumn className="text-center">NOTES</TableColumn>
                  <TableColumn className="text-center">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                  isLoading={isGettingTravels}
                  loadingContent={
                    <Spinner label="Loading..." color="warning" />
                  }
                  emptyContent={"No travels recorded yet."}
                >
                  {sortedTravels!.map((travel, index) => (
                    <TableRow key={travel.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{travel.city}</TableCell>
                      <TableCell className=" space-x-2">
                        <Avatar
                          className="inline-block h-6 w-6"
                          showFallback
                          name={travel.country_code}
                          src={`https://flagcdn.com/${travel.country_code}.svg`}
                        />{" "}
                        <span>{travel.country}</span>
                      </TableCell>
                      <TableCell>{travel.latitude.toFixed(3)}</TableCell>
                      <TableCell>{travel.longitude.toFixed(3)}</TableCell>
                      <TableCell className="max-w-[30%]">
                        {travel.notes}
                      </TableCell>
                      <TableCell className="space-x-3 text-center">
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
                          <Button
                            variant="flat"
                            onClick={() => {
                              setEditTravelValues({
                                id: travel.id,
                                city: travel.city,
                                country: travel.country,
                                latitude: travel.latitude,
                                longitude: travel.longitude,
                                notes: travel.notes,
                              });
                              onFormOpen();
                            }}
                            isIconOnly
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete" color="danger">
                          <Button
                            color="danger"
                            onClick={() => deleteTravel(travel.id)}
                            isIconOnly
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {travels && (
                <Button
                  isDisabled={isTravelDeleting}
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                  onPress={() => {
                    onClose();
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
