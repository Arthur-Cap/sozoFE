import React from "react";
import "./button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
  title: string;
  color: string;
  iconName?: string;
  height: string;
  width: string;
  backgroundColor: string;
  borderRadius: number;
  fontSize?: string;
  fontWeight?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title = "Button",
  color = "white",
  iconName = "pen",
  height = "50%",
  width = "50px",
  backgroundColor = "",
  borderRadius,
  fontSize = "16px",
  fontWeight = "normal",
  onClick,
}) => {
  const icon = iconName === "pen" ? faPen : undefined;

  return (
    <button
      className="button-component"
      style={{
        color: `${color}`,
        height: `${height}`,
        width: `${width}`,
        backgroundColor: `${backgroundColor}`,
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}`,
        fontWeight: `${fontWeight}`,
      }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {title}
    </button>
  );
};

export default Button;
