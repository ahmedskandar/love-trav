export const apiKey = import.meta.env.VITE_SUPABASE_API_KEY as string;

export const COLUMNS = [
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
