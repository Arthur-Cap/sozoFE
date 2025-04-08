import React from "react";
import "./DashboardOption.css";
import DashedCircle from "../../../components/DashedCircle";
import { AsteriskIcon } from "lucide-react";
import { useTopBar } from "../../../contexts/TopBarContext";

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
  const { theme } = useTopBar();

  const backgroundStyle =
    theme === "dark"
      ? {
          backgroundColor: "transparent",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
        }
      : theme === "white"
      ? {
          backgroundColor: "transparent",
          color: "#000",
        }
      : theme === "forest"
      ? {
          backgroundColor: "rgba(34, 49, 35, 0.7)",
          color: "#e0f2e9",
          backdropFilter: "blur(6px)",
        }
      : theme === "glass"
      ? {
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "#fff",
        }
      : {
          backgroundColor: "#ffffff",
          color: "#000",
        };

  const shouldUseBgImage = !["glass", "forest", "white", "dark"].includes(theme);
  const dashedColor = ["dark", "forest", "glass"].includes(theme) ? "#ffffff" : "#312a2a85";

  return (
    <div
      onClick={onClick}
      className="new-3d-card items-center cursor-pointer flex gap-4 sm:items-start min-h-[142px] md:items-center lg:items-start relative font-bold text-md rounded-lg h-full shadow-[0_0_20px_rgba(0,0,0,0.2)] flex-col p-3 lg:p-[21px]"
      style={{
        ...backgroundStyle,
        ...(shouldUseBgImage && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "375px auto",
          backgroundPosition,
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      <span className="hidden sm:flex font-light lg:flex text-xs items-center md:hidden relative left-[-4px] text-inherit">
        <AsteriskIcon size={12} /> Core
      </span>

      <h1 className="text-inherit text-sm text-[0.6rem] sm:text-[1rem] lg:w-[60%] md:text-[0.8rem]">
        {title}
      </h1>

      <span className="w-[60%] hidden sm:inline text-xs font-light md:hidden xl:inline text-inherit">
        {description}
      </span>

      {showScanner && (
        <div className="sm:absolute lg:absolute md:static right-[28px] bottom-[25px]">
          <div className="relative flex justify-center items-center">
            <DashedCircle
              width={70}
              height={70}
              color={dashedColor}
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
