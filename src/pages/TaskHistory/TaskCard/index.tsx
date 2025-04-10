import React from "react";
import { Heart } from "lucide-react";

interface TaskCardProps {
  taskId: number;
  taskName: string;
  taskStatus: string;
  processStartTime: number;
  processFinishTime: number;
  displayImg: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  taskId,
  taskName,
  taskStatus,
  processStartTime,
  processFinishTime,
  displayImg,
}) => {
  return (
    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-md transition-all hover:shadow-xl border border-gray-200 bg-white max-w-5xl w-full">
      <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={displayImg}
          alt={taskName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="md:w-1/2 p-6 relative bg-white">
        <div className="absolute top-4 right-4">
          <Heart className="text-red-500 fill-red-500" />
        </div>

        <p className="text-sm text-gray-400 mb-1">Task #{taskId}</p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{taskName}</h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Status: <span className="font-medium text-gray-800">{taskStatus}</span>
        </p>

        <div className="text-sm text-gray-500 mb-6 space-y-1">
          <p>Start: {new Date(processStartTime).toLocaleString()}</p>
          <p>Finish: {new Date(processFinishTime).toLocaleString()}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">${(taskId * 3.45 + 50).toFixed(2)}</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all">
            VIEW TASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
