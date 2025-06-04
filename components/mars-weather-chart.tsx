"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

type MarsWeatherEntry = {
	sol: string;
	minTemp: number;
	maxTemp: number;
	avgTemp: number;
	pressure: number;
};

export default function MarsWeatherChart() {
	const [data, setData] = useState<MarsWeatherEntry[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMarsWeather() {
			try {
				const res = await fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0");
				const rawData = await res.json();
				const sols = rawData.sol_keys;

				const formatted: MarsWeatherEntry[] = sols
					.map((sol: string) => ({
						sol,
						minTemp: rawData[sol].AT?.mn ?? null,
						maxTemp: rawData[sol].AT?.mx ?? null,
						avgTemp: rawData[sol].AT?.av ?? null,
						pressure: rawData[sol].PRE?.av ?? null,
					}))
					.filter((entry: any) => entry.minTemp !== null && entry.pressure !== null);

				setData(formatted);
			} catch (error) {
				console.error("Failed to fetch Mars weather", error);
			} finally {
				setLoading(false);
			}
		}

		fetchMarsWeather();
	}, []);

	if (loading) return <div>Loading Mars weather...</div>;

	const option = {
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["Max Temp", "Avg Temp", "Min Temp", "Pressure"],
			textStyle: { color: "#aaa" },
		},
		xAxis: {
			type: "category",
			data: data.map((d) => d.sol),
			axisLabel: { color: "#888" },
			name: "Sol (Mars Day)",
			nameTextStyle: { color: "#aaa" },
		},
		yAxis: [
			{
				type: "value",
				name: "Temperature (°C)",
				position: "left",
				axisLabel: { color: "#888" },
				nameTextStyle: { color: "#aaa" },
			},
			{
				type: "value",
				name: "Pressure (Pa)",
				position: "right",
				min: 700,
				max: 800,
				axisLabel: { color: "#888" },
				nameTextStyle: { color: "#aaa" },
			},
		],
		grid: {
			left: 50,
			right: 50,
			bottom: 50,
			top: 50,
		},
		series: [
			{
				name: "Max Temp",
				type: "line",
				yAxisIndex: 0,
				data: data.map((d) => d.maxTemp),
				smooth: true,
				itemStyle: { color: "#ef4444" },
			},
			{
				name: "Avg Temp",
				type: "line",
				yAxisIndex: 0,
				data: data.map((d) => d.avgTemp),
				smooth: true,
				itemStyle: { color: "#eab308" },
			},
			{
				name: "Min Temp",
				type: "line",
				yAxisIndex: 0,
				data: data.map((d) => d.minTemp),
				smooth: true,
				itemStyle: { color: "#3b82f6" },
			},
			{
				name: "Pressure",
				type: "line",
				yAxisIndex: 1,
				data: data.map((d) => d.pressure),
				smooth: true,
				itemStyle: { color: "#10b981" },
			},
		],
	};

	return (
		<div className="h-96">
			<ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
		</div>
	);
}
