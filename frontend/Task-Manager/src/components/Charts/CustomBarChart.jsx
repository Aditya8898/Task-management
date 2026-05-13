import React, { useRef, useState, useEffect } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const CustomBarChart = ({ data }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width } = entry.contentRect;
                setDimensions({ width, height: 300 });
            }
        });

        observer.observe(el);
        const { width } = el.getBoundingClientRect();
        if (width > 0) setDimensions({ width, height: 300 });

        return () => observer.disconnect();
    }, []);

    const validData = data && data.length > 0 ? data : [];

    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'Low':
                return '#00BC7D'
            case 'Medium':
                return '#FE9900'
            case 'High':
                return '#FF1F57'
            default:
                return '#00BC7D'
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.priority}</p>
                    <p className="text-sm text-gray-600">
                        count:{" "}
                        <span className="text-sm font-medium text-gray-900">{payload[0].payload.count}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div ref={containerRef} style={{ width: "100%", height: 300, marginTop: "1.5rem" }}>
            <BarChart width={dimensions.width} height={dimensions.height} data={validData}>
                <CartesianGrid stroke="none" />

                <XAxis
                    dataKey="priority"
                    tick={{ fontSize: 12, fill: "#555" }}
                    stroke="none"
                />

                <YAxis tick={{ fontSize: 12, fill: "#555" }}
                    stroke="none" />

                <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />

                <Bar
                    dataKey="count"
                    nameKey="priority"
                    fill="#FF8042"
                    radius={[10, 10, 0, 0]}
                    activeDot={{ r: 8, fill: "yellow" }}
                    activeStyle={{ fill: "green" }}>
                    {validData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(entry)}
                        />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
};

export default CustomBarChart;
