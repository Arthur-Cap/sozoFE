import { Outlet } from "react-router-dom";
import TopBar from "../pages/Dashboard/TopBar";
import { TopBarProvider, useTopBar } from "../contexts/TopBarContext";

const MainLayout = () => {
   
  return (
    <TopBarProvider>
      <div className="h-full">
        <TopBar></TopBar>
        <main className="h-full">
          <Outlet />
        </main>
      </div>
    </TopBarProvider>
  );
};

export default MainLayout;
