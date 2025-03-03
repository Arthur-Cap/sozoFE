import React from "react";
import "./Dashboard.css";
import WorkingTask from "./WorkingTask";
import TaskHistory from "./TaskHistory";
import New3D from "./New3D";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard justify-center w-screen items-center h-screen bg-gray-200">
      <WorkingTask></WorkingTask>
      <TaskHistory/>
      <New3D></New3D>
      <div className="guide flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-md">Tutorial</div>
      <div className="service-info flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-md">Contact</div>
      <div className="get-help flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-md">Subscription</div>
    </div>
  );
};

export default Dashboard;
