import React from "react";
import "./TaskHistory.css";
import { CircleChevronRight } from "lucide-react";
import TaskItem from "./component/TaskItem";
import { useTasks } from "../../../hooks/useTaskGenerate";
import { useNavigate } from 'react-router-dom';
import { useTopBar } from "../../../contexts/TopBarContext";

const TaskHistory: React.FC = () => {
  const { data: tasks, isLoading, isError } = useTasks(0, 5);
  const navigate = useNavigate();
  const { theme } = useTopBar();

  const handleItemClick = (taskId: number) => {
    navigate(`/view-3d/${taskId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load tasks</div>;

  const backgroundStyle = theme === "dark"
    ? { background: "#1e1e1e", color: "#fff" }
    : theme === "white"
    ? {
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }
    : theme === "forest"
    ? {
        background: "rgba(34, 49, 35, 0.6)",
        backdropFilter: "blur(6px)",
        color: "#e0f2e9",
      }
    : theme === "glass"
    ? {
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        color: "#fff",
      }
    : {
        background: "#ffffff",
        color: "#000000",
      };

  return (
    <div
      className="task-history flex items-start font-bold text-md rounded-lg h-full shadow-lg flex-col justify-start p-[21px]"
      style={backgroundStyle}
    >
      <div className="flex w-full border-b border-white/30 p-1 justify-between items-center">
        <div className="text-inherit">History</div>
        <CircleChevronRight className="w-4 text-inherit" />
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
