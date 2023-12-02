import { useMutation } from "@tanstack/react-query";
import { update as updateAPI} from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUpdate = () => {
  const navigate = useNavigate();
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateAPI,
    onSuccess: () => {
      toast.success(
        "Password successfully updated! Be sure to not forget it next time :)",
      );
      navigate("/app/travels", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { update, isPending };
};
