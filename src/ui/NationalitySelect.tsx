import { NationalitySelectProps } from "../lib/types";

import { Select, SelectItem, Avatar } from "@nextui-org/react";
// import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import {useState} from 'react'
import { useCountries } from "../hooks/useCountries";

const NationalitySelect = ({ control, formError: error }: NationalitySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, hasMore, isLoading, onLoadMore, error: countryError } = useCountries({
    fetchDelay: 500,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });


  return (
    <Controller
      name="nationality"
      control={control}
      render={({ field }) => (
        <Select
          isRequired
          isLoading={isLoading}
          selectedKeys={field.value || []}
          onSelectionChange={field.onChange}
          items={items}
          isInvalid={!!error.nationality || !!countryError}
          errorMessage={error.nationality?.message ?? countryError}
          scrollRef={scrollerRef}
          selectionMode="single"
          onOpenChange={setIsOpen}
          color="warning"
          label="Nationality"
          labelPlacement="outside"
          className="mb-5"
          classNames={{
            trigger: "h-14",
          }}
          variant="bordered"
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <Avatar
                  alt={item.textValue}
                  className="flex-shrink-0"
                  size="sm"
                  src={`https://flagcdn.com/${item.key}.svg`}
                />
                <span>{item.textValue}</span>
              </div>
            ));
          }}
        >
          {(country) => (
            <SelectItem
              key={country.key}
              startContent={
                <Avatar
                  alt={country.value}
                  className="h-6 w-6"
                  src={`https://flagcdn.com/${country.key}.svg`}
                />
              }
            >
              {country.value}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export default NationalitySelect;
