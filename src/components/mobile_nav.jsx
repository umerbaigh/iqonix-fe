"use client";
import { Drawer, IconButton } from "@material-tailwind/react";
import { CloseNav, OpenNav } from "@/icons";

const MobileNav = ({ open, toggleMenu, children, isFilter = false }) => {
  return (
    <div>
      <div className="cursor-pointer flex gap-1" onClick={toggleMenu}>
        <OpenNav /> {isFilter && "Filter"}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black opacity-60 w-full z-[999px]"></div>
      )}
      <Drawer
        placement="left"
        open={open}
        onClose={toggleMenu}
        overlay={false}
        className="w-[300px] bg-white overflow-y-scroll overflow-x-hidden"
      >
        <div className="mb-2 flex items-center justify-end">
          <IconButton variant="text" aria-label="close" onClick={toggleMenu}>
            <CloseNav />
          </IconButton>
        </div>
        {children}
      </Drawer>
    </div>
  );
};

export default MobileNav;
