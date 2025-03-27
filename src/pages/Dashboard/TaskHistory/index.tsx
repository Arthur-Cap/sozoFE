import React from "react";
import "./TaskHistory.css";
import { CircleChevronRight } from "lucide-react";
import TaskItem from "./component/TaskItem";
import { useTasks } from "../../../hooks/useTaskGenerate";

const TaskHistory: React.FC = () => {
  const { data: tasks, isLoading, isError } = useTasks(0,5);

  const handleItemClick = (taskId: number) => {
    console.log(`Navigate to task ${taskId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load tasks</div>;

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
      <div className="history-list py-[10px] flex flex-col h-full w-full gap-[10px]">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <TaskItem
              key={task.taskId}
              title={task.taskName || "No Title"}
              date={new Date().toLocaleDateString()}
              image={task.displayImg || "assets/temptTask.jpg"}
              onClick={() => handleItemClick(task.taskId)}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskHistory;
