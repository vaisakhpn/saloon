"use client";
import React from "react";
import { AVAILABLE_THEMES, DEFAULT_BUTTON_COLOR } from "./constant";

const Button = ({ label, buttonColor = "primary", disabled, ...restProps }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`disabled:opacity-70 disabled:cursor-not-allowed p-2 text-16 text-white rounded-3xl hover:opacity-80 transition w-4/12 flex items-center justify-center gap-2  ${
        AVAILABLE_THEMES[buttonColor] || DEFAULT_BUTTON_COLOR
      }`}
      {...restProps}
    >
      {label}
    </button>
  );
};

export default Button;
