import React from "react";
import { ChevronRight } from "lucide-react";
import { useTopBar } from "../../../../contexts/TopBarContext";

interface TaskItemProps {
  title: string;
  date: string;
  image: string;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, date, image, onClick }) => {
  const { theme } = useTopBar();
  const isLight = theme === "light" || theme === "white";

  const titleClass = isLight ? "text-black" : "text-white";
  const dateClass = isLight ? "text-black/60" : "text-white/70";
  const iconClass = isLight ? "text-black/80" : "text-white/80";

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
          <p className={`text-[11px] ${titleClass}`}>{title}</p>
          <p className={`text-[10px] ${dateClass}`}>{date}</p>
        </div>
      </div>
      <ChevronRight className={`w-4 ${iconClass}`} />
    </div>
  );
};

export default TaskItem;
