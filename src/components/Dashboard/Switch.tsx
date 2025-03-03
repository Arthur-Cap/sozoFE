import React from "react";

interface SwitchProps {
  label?: string;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Switch: React.FC<SwitchProps> = ({ label, defaultChecked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="form-switch h-4 w-8"
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Switch;
