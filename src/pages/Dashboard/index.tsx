import React from "react";
import "./dashboard.css";
import WorkingTask from "./WorkingTask";
import TaskHistory from "./TaskHistory";
import New3D from "./New3D";
import TopBar from "./TopBar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <TopBar></TopBar>
      <div className="dashboard justify-center w-full items-center h-screen pt-[50px]">
        <WorkingTask></WorkingTask>
        <TaskHistory />
        <New3D></New3D>
        <div className="guide flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-lg">
          Tutorial
        </div>
        <div className="service-info flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-lg">
          Contact
        </div>
        <div className="get-help flex items-center justify-center font-bold text-lg rounded-lg h-full bg-white shadow-lg">
          Subscription
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
