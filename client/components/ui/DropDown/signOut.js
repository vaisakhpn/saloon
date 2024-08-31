import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "@/redux/user/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export const signOut = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
        {},
        { withCredentials: true }
      );
      dispatch(signOutSuccess());
      router.push("/");
    } catch (error) {
      dispatch(
        signOutFailure(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        )
      );
    }
  };

  return handleSignOut;
};
