import React from "react";
import "./TaskHistory.css";
import { CircleChevronRight, ChevronRight } from "lucide-react";
const TaskHistory: React.FC = () => {
  return (
    <div
      className="task-history flex items-start font-bold text-md rounded-lg h-full 
    bg-white shadow-sm 
    flex-col justify-start p-[21px]"
    >
      <div className="flex w-full border-b border-[#4242422e] p-1 justify-between items-center">
        <div className="text-black/80">History</div>
        <CircleChevronRight className="w-4 text-black/60" />
      </div>
      <div className="history-list py-[10px] flex flex-col h-full w-full gap-[10px] ">
        <div className="flex justify-between items-center">
          <div className="task-img-preview w-[40px] aspect-square bg-gray-300 rounded-full"></div>
          <div className="flex items-center flex-1 pl-[10px]">
            <div className="task-item flex flex-col ">
              <p className="text-[9px] md:text-[11px] lg:text-[12px]">
                Mini car
              </p>
              <div>
                <p className="text-[8px] md:text-[10px] lg:text-[11px] font-normal text-black/60">
                  02/02/2025
                </p>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 text-black/80"/>
        </div>

        <div className="flex justify-between items-center">
          <div className="task-img-preview w-[40px] aspect-square bg-gray-300 rounded-full"></div>
          <div className="flex items-center flex-1 pl-[10px]">
            <div className="task-item flex flex-col ">
              <p className="text-[9px] md:text-[11px] lg:text-[12px] text-black/80">
                Mini car
              </p>
              <div>
                <p className="text-[8px] md:text-[10px] lg:text-[11px] font-normal text-black/60">
                  02/02/2025
                </p>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 text-black/80"/>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;
