import React from "react";
import { useFormContext } from "react-hook-form";

const CustomInput = ({ label, placeholder, name, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex flex-col w-full gap-1.5">
      <p className=" text-14 w-full max-w-[280px]  font-medium text-gray-700">
        {label}
      </p>
      <input
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className={`text-16 p-2 w-3/4 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500 shadow-md ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
