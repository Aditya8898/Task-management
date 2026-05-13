import React from "react";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className="flex items-center gap-4 bg-white border-b border-gray-100 shadow-sm shadow-gray-100/30 backdrop-blur-[2px] py-3.5 px-6 sticky top-0 z-30">
            <button className="block lg:hidden text-gray-600 hover:text-gray-900 transition-colors" onClick={() => { setOpenSideMenu(!openSideMenu); }}>
                {openSideMenu ? (
                    <HiOutlineX className="text-xl" />
                ) : (
                    <HiOutlineMenu className="text-xl" />
                )}
            </button>

            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Task Manager</h2>

            {openSideMenu && (
                <div className="fixed top-[57px] left-0 z-40 shadow-lg">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}

        </div>
    )
}

export default Navbar;