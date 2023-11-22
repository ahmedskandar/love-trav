import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getUsers } from "../../services/apiUsers";
import { User as TUser, UserKeys } from "../../lib/types";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "created_at",
    label: "CREATED AT",
  },
  {
    key: "password",
    label: "PASSWORD",
  },
  {
    key: "nationality",
    label: "NATIONALITY",
  },
  {
    key: "notes",
    label: "NOTES",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const UserTable = () => {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  const classNames = useMemo(
    () => ({
      wrapper: ["max-w-6xl mx-auto"],
      th: ["bg-transparent bg-orange-400 text-white"],
    }),
    [],
  );
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
    <Table classNames={classNames} aria-label="Example static collection table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users}>
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
