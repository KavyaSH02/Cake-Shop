"use client";

import { useState, useMemo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MoneyRecive } from "iconsax-react";

export default function RevenueChart({ data }) {
    const [hoverPos, setHoverPos] = useState(null);

    // Example data (can come from API)
    const chartData =
        data || [
            { label: "Mon", current: 2500, previous: 1800 },
            { label: "Tue", current: 3200, previous: 2600 },
            { label: "Wed", current: 2800, previous: 3000 },
            { label: "Thu", current: 4100, previous: 3500 },
            { label: "Fri", current: 3800, previous: 3400 },
            { label: "Sat", current: 5200, previous: 4200 },
            { label: "Sun", current: 4500, previous: 3900 }
        ];

    const maxRevenue = Math.max(
        ...chartData.flatMap((d) => [d.current, d.previous])
    );
    const minRevenue = Math.min(
        ...chartData.flatMap((d) => [d.current, d.previous])
    );

    const range = maxRevenue - minRevenue || 1;
    const padding = range * 0.2;

    const currentPoints = useMemo(() => {
        return chartData.map((item, i) => {
            const x = 50 + (i / (chartData.length - 1)) * 900;
            const y =
                300 - ((item.current - minRevenue) / (range + padding)) * 250;
            return { x, y, ...item };
        });
    }, [chartData]);

    const previousPoints = useMemo(() => {
        return chartData.map((item, i) => {
            const x = 50 + (i / (chartData.length - 1)) * 900;
            const y =
                300 - ((item.previous - minRevenue) / (range + padding)) * 250;
            return { x, y, ...item };
        });
    }, [chartData]);

    const createPath = (points) => {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const xMid = (points[i].x + points[i + 1].x) / 2;
            const yMid = (points[i].y + points[i + 1].y) / 2;
            d += ` Q ${points[i].x} ${points[i].y}, ${xMid} ${yMid}`;
        }
        d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
        return d;
    };

    const currentPath = createPath(currentPoints);
    const previousPath = createPath(previousPoints);

    // nearest by cursor
    const nearest = hoverPos
        ? currentPoints.reduce((prev, curr) =>
            Math.abs(curr.x - hoverPos.x) < Math.abs(prev.x - hoverPos.x)
                ? curr
                : prev
        )
        : null;

    const index = nearest
        ? currentPoints.findIndex((p) => p.x === nearest.x)
        : null;

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                width: "100%"
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <MoneyRecive size={24} color="#4caf50" variant="Bold" />
                <Typography variant="h6" fontWeight={600}>
                    Revenue Comparison
                </Typography>
            </Box>

            <Box sx={{ position: "relative", height: 250, width: "100%" }}>

                <svg

                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 370"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 1000;
                        const y = ((e.clientY - rect.top) / rect.height) * 370;
                        setHoverPos({ x, y });
                    }}
                    onMouseLeave={() => setHoverPos(null)}
                >
                    {/* Y-axis */}
                    <line x1="50" y1="-40" x2="50" y2="320" stroke="#333" strokeWidth="2" />

                    {/* X-axis */}
                    <line x1="50" y1="320" x2="950" y2="320" stroke="#333" strokeWidth="2" />

                    {/* X-axis labels */}
                    {chartData.map((item, i) => {
                        const x = 50 + (i / (chartData.length - 1)) * 900;
                        return (
                            <text key={i} x={x} y="345" fontSize="14" fill="#666" textAnchor="middle" fontWeight="500">
                                {item.label}
                            </text>
                        );
                    })}

                    {/* Y-axis labels */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const value = minRevenue + (range / 5) * i;
                        const y = 320 - (i * 70);
                        return (
                            <text key={i} x="45" y={y + 5} fontSize="12" fill="#666" textAnchor="end">
                                ₹{(value / 1000).toFixed(1)}k
                            </text>
                        );
                    })}

                    {/* previous */}
                    <path
                        d={previousPath}
                        fill="none"
                        stroke="#ff9800"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* current */}
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* vertical */}
                    {nearest && (
                        <line
                            x1={nearest.x}
                            x2={nearest.x}
                            y1="40"
                            y2="320"
                            stroke="#999"
                            strokeDasharray="4 4"
                        />
                    )}

                    {/* dots */}
                    {currentPoints.map((p, i) => (
                        <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={index === i ? 7 : 5}
                            fill="#fff"
                            stroke="#4caf50"
                            strokeWidth="3"
                        />
                    ))}
                    {previousPoints.map((p, i) => (
                        <circle
                            key={"p" + i}
                            cx={p.x}
                            cy={p.y}
                            r={index === i ? 7 : 5}
                            fill="#fff"
                            stroke="#ff9800"
                            strokeWidth="3"
                        />
                    ))}
                </svg>

                {/* Tooltip */}
                {nearest && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: `${(nearest.x / 1000) * 100}%`,
                            top: `10%`,
                            transform: "translateX(-50%)",
                            background: "#fff",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            fontSize: 12,
                            fontWeight: 600,
                            boxShadow: 3
                        }}
                    >
                        <div>{chartData[index].label}</div>
                        <div style={{ color: "#4caf50" }}>
                            ₹{chartData[index].current.toLocaleString()}
                        </div>
                        <div style={{ color: "#ff9800" }}>
                            ₹{chartData[index].previous.toLocaleString()}
                        </div>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}
