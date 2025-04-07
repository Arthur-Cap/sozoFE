import React, { useEffect, useState } from "react";
import "./WorkingTask.css";
import { Images, ClockArrowUp } from "lucide-react";
import useWebSocket from "../../../connection/socket/useWebSocket";

export interface Task {
  createdAt: number;
  updatedAt: number;
  id: number;
  userName: string;
  taskName: string;
  taskStatus: string;
  message: string;
  processTime: number;
  objectFocus: boolean;
  resourceLink: string;
  displayImg: string;
  resultLink: string | null;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const WorkingTask: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const token = localStorage.getItem("authToken");
  const socketUrl = token ? `wss://sozo3d.pro.vn/ws/task?token=${token}` : "";

  const { lastMessage } = useWebSocket(socketUrl, undefined, { autoReconnect: true, reconnectInterval: 3000 });

  useEffect(() => {
    if (lastMessage) {
      try {
        const data: Task = JSON.parse(lastMessage.data);
        console.log("Received WebSocket data:", data);
        setTask(data);
        setElapsedTime(Math.floor((Date.now() - data.createdAt) / 1000));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!task) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [task]);

  return (
    <div
      className="working-task relative min-h-[266px] border-white border-2 text-white flex items-center justify-between p-[3%] overflow-hidden rounded-lg h-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${task?.displayImg})`,
      }}
    >
      <div className="left-side h-full w-[70%] flex flex-col justify-start gap-[5px] align-start">
        <div className="left-label flex gap-1 md:gap-3">
          <div className="image-number rounded-md bg-white px-1 md:px-3 h-7 md:h-9 flex gap-1 md:gap-2 justify-center items-center text-black">
            <Images className="w-3 h-3 md:w-5 md:h-5" />
            <p className="text-xs md:text-sm">{task ? "1" : "0"}</p>
          </div>
          <div className="duration rounded-md bg-white px-1 md:px-3 h-7 md:h-9 flex gap-1 md:gap-2 justify-center items-center text-black">
            <ClockArrowUp className="w-3 h-3 md:w-5 md:h-5" />
            <p className="text-xs md:text-sm">
              {task ? formatTime(elapsedTime) : "0h 0m 0s"}
            </p>
          </div>
        </div>

        <div className="info mt-[7px] md:mt-[15px] lg:mt-[15px]">
          <div className="create-info flex flex-col">
            <p className="text-[9px] md:text-[11px] lg:text-[12px] font-bold">From</p>
            <div>
              <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
                {task?.userName || ""}
              </p>
              <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
                {task ? new Date(task.createdAt).toLocaleString() : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="info mt-[3px] md:mt-[7px] lg:mt-[10px]">
          <div className="create-info flex max-w-[300px] flex-col">
            <p className="text-lg md:text-xl lg:text-2xl font-bold px-[8%] relative left-[-8%] py-2 bg-green-100/50 text-white overflow-hidden relative">
              <span className="relative z-10">{task?.taskName || "??"}</span>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,_rgba(255,255,255,0.3)_0,_rgba(255,255,255,0.3)_1px,_transparent_1px,_transparent_4px)] opacity-40" />
              <div className="absolute top-0 right-0 w-[3px] h-full bg-green-400 shadow-[5px_0_25px_8px_rgba(34,197,94,0.6)] z-10" />
            </p>
          </div>

          <div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
              {task?.taskStatus || ""}
            </p>
          </div>
          <div>
            <p className="text-[8px] md:text-[10px] lg:text-[11px] text-white/70">
              {task?.message || ""}
            </p>
          </div>
        </div>
      </div>

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
