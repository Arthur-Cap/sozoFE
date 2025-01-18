import React, { useState } from "react";
import "./textInput.css";

interface TextInputProps {
  title: string;
  typeInput: "text" | "password" | "number";
  iconName?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  width: string;
  backgroundColor: string;
  borderRadius: number;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  typeInput,
  iconName = "pen",
  setState,
  height = "50%",
  width = "50px",
  backgroundColor = "",
  borderRadius
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setState(newValue);
  };

  return (
    <div
      className="text-input"
      style={{
        // color: "#00ff38",
        height: `${height}`,
        width: `${width}`,
        backgroundColor: `${backgroundColor}`,
        borderRadius:`${borderRadius}px`,
      }}
    >
      <label>{title}</label>
      <div className="input-wrapper">
        <input
          type={typeInput}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${title.toLowerCase()}`}
        />
        <span className={`icon-${iconName}`}></span>
      </div>
    </div>
  );
};

export default TextInput;
