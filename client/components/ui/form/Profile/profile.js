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
      dispatch(updateUserStart());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update/${currentUser._id}`,
        data,
        { withCredentials: true }
      );
      dispatch(updateUserSuccess(response.data));
      router.push("/");
    } catch (error) {
      dispatch(
        updateUserFailure(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        )
      );
    }
  };

  return { onSubmit };
};
