import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { useCallback } from "react";
// import { getUsers } from "../services/apiUsers";
import { User as TUser, UserKeys } from "../../lib/types";
import { COLUMNS } from "../../data/constants";
import { getUsers } from "../../services/apiUsers";
import usePaginatedItems from "../../hooks/usePaginatedItems";

const UserTable = () => {
  const { error, isLoading, setPage, totalPages, paginatedItems, page } =
    usePaginatedItems({
      queryKey: ["user"],
      queryFn: getUsers,
    });

  const renderCell = useCallback((user: TUser, columnKey: keyof TUser) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case UserKeys.STATUS:
        return (
          <Chip
            className="capitalize"
            color={"success"}
            size="sm"
            variant="flat"
          >
            {"Online"}
          </Chip>
        );
      case UserKeys.NAME:
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            description={user.email}
            name={user.username}
          >
            {user.email}
          </User>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) return <p>Loading...</p>; // Use a loading spinner here
  if (error) return <p>Something went wrong...</p>; // Use a more user-friendly error message or component here

  return (
    <Table
      classNames={{
        wrapper: ["max-w-6xl mx-auto"],
        th: ["bg-transparent bg-orange-400 text-white"],
      }}
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="warning"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={COLUMNS}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={paginatedItems}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(user, columnKey as keyof TUser)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
