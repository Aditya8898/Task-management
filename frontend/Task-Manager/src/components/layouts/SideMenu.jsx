import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { LuUser } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const [imgError, setImgError] = useState(false);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    useEffect(() => {
        if (user) {
            setSideMenuData(user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
            setImgError(false);
        }
        return () => { };
    }, [user]);

    return <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 shadow-sm shadow-gray-100/40 sticky top-[61px] overflow-y-auto">
        <div className="flex flex-col items-center justify-center pt-7 pb-6 px-4 border-b border-gray-50">
            <div className="relative">
                {user?.profileImageUrl && !imgError ? (
                    <img src={user.profileImageUrl} alt="Profile Image"
                        onError={() => setImgError(true)}
                        className="w-[72px] h-[72px] bg-gray-200 rounded-full object-cover ring-4 ring-gray-50 shadow-sm" />
                ) : (
                    <div className="w-[72px] h-[72px] bg-blue-100/50 rounded-full ring-4 ring-gray-50 shadow-sm flex items-center justify-center">
                        <LuUser className="text-4xl text-primary" />
                    </div>
                )}
                {user?.role === "admin" && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-white bg-primary px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                        Admin
                    </span>
                )}
            </div>

            <h5 className="text-gray-900 font-semibold text-[15px] mt-4">{user?.name || ""}</h5>
            <p className="text-[12px] text-gray-400 font-medium">{user?.email || ""}</p>
        </div>

        <nav className="px-3 py-4">
            {sideMenuData.map((item, index) => (
                <button key={`menu_${index}`}
                    className={`w-full flex items-center gap-3.5 text-[14px] font-medium rounded-lg transition-all duration-150 ${activeMenu === item.label
                            ? "text-primary bg-blue-50/70 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"} py-2.5 px-3.5 mb-1 cursor-pointer`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-lg shrink-0" />
                    {item.label}

                </button>
            ))}
        </nav>
    </div>

};

export default SideMenu;