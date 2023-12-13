import { useState, useCallback, useEffect } from "react";

export const useCountries = ({ fetchDelay = 0 }) => {
  const [items, setItems] = useState<{ key: string; value: string }[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20; // Number of items per page, adjust as necessary

  const loadCountries = useCallback(async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, fetchDelay));

      const res = await fetch("https://flagcdn.com/en/codes.json", {
        signal,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await res.json()) as Record<string, string>;
      //Converts object into an array of objects, where each object in the array represents a key-value pair from the original object.
      const dataArray = Object.entries(data).map(([key, value]) => ({
        key,
        value,
      }));

      dataArray.sort((a, b) => a.value.localeCompare(b.value));

      const paginatedItems = dataArray.slice(offset, offset + limit);

      setHasMore(offset + limit < dataArray.length);

      setItems((prevItems) => {
        const combinedItems = [...prevItems, ...paginatedItems];
        const uniqueItemsSet = new Set(combinedItems.map((item) => item.key));
        const uniqueItemsArray = Array.from(uniqueItemsSet).map((key) =>
          combinedItems.find((item) => item.key === key),
        );

        return uniqueItemsArray as { key: string; value: string }[];
      });

    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [offset, fetchDelay]);

  useEffect(() => {
    void loadCountries();
  }, [loadCountries]);

  const onLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    void loadCountries();
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
    error,
  };
};
