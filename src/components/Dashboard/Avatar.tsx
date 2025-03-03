import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;
