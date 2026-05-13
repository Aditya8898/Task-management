import React, { useState } from "react";
import { LuUser } from "react-icons/lu";

const AvatarImg = ({ src, className }) => {
    const [error, setError] = useState(false);
    if (error) {
        return (
            <div className={`w-9 h-9 flex items-center justify-center bg-blue-100/50 rounded-full border-2 border-white ${className || ""}`}>
                <LuUser className="text-lg text-primary" />
            </div>
        );
    }
    return <img src={src} alt="Avatar" onError={() => setError(true)} className={className} />;
};

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
    const validAvatars = avatars.filter(Boolean);
    return (
        <div className="flex items-center">
            {validAvatars.slice(0, maxVisible).map((avatar, index) => (
                <AvatarImg key={index} src={avatar} className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover" />
            ))}
            {validAvatars.length === 0 && (
                <div className="w-9 h-9 flex items-center justify-center bg-blue-100/50 rounded-full border-2 border-white">
                    <LuUser className="text-lg text-primary" />
                </div>
            )}
            {validAvatars.length > maxVisible && (
                <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
                    +{validAvatars.length - maxVisible}
                </div>
            )}
        </div>
    )
}

export default AvatarGroup;
