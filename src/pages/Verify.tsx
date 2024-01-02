import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { params } from "../lib/constants";
import { createClient } from "../lib/utils";
import { supabase } from "../services/supabase";

//After user has clicked on the verify email link sent
const Verify = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true); //Rerender to get access to the parameters required for extraction otherwise null

    const accessToken = params.access_token;
    const errorDescription = params.error_description?.replace(/\+/g, " ");

    const showToast = async (
      message: string,
      destination: "success" | "error",
    ) => {
      toast[destination](message);
      if (destination === "success") {
        const clientData = (await createClient())!; //If createClient throws an error, code execution will stop and the error will be propagated to react query

        //Add the client details record in its table
        if (!clientData) return;
        const { error } = await supabase
          .from("clients")
          .insert([clientData.data]);//Create custom hook for this

        if (error)
          throw new Error("Error adding client record: " + error.message);

          //Update user meta data to add the client slug
        const { error: updateError } = await supabase.auth.updateUser({
          data: { clientChatSlug: clientData.data.slug },
        });

        if (updateError)
          throw new Error(
            "Error creating a chat client: " + updateError.message,
          );
      }
      setTimeout(
        //Timer is set to give a chance for the toast to display before navigating
        () => navigate(destination === "success" ? "/login/" : "/"),
        1,
      );
    };

    // const addClient = async () => {
    // const clientData = (await createClient())!; //If createClient throws an error, code execution will stop and the error will be propagated to react query

    // //Add the client details record in its table
    // const { error } = await supabase
    //   .from("clients")
    //   .insert([clientData.data]);

    // if (error)
    //   throw new Error("Error adding client record: " + error.message);

    // //Update user meta data to add the client slug
    // const { error: updateError } = await supabase.auth.updateUser({
    //   data: { clientChatSlug: clientData.data.slug },
    // });

    // if (updateError)
    //   throw new Error("Error creating a chat client: " + updateError.message);
    // };

    if (accessToken) {
      void showToast("You have successfully verified your email", "success");
      // void addClient();
    } else if (errorDescription) void showToast(errorDescription, "error");
    else void showToast("No access token, redirected", "error");
  }, [navigate, render]);

  return null;
};

export default Verify;

//After user has clicked on the verify email link sent
// const Verify = () => {
//   const [render, setRender] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     setRender(true); //To give the toast message a chance to be displayed
//     const params = window.location.hash
//       .substr(1)
//       .split("&")
//       .reduce((acc: Record<string, string>, pair) => {
//         const [key, value] = pair.split("=");
//         acc[key] = decodeURIComponent(value);
//         return acc;
//       }, {});

//     const accessToken = params.access_token;
//     const errorDesciption = params.error_description?.replace(/\+/g, " ");
//     if (accessToken) {
//       toast.success("You have successfully verified your email");
//       setTimeout(() => {
//         navigate("/app/travels", { replace: true });
//       }, 1);
//     } else if (errorDesciption) {
//       toast.error(errorDesciption);
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1);
//     } else {
//       toast.error("No access token, redirected");
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1);
//     }
//   }, [render, navigate]);
//   return null;
// };

// export default Verify;
