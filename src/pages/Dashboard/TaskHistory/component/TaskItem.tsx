import React from "react";
import { ChevronRight } from "lucide-react";

interface TaskItemProps {
  title: string;
  date: string;
  image: string;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, date, image, onClick }) => {
  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-300">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>

      <div className="flex items-center flex-1 pl-[10px]">
        <div className="task-item flex flex-col">
          <p className="text-[9px] md:text-[11px] lg:text-[12px] text-black/80">
            {title}
          </p>
          <div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] font-normal text-black/60">
              {date}
            </p>
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 text-black/80" />
    </div>
  );
};

export default TaskItem;
