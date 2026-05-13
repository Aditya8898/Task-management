import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);


    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex min-h-[calc(100vh-61px)]">
                    <div className="max-[1000px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="flex-1 px-6 py-6 max-w-[1400px]">
                        {children}
                    </div>

                </div>
            )}
        </div>
    )
}

export default DashboardLayout;
