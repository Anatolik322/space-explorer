import { addDays, format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

async function getNeoData() {
	const today = new Date();
	const endDate = addDays(today, 7);

	const startDateStr = format(today, "yyyy-MM-dd");
	const endDateStr = format(endDate, "yyyy-MM-dd");

	try {
		const response = await fetch(
			`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=DEMO_KEY`,
			{ next: { revalidate: 3600 } } // Revalidate every hour
		);

		if (!response.ok) {
			throw new Error(`NASA API responded with status: ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error("Failed to fetch NEO data:", error);
		return null;
	}
}

export default async function NeoTable() {
	const data = await getNeoData();

	if (!data) {
		return <div className="text-center py-8">Failed to load NEO data</div>;
	}

	// Process and flatten data for table
	const tableData = Object.entries(data.near_earth_objects)
		.flatMap(([date, objects]) => {
			return (objects as any[]).map((obj) => {
				const closeApproach = obj.close_approach_data.find((approach: any) => approach.close_approach_date === date) || obj.close_approach_data[0];

				return {
					id: obj.id,
					name: obj.name,
					date: date,
					diameter: obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2),
					velocity: Number.parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(0),
					missDistance: Number.parseFloat(closeApproach.miss_distance.kilometers).toFixed(0),
					isHazardous: obj.is_potentially_hazardous_asteroid,
				};
			});
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className="rounded-md border border-gray-800 overflow-hidden">
			<Table>
				<TableHeader className="bg-gray-900">
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className="text-right">Diameter (km)</TableHead>
						<TableHead className="text-right">Velocity (km/h)</TableHead>
						<TableHead className="text-right">Miss Distance (km)</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData.map((neo) => (
						<TableRow key={`${neo.id}-${neo.date}`} className="hover:bg-gray-900/50">
							<TableCell className="font-medium">{neo.name}</TableCell>
							<TableCell>{format(new Date(neo.date), "MMM d, yyyy")}</TableCell>
							<TableCell className="text-right">{neo.diameter}</TableCell>
							<TableCell className="text-right">{neo.velocity}</TableCell>
							<TableCell className="text-right">{neo.missDistance}</TableCell>
							<TableCell>
								{neo.isHazardous ? (
									<Badge variant="destructive" className="flex items-center gap-1">
										<AlertTriangle className="h-3 w-3" />
										Potentially Hazardous
									</Badge>
								) : (
									<Badge variant="outline" className="bg-green-950 text-green-400 border-green-800">
										Safe
									</Badge>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
