import NavBarDashBoard from "../DashBoardPanel/NavBarDashBoard/NavBarDashBoard";
import { Outlet } from "react-router-dom";
import FooterDashBoard from "../DashBoardPanel/FooterDashBoard/FooterDashBoard";
import NavBarMobile from "../DashBoardPanel/NavBarDashBoard/NavBarMobile";

const DashBoardRoot = () => {
  return (
    <div className="w-full h-full min-h-screen bg-slate-100 text-black p-0 m-0">
      <div className=" lg:hidden w-full h-full  ">
        <NavBarMobile />
      </div>
      <div className="w-full h-full min-h-screen   p-2">
        <div className="flex flex-row w-full h-full min-h-screen  ">
          <div className="w-fit h-full  ">
            <NavBarDashBoard />
          </div>
          <div className="w-full h-full  ">
            <Outlet />
          </div>
        </div>
        <div className="mx-auto">
          <FooterDashBoard />
        </div>
      </div>
    </div>
  );
};

export default DashBoardRoot;
