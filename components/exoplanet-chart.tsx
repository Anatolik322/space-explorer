"use client";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ExoplanetChart() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchExoplanetData = async () => {
			try {
				setLoading(true);

				// NASA Exoplanet Archive API endpoint
				const response = await fetch(
					"https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+disc_year,discoverymethod+from+ps+where+disc_year+is+not+null+and+disc_year+>=+1995+and+disc_year+<=+2023&format=json"
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const rawData = await response.json();

				// Process the data to group by year and discovery method
				const processedData = processNASAData(rawData);
				setData(processedData);
				setError(null);
			} catch (err) {
				console.error("Error fetching NASA data:", err);
				setError(err.message);
				// Fallback to demo data if API fails
				setData(getDemoData());
			} finally {
				setLoading(false);
			}
		};

		fetchExoplanetData();
	}, []);

	const processNASAData = (rawData) => {
		// Group data by year and method
		const yearGroups = {};

		rawData.forEach((planet) => {
			const year = planet.disc_year;
			const method = normalizeMethod(planet.discoverymethod);

			if (!yearGroups[year]) {
				yearGroups[year] = {
					year: year,
					transit: 0,
					radialVelocity: 0,
					directImaging: 0,
					microlensing: 0,
					timing: 0,
					other: 0,
				};
			}

			yearGroups[year][method]++;
		});

		// Convert to array and sort by year
		return Object.values(yearGroups).sort((a, b) => a.year - b.year);
	};

	const normalizeMethod = (method) => {
		if (!method) return "other";

		const methodLower = method.toLowerCase();

		if (methodLower.includes("transit")) return "transit";
		if (methodLower.includes("radial velocity") || methodLower.includes("doppler")) return "radialVelocity";
		if (methodLower.includes("imaging") || methodLower.includes("direct")) return "directImaging";
		if (methodLower.includes("microlensing")) return "microlensing";
		if (methodLower.includes("timing") || methodLower.includes("variation")) return "timing";

		return "other";
	};

	const getDemoData = () => {
		// Fallback demo data based on realistic exoplanet discovery trends
		return [
			{ year: 1995, transit: 0, radialVelocity: 1, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 1996, transit: 0, radialVelocity: 6, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 1997, transit: 0, radialVelocity: 9, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 1998, transit: 0, radialVelocity: 15, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 1999, transit: 0, radialVelocity: 27, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 2000, transit: 0, radialVelocity: 43, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 2001, transit: 0, radialVelocity: 68, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 2002, transit: 2, radialVelocity: 95, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 2003, transit: 5, radialVelocity: 110, directImaging: 0, microlensing: 0, timing: 0 },
			{ year: 2004, transit: 8, radialVelocity: 135, directImaging: 1, microlensing: 1, timing: 0 },
			{ year: 2005, transit: 12, radialVelocity: 160, directImaging: 2, microlensing: 2, timing: 0 },
			{ year: 2006, transit: 18, radialVelocity: 190, directImaging: 3, microlensing: 3, timing: 1 },
			{ year: 2007, transit: 25, radialVelocity: 220, directImaging: 5, microlensing: 5, timing: 2 },
			{ year: 2008, transit: 35, radialVelocity: 250, directImaging: 7, microlensing: 7, timing: 3 },
			{ year: 2009, transit: 60, radialVelocity: 290, directImaging: 10, microlensing: 10, timing: 5 },
			{ year: 2010, transit: 100, radialVelocity: 330, directImaging: 12, microlensing: 12, timing: 8 },
			{ year: 2011, transit: 150, radialVelocity: 380, directImaging: 15, microlensing: 15, timing: 10 },
			{ year: 2012, transit: 250, radialVelocity: 420, directImaging: 18, microlensing: 18, timing: 12 },
			{ year: 2013, transit: 400, radialVelocity: 450, directImaging: 20, microlensing: 20, timing: 15 },
			{ year: 2014, transit: 600, radialVelocity: 480, directImaging: 22, microlensing: 22, timing: 18 },
			{ year: 2015, transit: 800, radialVelocity: 510, directImaging: 25, microlensing: 25, timing: 20 },
			{ year: 2016, transit: 1000, radialVelocity: 540, directImaging: 28, microlensing: 28, timing: 22 },
			{ year: 2017, transit: 1200, radialVelocity: 570, directImaging: 30, microlensing: 30, timing: 25 },
			{ year: 2018, transit: 1400, radialVelocity: 600, directImaging: 32, microlensing: 32, timing: 28 },
			{ year: 2019, transit: 1600, radialVelocity: 630, directImaging: 35, microlensing: 35, timing: 30 },
			{ year: 2020, transit: 1800, radialVelocity: 660, directImaging: 38, microlensing: 38, timing: 32 },
			{ year: 2021, transit: 2000, radialVelocity: 690, directImaging: 40, microlensing: 40, timing: 35 },
			{ year: 2022, transit: 2200, radialVelocity: 720, directImaging: 42, microlensing: 42, timing: 38 },
			{ year: 2023, transit: 2400, radialVelocity: 750, directImaging: 45, microlensing: 45, timing: 40 },
		];
	};

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

			return (
				<div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
					<div className="text-white font-bold mb-2">Year {label}</div>
					{payload
						.filter((entry) => entry.value > 0)
						.map((entry) => (
							<div key={entry.dataKey} className="text-sm mb-1" style={{ color: entry.color }}>
								<span className="font-medium">{entry.name}:</span> {entry.value}
							</div>
						))}
					<div className="text-white text-sm font-bold mt-2 pt-2 border-t border-gray-600">Total: {total}</div>
				</div>
			);
		}
		return null;
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p className="text-gray-300">Loading NASA exoplanet data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-900 p-6 rounded-lg">
			<div className="mb-4">
				<h2 className="text-2xl font-bold text-white mb-2">Exoplanet Discoveries by Method (1995-2023)</h2>
				<p className="text-gray-400 text-sm">{error ? "Using demo data (NASA API unavailable)" : "Data from NASA Exoplanet Archive"}</p>
			</div>

			<div className="h-96">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis dataKey="year" tick={{ fill: "#9CA3AF", fontSize: 12 }} tickLine={{ stroke: "#6B7280" }} axisLine={{ stroke: "#6B7280" }} />
						<YAxis
							tick={{ fill: "#9CA3AF", fontSize: 12 }}
							tickLine={{ stroke: "#6B7280" }}
							axisLine={{ stroke: "#6B7280" }}
							label={{
								value: "Cumulative Discoveries",
								angle: -90,
								position: "insideLeft",
								style: { textAnchor: "middle", fill: "#9CA3AF" },
							}}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend wrapperStyle={{ color: "#9CA3AF" }} iconType="rect" />

						<Area type="monotone" dataKey="transit" name="Transit" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.8} />
						<Area type="monotone" dataKey="radialVelocity" name="Radial Velocity" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
						<Area type="monotone" dataKey="directImaging" name="Direct Imaging" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
						<Area type="monotone" dataKey="microlensing" name="Microlensing" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
						<Area type="monotone" dataKey="timing" name="Timing Variations" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.8} />
					</AreaChart>
				</ResponsiveContainer>
			</div>

			{error && (
				<div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded-md">
					<p className="text-yellow-200 text-sm">
						<strong>Note:</strong> Could not connect to NASA API ({error}). Displaying demo data instead.
					</p>
				</div>
			)}
		</div>
	);
}
