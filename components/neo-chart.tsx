"use client";

import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { LineChart, Line, Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ComposedChart } from "recharts";

async function getNeoData() {
	const today = new Date();
	const endDate = addDays(today, 7);

	const startDateStr = format(today, "yyyy-MM-dd");
	const endDateStr = format(endDate, "yyyy-MM-dd");

	try {
		const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=DEMO_KEY`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error(`NASA API responded with status: ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error("Failed to fetch NEO data:", error);
		return null;
	}
}

export default function NeoChart() {
	const [chartData, setChartData] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getNeoData();
			if (!data) return;

			const processed = Object.entries(data.near_earth_objects)
				.map(([date, objects]) => {
					const neoObjects = objects as any[];

					const hazardousCount = neoObjects.filter((obj) => obj.is_potentially_hazardous_asteroid).length;
					const nonHazardousCount = neoObjects.length - hazardousCount;

					const largestObject = neoObjects.reduce((largest, current) => {
						const currentSize = current.estimated_diameter.kilometers.estimated_diameter_max;
						const largestSize = largest?.estimated_diameter.kilometers.estimated_diameter_max || 0;
						return currentSize > largestSize ? current : largest;
					}, null);

					const largestDiameter = largestObject
						? Number.parseFloat(largestObject.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2))
						: 0;

					return {
						date: format(new Date(date), "MMM d"),
						total: neoObjects.length,
						hazardous: hazardousCount,
						nonHazardous: nonHazardousCount,
						largestDiameter,
					};
				})
				.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

			setChartData(processed);
		};

		fetchData();
	}, []);

	if (!chartData.length) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="w-full h-[400px]">
			<h2 className="text-xl font-semibold text-center mb-4">NEO Data (Next 7 Days)</h2>
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis yAxisId="left" />
					<YAxis yAxisId="right" orientation="right" />
					<Tooltip />
					<Legend />
					<Bar yAxisId="left" dataKey="hazardous" stackId="a" fill="#dc2626" name="Hazardous" />
					<Bar yAxisId="left" dataKey="nonHazardous" stackId="a" fill="#16a34a" name="Non-Hazardous" />
					<Line yAxisId="right" type="monotone" dataKey="largestDiameter" stroke="#2563eb" name="Largest Diameter (km)" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
