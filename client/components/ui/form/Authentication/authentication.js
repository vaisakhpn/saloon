import {
  resetAuthState,
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useAuth = (type) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const check = async (data) => {
    dispatch(signInStart());
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
        data
      );
      return response.data.message === "Available";
    } catch (error) {
      if (error.response && error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        dispatch(signInFailure("An error occurred. Please try again."));
      }
      return false;
    }
  };

  const onSubmit = async (data) => {
    dispatch(signInStart());
    try {
      if (type === "sign-up") {
        if (!data.username || !data.email) {
          dispatch(signInFailure("Please fill in all fields."));
          return;
        }

        const isAvailable = await check({
          username: data.username,
          email: data.email,
        });
        if (!isAvailable) {
          return;
        }
      }

      const url =
        type === "sign-up"
          ? `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
          : `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;

      const payload =
        type === "sign-up"
          ? {
              username: data.username,
              email: data.email,
              password: data.password,
            }
          : {
              email: data.email,
              password: data.password,
            };

      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      if (type === "sign-up") {
        dispatch(resetAuthState());
        router.push("/sign-in");
      } else if (type === "sign-in") {
        dispatch(signInSuccess(response.data));
        dispatch(resetAuthState());
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        dispatch(signInFailure("An error occurred. Please try again."));
      }
      console.error("Error:", error);
    }
  };

  return { onSubmit };
};
