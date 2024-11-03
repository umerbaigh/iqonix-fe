"use client";
import { useState } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import Image from "next/image";

const MobileNav = ({ navLinks, getStarted }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="cursor-pointer" onClick={toggleMenu}>
        {/* <OpenNav /> */}
      </div>
      {open && <div className="fixed inset-0 bg-black opacity-60"></div>}
      {/* <Drawer
        placement="right"
        open={open}
        onClose={toggleMenu}
        overlay={false}
        className="p-4 w-[275px] bg-white overflow-y-scroll"
      >
        <div className="mb-2 flex items-center justify-end">
          <IconButton variant="text" aria-label="close" onClick={toggleMenu}>
            <CloseNav />
          </IconButton>
        </div>
        <div>
          <div className="flex justify-center">
            <Image src="/assets/logo.svg" alt="logo" width={80} height={80} />
          </div>
          <div className="pt-8 pb-4">
            <NavbarLinks navLinks={navLinks} />
          </div>
          <NavButtons getStarted={getStarted} />
          <div className="mt-4 mb-6">
            <LangSelect />
          </div>
        </div>
      </Drawer> */}
    </div>
  );
};

export default MobileNav;
