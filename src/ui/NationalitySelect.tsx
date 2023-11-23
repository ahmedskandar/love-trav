import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Country } from "../lib/types";

const NationalitySelect = () => {
  const fetchCountries = async () => {
    const res = await fetch("https://flagcdn.com/en/codes.json");
    if (!res.ok) throw new Error("Smething wrong happened");
    const data = (await res.json()) as Country;
    if (!data) throw new Error("Country is empty");
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const countryArray = data ? Object.entries(data) : [];
  const sortedCountryArray = countryArray.sort((a, b) =>
    a[1].localeCompare(b[1]),
  );
  return (
    <Select
      isRequired
      isInvalid={!!error?.message}
      isLoading={isLoading}
      errorMessage={error?.message}
      items={sortedCountryArray}
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
          key={country[0]} // Assuming the country key is the first element in the tuple
          startContent={
            <Avatar
              alt={country[1]} // Assuming the country value is the second element in the tuple
              className="h-6 w-6"
              src={`https://flagcdn.com/${country[0]}.svg`}
            />
          }
        >
          {country[1]}
        </SelectItem>
      )}
    </Select>
  );
};

export default NationalitySelect;
