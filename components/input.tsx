"use client";

import {
  InputHTMLAttributes,
  createElement,
  forwardRef,
  useState,
} from "react";
import { Eye, EyeOff, icons } from "lucide-react";

type InputProps = {
  icon: keyof typeof icons;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...props }, ref) => {
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
  },
);
Input.displayName = "Input";

export default Input;
