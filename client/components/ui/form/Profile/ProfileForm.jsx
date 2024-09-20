"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../CustomInput";
import schema from "./constant";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Button/Button";
import { profile } from "./profile";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateUserSuccess } from "@/redux/user/userSlice";
import { app } from "@/firebase/config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const formSchema = schema();
  const { onSubmit } = profile();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onBlur",
  });

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
          dispatch(updateUserSuccess({ ...formData, avatar: downloadURL }));
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (currentUser) {
      methods.reset({
        username: currentUser.username || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser, methods]);

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit((data) => {
            const updatedData = { ...formData, ...data };
            if (!data.password) {
              delete updatedData.password;
            }
            dispatch(updateUserSuccess(updatedData));
            onSubmit(updatedData);
          })}
        >
          {currentUser && (
            <>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileRef}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Image
                width={100}
                height={100}
                className="rounded-full cursor-pointer self-center mt-2"
                src={formData.avatar || currentUser.avatar}
                alt="profile"
              />
              <p className="text-sm self-center">
                {imageError ? (
                  <span className="text-red-700">
                    Error uploading image (Image must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading ${imagePercent}%`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-600">
                    Image Successfully Uploaded
                  </span>
                ) : (
                  ""
                )}
              </p>
            </>
          )}
          <CustomInput
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            width="w-full"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <CustomInput
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            width="w-full"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <CustomInput
            type="password"
            placeholder="password"
            name="password"
            width="w-full"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center">
            <Button
              label={loading ? "Processing..." : "Update"}
              buttonColor={"Primary"}
              disabled={loading}
            />
          </div>
          <p>{error ? error : ""}</p>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;
