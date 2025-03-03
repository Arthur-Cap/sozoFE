import React from "react";
import "./New3D.css";
import { CircleChevronRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const New3D: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
    onClick={() => navigate("/camera")} 
      className="new-3d icon cursor-pointer flex items-center relative ov font-bold text-md rounded-lg h-full 
    bg-white via-[#dbeafe] to-white shadow-md 
    flex-col justify-center p-[21px]"
    >
      <div className="icon aspect-square bg-gray-300 flex items-center justify-center">
    </div>
     
    </div>
  );
};

export default New3D;
