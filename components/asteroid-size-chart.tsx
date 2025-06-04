"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LogarithmicScale, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LogarithmicScale, Tooltip, Legend);

const comparisonData = [
	{ name: "Баскетбольний м'яч", diameter: 0.00024, color: "#f97316" },
	{ name: "Автобус", diameter: 0.012, color: "#f59e0b" },
	{ name: "Футбольне поле", diameter: 0.1, color: "#84cc16" },
	{ name: "Емпайр Стейт", diameter: 0.443, color: "#10b981" },
	{ name: "Центральний парк", diameter: 4, color: "#06b6d4" },
	{ name: "Манхеттен", diameter: 21.6, color: "#0ea5e9" },
];

const getColor = (index: number) => {
	const colors = ["#9333ea", "#8b5cf6", "#a78bfa", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"];
	return colors[index % colors.length];
};

export default function AsteroidSizeChart() {
	const [asteroids, setAsteroids] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchAsteroids() {
			setLoading(true);
			try {
				const res = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY");
				const data = await res.json();
				const formatted = data.near_earth_objects.slice(0, 10).map((obj: any, index: number) => ({
					name: obj.name,
					diameter: obj.estimated_diameter.kilometers.estimated_diameter_max,
					color: getColor(index),
				}));
				setAsteroids(formatted);
			} catch (err) {
				console.error("Error fetching data", err);
			} finally {
				setLoading(false);
			}
		}
		fetchAsteroids();
	}, []);

	const combinedData = [...asteroids, ...comparisonData].sort((a, b) => a.diameter - b.diameter);

	const chartData = {
		labels: combinedData.map((d) => d.name),
		datasets: [
			{
				label: "Діаметр (km)",
				data: combinedData.map((d) => d.diameter),
				backgroundColor: combinedData.map((d) => d.color),
				borderRadius: 4,
			},
		],
	};

	const options: ChartOptions<"bar"> = {
		indexAxis: "y",
		responsive: true,
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context) {
						const value = context.raw as number;
						return value < 0.01 ? `Діаметр: ${(value * 1000).toFixed(1)} метри` : `Діаметр: ${value.toFixed(2)} km`;
					},
				},
			},
			legend: { display: false },
		},
		scales: {
			x: {
				type: "logarithmic",
				min: 0.0001,
				ticks: {
					callback: (value: any) => (value.toFixed ? value.toFixed(2) : value),
					color: "#888",
				},
				title: {
					display: true,
					text: "Діаметр (km) - Log Scale",
					color: "#888",
				},
			},
			y: {
				ticks: { color: "#888" },
			},
		},
	};

	if (loading) return <div>Завантаження...</div>;

	return (
		<div className="h-[600px]">
			<Bar data={chartData} options={options} />
		</div>
	);
}
