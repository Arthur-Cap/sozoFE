import React, { useEffect, useRef, useState } from "react";
import { useTasks } from "../../hooks/useTaskGenerate";
import TaskCard from "./TaskCard";

const TaskListPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const limit = 5;
  const { data, isLoading, isError, isFetching } = useTasks(page, limit);
  const [tasks, setTasks] = useState<any[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTasks((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (!bottomRef.current) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.current.observe(bottomRef.current);
  }, [isFetching]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10 bg-gradient-to-br from-[#eef2f7] to-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Your Tasks</h1>
            <p className="text-sm text-gray-500">Latest generated 3D models</p>
          </div>
          <span className="text-sm text-gray-400">{tasks.length} Tasks</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {tasks.map((task) => (
          <TaskCard key={task.taskId} {...task} />
        ))}
        {isLoading && <p className="text-gray-500 text-center">Loading...</p>}
        {isError && (
          <p className="text-red-500 text-center">Failed to load tasks</p>
        )}
        {isFetching && (
          <p className="text-gray-400 text-center">Fetching more...</p>
        )}
        <div ref={bottomRef} className="h-10" />
      </div>
    </div>
  );
};

export default TaskListPage;
