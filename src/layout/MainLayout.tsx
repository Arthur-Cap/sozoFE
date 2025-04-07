import { Outlet } from "react-router-dom";
import TopBar from "../pages/Dashboard/TopBar";
import { TopBarProvider, useTopBar } from "../contexts/TopBarContext";
import { useEffect } from "react";

const MainLayout = () => {
   
  return (
    <TopBarProvider>
      <div>
        <TopBar></TopBar>
        <main>
          <Outlet />
        </main>
      </div>
    </TopBarProvider>
  );
};

export default MainLayout;
