"use client";

import { InputHTMLAttributes, createElement, useState } from "react";
import { Eye, EyeOff, icons } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: keyof typeof icons;
};

const Input = ({ icon, ...props }: InputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="relative mb-4 w-full">
      <input
        {...props}
        className="input-box"
        type={isShowPassword ? "text" : props.type}
      />
      {createElement(icons[icon], {
        className: "input-icon",
        size: 18,
      })}

      {props.type === "password" &&
        (isShowPassword ? (
          <EyeOff
            className="input-icon left-auto right-4 cursor-pointer"
            size={18}
            onClick={handleTogglePassword}
          />
        ) : (
          <Eye
            className="input-icon left-auto right-4 cursor-pointer"
            size={18}
            onClick={handleTogglePassword}
          />
        ))}
    </div>
  );
};

export default Input;
