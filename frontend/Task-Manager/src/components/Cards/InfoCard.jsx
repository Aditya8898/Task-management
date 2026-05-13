import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm shadow-gray-100/60 px-5 py-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100/80 transition-shadow duration-200">
            <div className={`w-2.5 h-2.5 rounded-full ${color} shrink-0 ring-4 ring-gray-50/60`} />
            <div className="flex flex-col gap-0.5">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
            </div>
        </div>
    )
}

export default InfoCard;