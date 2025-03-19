import React from "react";
import "./WorkingTask.css";
import { Images, ClockArrowUp } from "lucide-react";
const WorkingTask: React.FC = () => {
  return (
    <div className="working-task relative min-h-[174px] text-white flex items-center justify-between p-[3%] overflow-hidden rounded-lg h-full bg-white shadow-md">
      <div className="left-side h-full flex flex-col justify-start gap-[5px] align-start ">
        {/* <div className="background w-full z-[-1] h-full absolute bg-black/70"> </div> */}
        {/* 
        <p className="font-[Outfit] p-0 m-0 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          CURRENT TASK
        </p> */}
        <div className="left-label flex gap-1 md:gap-3">
          <div className="image-number rounded-md bg-white px-1 md:px-3 h-7 md:h-9 flex gap-1 md:gap-2 justify-center items-center text-black">
            <Images className="w-3 h-3 md:w-5 md:h-5" />
            <p className="text-xs md:text-sm">45</p>
          </div>
          <div className="duration rounded-md bg-white px-1 md:px-3 h-7 md:h-9 flex gap-1 md:gap-2 justify-center items-center text-black">
            <ClockArrowUp className="w-3 h-3 md:w-5 md:h-5" />
            <p className="text-xs md:text-sm">0h 3m 54s</p>
          </div>
        </div>
        <div className="info mt-[7px] md:mt-[15px] lg:mt-[15px]">
          <div className="create-info flex flex-col">
            <p className="text-[9px] md:text-[11px] lg:text-[12px] font-bold">
              From
            </p>
            <div>
              <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
                arthur_cap
              </p>
              <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
                12:55:60 20/2/2025
              </p>
            </div>
          </div>
        </div>

        <div className="info mt-[3px] md:mt-[7px] lg:mt-[10px]">
          <div className="create-info flex flex-col">
            <p className="text-[9px] md:text-[11px] lg:text-[12px] font-bold">
              Background remove
            </p>
            <div>
              <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
                Active
              </p>
            </div>
          </div>
        </div>

        {/* <span className="current-step">{"<Removing background>"}</span> */}
      </div>
      <div className="right-side h-full"></div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="barcode-wrapper">
          <div className="barcode">
            {Array.from({ length: 130 }).map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTask;
