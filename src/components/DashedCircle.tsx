import React from "react";

interface DashedCircleProps {
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
  dashArray: number;
  dashOffset?: number;
  className?: string;
}

const DashedCircle: React.FC<DashedCircleProps> = ({
  width,
  height,
  color,
  strokeWidth,
  dashArray,
  dashOffset = 0,
  className = "",
}) => {
  const radius = Math.min(width, height) / 2 - strokeWidth / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};

export default DashedCircle;
