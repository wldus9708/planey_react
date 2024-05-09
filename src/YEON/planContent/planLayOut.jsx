import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom"; // 추가된 import 문

import SidebarItem from "./planSidebar";

function Sidebar() {
  const pathName = useLocation().pathname;

  const menus = [
    { name: "날짜 확인", path: "/planDay" },
    { name: "명소 확인", path: "/planAttraction" },
    { name: "숙소 확인", path: "/planlodging" }
  ];

  return (
    <div className="sidebar">
      <Routes> {/* 여기에 Routes 요소 추가 */}
        <Route path="/planMain"> {/* 이 부분을 추가 */}
          {menus.map((menu, index) => {
            return (
              <Link to={menu.path} key={index}>
                <SidebarItem
                  menu={menu}
                  isActive={pathName === menu.path ? true : false}
                />
              </Link>
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default Sidebar;