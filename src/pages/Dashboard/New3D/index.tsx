import React from "react";
import "./New3D.css";
import { useNavigate } from "react-router-dom";
import DashedCircle from "../../../components/DashedCircle";
import { AsteriskIcon } from "lucide-react";
const New3D: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/camera")}
      className="new-3d items-center icon cursor-pointer flex gap-4 sm:items-start min-h-[142px] md:items-center lg:items-start relative ov font-bold text-md rounded-lg h-full 
    bg-white via-[#dbeafe] to-white shadow-lg 
    flex-col p-3 lg:p-[21px]"
    >
      <span className="text-white hidden sm:flex font-light lg:flex text-xs items-center md:hidden relative left-[-4px]">
        <AsteriskIcon></AsteriskIcon> Core
      </span>
      <h1 className="text-white text-sm text-[0.6rem] sm:text-[1rem] lg:w-[60%] md:text-[0.8rem] ">Generate new 3D model</h1>
      <span className="w-[60%] hidden sm:inline text-xs font-light  md:hidden xl:inline text-gray-300">Create new 3D model with new record video or upload</span>
      <div className="sm:absolute lg:absolute md:static right-[28px] bottom-[25px]">
        <div className="relative flex justify-center items-center">
          <DashedCircle
            width={70}
            height={70}
            color="white"
            strokeWidth={3.5}
            dashArray={1.9}
            dashOffset={0}
            className="rotating-circle"
          />
          <img
            className="absolute w-[30px]"
            src="src\assets\scanning.png"
            alt="Sample GIF"
          />
        </div>
      </div>
    </div>
  );
};

export default New3D;
