import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/redux/user/userSlice";

export const profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    try {
      console.log("Before update, current user:", currentUser);
      dispatch(updateUserStart());

      const updatedData = { ...currentUser, ...data };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update/${currentUser._id}`,
        updatedData,
        { withCredentials: true }
      );
      dispatch(updateUserSuccess(response.data));
    } catch (error) {
      const currentUserData = error.response?.data?.currentUser || currentUser;
      dispatch(
        updateUserFailure({
          error: error.response?.data?.message || "An error occurred.",
          currentUser: currentUserData,
        })
      );
    }
  };

  return { onSubmit };
};
