import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import WorkingTask from "./WorkingTask";
import TaskHistory from "./TaskHistory";
import DashboardOption from "./DashboardOption";
import { useTopBar } from "../../contexts/TopBarContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTopBar();

  const shouldShowImageBg = theme === "glass";

  return (
    <div className={`dashboard-wrapper flex items-center overflow-hidden ${shouldShowImageBg ? "with-bg" : `theme-${theme}`}`}>
      <div className="dashboard justify-center w-full items-center pt-[50px]">
        <WorkingTask />
        <TaskHistory />
        <DashboardOption
          onClick={() => navigate("/camera")}
          title="Generate new 3D model"
          description="Create new 3D model with new record video or upload"
          backgroundImage="/assets/new3d.png"
          showScanner={true}
        />
        <DashboardOption
          onClick={() => navigate("/camera")}
          title="Tutorial"
          description="Get through the tutorial to make sure you will get the best result"
          backgroundImage="/assets/tutorialOption.png"
          backgroundPosition="left top"
        />
        <DashboardOption
          onClick={() => navigate("/camera")}
          title="Contract Us"
          description="Reach our help team for any questions or issues"
          backgroundImage="/assets/contractOption.png"
          backgroundPosition="left top"
        />
        <DashboardOption
          onClick={() => navigate("/camera")}
          title="Subscription"
          description="See your current subscription and whats included"
          backgroundImage="/assets/subscriptionOption.png"
          backgroundPosition="top left"
        />
      </div>
    </div>
  );
};

export default Dashboard;
