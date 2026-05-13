import React, { useState } from "react";
import { LuUser } from "react-icons/lu";

const UserCard = ({ userInfo }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="user-card p-4">
            <div className="flex items-center gap-4">
                {userInfo?.profileImageUrl && !imgError ? (
                    <img src={userInfo.profileImageUrl} alt="Avatar"
                        onError={() => setImgError(true)}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover shrink-0" />
                ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                        <LuUser className="text-xl text-primary" />
                    </div>
                )}
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{userInfo?.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{userInfo?.email}</p>
                </div>
            </div>

            <div className="flex items-end gap-3 mt-5">
                <StarCard
                    label="Pending"
                    count={userInfo?.pendingTasks || 0}
                    status="Pending"
                />

                <StarCard
                    label="In Progress"
                    count={userInfo?.inProgressTasks || 0}
                    status="In Progress"
                />

                <StarCard
                    label="Completed"
                    count={userInfo?.completedTasks || 0}
                    status="Completed"
                />

            </div>
        </div>


    );
};

export default UserCard;

const StarCard = ({ label, count, status }) => {

    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-gray-50";

            case "Completed":
                return "text-indigo-500 bg-gray-50";

            default:
                return "text-violet-500 bg-gray-50"
        }
    };

    return (
        <div
            className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
            <span className="text-[12px] font-semibold">{count}</span> <br /> {label}

        </div>
    )

};
