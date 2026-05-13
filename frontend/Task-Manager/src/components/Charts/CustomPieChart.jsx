import React, { useRef, useState, useEffect } from "react";

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 325 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width } = entry.contentRect;
                setDimensions({ width, height: 325 });
            }
        });

        observer.observe(el);
        const { width } = el.getBoundingClientRect();
        if (width > 0) setDimensions({ width, height: 325 });

        return () => observer.disconnect();
    }, []);

    const validData = data && data.length > 0 ? data : [];

    return (
        <div ref={containerRef} style={{ width: "100%", height: 325 }}>
            <PieChart width={dimensions.width} height={dimensions.height}>
                <Pie
                    data={validData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    labelLine={false}
                >
                    {validData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </div>
    );
};

export default CustomPieChart;
