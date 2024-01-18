import React, { FC } from "react";
import { MainNav } from "./main-nav";

type SidebarProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar: FC<SidebarProps> = ({ isOpened, setIsOpened }) => {
  return (
    <div
      className={`fixed left-0 top-16 -mt-2 bg-white z-[100] shadow-lg border bottom-0 ${
        isOpened ? "hidden md:block w-64" : "w-64"
      }`}
    >
      <MainNav
        className="mx-5 px-1"
        setIsOpened={setIsOpened}
        isOpened={isOpened}
      />
    </div>
  );
};

export default Sidebar;
