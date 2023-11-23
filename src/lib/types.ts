export type User = {
  id: number;
  created_at: string;
  username: string;
  password: string;
  nationality: string;
  notes: string;
  image: string;
  email: string;
  name: string;
  status: "Online" | "Offline";
};

export enum UserKeys {
  STATUS = "status",
  NAME = "name",
}

export type UsePaginatedItemsProps<T> = {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  rowsPerPage: number;
};

export type Country = Record<string, string>;

export type FormPrompt = {
  to: "login" | "signup";
};
