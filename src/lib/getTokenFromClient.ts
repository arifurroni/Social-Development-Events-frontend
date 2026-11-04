import { toast } from "sonner";
import { authClient } from "./auth-client";

export const getTokenFromClient = async (): Promise<string | undefined> => {
  try {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      toast.error("Please log in first.");
      return undefined;
    }

    const token = data?.token;
    return token;
  } catch (error) {
    console.error("Failed to retrieve authentication token:", error);
    toast.error("Unable to retrieve authentication token.");
    return undefined;
  }
};





// import { toast } from "sonner";
// import { authClient } from "./auth-client";

// export const getTokenFromClient = async () => {
//     const { data, error } = await authClient.token();
    
//         if (error || !data?.token) {
//           toast.error("Please log in first.");
//           return;
//         }

//         const token = data?.token;
//         return token;
// }