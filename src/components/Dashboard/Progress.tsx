import React from "react";

interface ProgressProps {
  value: number; // giá trị từ 0 đến 100
  label?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, label }) => {
  return (
    <div>
      {label && <div className="text-sm mb-1">{label}</div>}
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
