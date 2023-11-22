import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { UsePaginatedItemsProps } from "../lib/types";

//Custom hook to manage React Query and NextUI Pagination logic
const usePaginatedItems = <T>({
  queryKey,
  queryFn,
  rowsPerPage
}: UsePaginatedItemsProps<T>) => {

  const { isLoading, data, error } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  const [page, setPage] = useState(1);

  const totalPages = data ? Math.ceil(data.length / rowsPerPage) : 1;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data, rowsPerPage]);

  return { isLoading, error, setPage, paginatedItems, page, totalPages };
};

export default usePaginatedItems;
