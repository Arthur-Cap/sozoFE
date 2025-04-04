import React from "react";
import "./DashboardOption.css";
import DashedCircle from "../../../components/DashedCircle";
import { AsteriskIcon } from "lucide-react";

interface DashboardOptionProps {
  onClick: () => void;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundPosition?: string;
  showScanner?: boolean; 
}

const DashboardOption: React.FC<DashboardOptionProps> = ({
  onClick,
  title,
  description,
  backgroundImage,
  backgroundPosition = "bottom right",
  showScanner = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="new-3d-card items-center cursor-pointer flex gap-4 sm:items-start min-h-[142px] md:items-center lg:items-start relative font-bold text-md rounded-lg h-full 
      bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] 
      flex-col p-3 lg:p-[21px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "375px auto",
        backgroundPosition,
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className="text-gray-600 hidden sm:flex font-light lg:flex text-xs items-center md:hidden relative left-[-4px]">
        <AsteriskIcon /> Core
      </span>
      <h1 className="text-gray-800 text-sm text-[0.6rem] sm:text-[1rem] lg:w-[60%] md:text-[0.8rem]">
        {title}
      </h1>
      <span className="w-[60%] hidden sm:inline text-xs font-light  md:hidden xl:inline text-gray-600">
        {description}
      </span>

      {showScanner && ( 
        <div className="sm:absolute lg:absolute md:static right-[28px] bottom-[25px]">
          <div className="relative flex justify-center items-center">
            <DashedCircle
              width={70}
              height={70}
              color="#312a2a85"
              strokeWidth={3.5}
              dashArray={1.9}
              dashOffset={0}
              className="rotating-circle"
            />
            <img
              className="absolute w-[30px]"
              src="/assets/scanning.png"
              alt="Sample GIF"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOption;
