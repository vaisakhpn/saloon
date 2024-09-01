"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomInput from "../CustomInput";
import schema from "./constant";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Button/Button";
import { profile } from "./profile";

const ProfileForm = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const formSchema = schema();
  const { onSubmit } = profile();

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onBlur",
  });

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
          className="flex flex-col gap-5  "
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {currentUser && currentUser.avatar && (
            <Image
              width={100}
              height={100}
              className="rounded-full cursor-pointer self-center mt-2"
              src={currentUser.avatar}
              alt="profile"
            />
          )}
          <CustomInput
            type="text"
            placeholder="username"
            name="username"
            width="w-full"
            className="border p-3 rounded-lg"
          />
          <CustomInput
            type="email"
            placeholder="email"
            width="w-full"
            name="email"
            className="border p-3 rounded-lg"
          />
          <CustomInput
            type="password"
            placeholder="password"
            name="password"
            width="w-full"
            className="border p-3 rounded-lg"
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
