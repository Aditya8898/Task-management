import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">

            {/* Left Section */}
            <div className="w-full md:w-[55%] h-screen bg-white px-6 sm:px-10 md:px-14 lg:px-16 py-8 flex flex-col justify-between">

                {/* Header */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Task Manager
                    </h1>

                    <p className="text-base md:text-lg text-gray-600 mt-4 max-w-sm leading-relaxed">
                        Streamline your workflow. Collaborate effortlessly.
                        Achieve more together.
                    </p>
                </div>

                {/* Form Center */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div>
                    <p className="text-sm text-gray-500">
                        © 2024 Task Manager. Built for modern teams.
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex w-[45%] h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden px-6 py-6">

                {/* Background Glow */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400/10 rounded-full blur-3xl"></div>

                {/* Main Flow Layout */}
                <div className="relative z-10 w-full flex flex-col items-center justify-between scale-[0.85] lg:scale-[0.92] xl:scale-100 origin-top">

                    {/* Top Card */}
                    <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border-l-4 border-blue-500">

                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>

                                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase">
                                    High Priority
                                </span>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-500">Due</p>
                                <p className="font-bold text-lg text-gray-900">Mar 15</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                            Design Landing Page & Auth Flow
                        </h2>

                        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                            <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                        </div>

                        <p className="text-sm text-gray-600 font-medium">
                            75% Complete
                        </p>

                        <div className="flex -space-x-2 mt-5">
                            {["SJ", "RC", "AK", "+2"].map((item, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-10 rounded-xl bg-blue-500 border-4 border-white flex items-center justify-center text-white font-bold text-sm"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vertical Line */}
                    <div className="w-1 h-14 bg-blue-400 rounded-full"></div>

                    {/* Team Cards */}
                    <div className="w-full grid grid-cols-3 gap-4">

                        {[
                            ["Sarah", "Lead Designer", "SJ", "bg-blue-500"],
                            ["Ryan", "Frontend Dev", "RC", "bg-green-500"],
                            ["Aisha", "Backend Dev", "AK", "bg-purple-500"],
                        ].map(([name, role, initials, color], index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-4 shadow-xl text-center"
                            >
                                <div
                                    className={`w-14 h-14 mx-auto mb-3 rounded-xl ${color} flex items-center justify-center text-white font-bold`}
                                >
                                    {initials}
                                </div>

                                <h3 className="font-bold text-lg text-gray-900">
                                    {name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {role}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Horizontal Line */}
                    <div className="w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>

                    {/* Bottom Card */}
                    <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl">

                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <p className="text-sm text-blue-600 font-semibold uppercase">
                                    Sprint Progress
                                </p>

                                <h3 className="text-2xl font-black text-gray-900">
                                    Week 12/20
                                </h3>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-black text-gray-900">
                                    16
                                </p>

                                <p className="text-gray-500 text-sm">
                                    / 20 Tasks
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-4 border-t">

                            {[
                                ["48h", "Time"],
                                ["4.2", "Score"],
                                ["+12%", "Growth"],
                            ].map(([value, label], index) => (
                                <div key={index} className="text-center">
                                    <p className="text-xl font-bold text-gray-900">
                                        {value}
                                    </p>

                                    <p className="text-xs text-gray-500 uppercase">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;