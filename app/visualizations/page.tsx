import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AsteroidSizeChart from "@/components/asteroid-size-chart";
import MarsWeatherChart from "@/components/mars-weather-chart";
import ExoplanetChart from "@/components/exoplanet-chart";

export const metadata = {
	title: "Data Visualizations | Space Explorer",
	description: "Interactive charts and visualizations of space data from NASA",
};

export default function VisualizationsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Візуалізація космічних об'єктів</h1>
				<p className="text-gray-400">Досліджуйте інтерактивні діаграми та візуалізації космічних даних від NASA та інших джерел.</p>
			</div>

			<Tabs defaultValue="asteroids">
				<TabsList className="grid w-full grid-cols-3 mb-8">
					<TabsTrigger value="asteroids">Розміри Астероїдів</TabsTrigger>
					<TabsTrigger value="mars-weather">Погода на Марсі</TabsTrigger>
					<TabsTrigger value="exoplanets">Екзопланети</TabsTrigger>
				</TabsList>

				<TabsContent value="asteroids">
					<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
						<h2 className="text-2xl font-bold mb-4">Порівняння розмірів астероїдів</h2>
						<p className="text-gray-400 mb-6">
							Візуалізація відносних розмірів помітних навколоземних астероїдів у порівнянні зі знайомими об'єктами.
						</p>

						<Suspense
							fallback={
								<div className="flex justify-center items-center h-80">
									<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
								</div>
							}
						>
							<AsteroidSizeChart />
						</Suspense>
					</div>
				</TabsContent>

				<TabsContent value="mars-weather">
					<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
						<h2 className="text-2xl font-bold mb-4">Mars Weather Data</h2>
						<p className="text-gray-400 mb-6">Temperature and atmospheric pressure readings from the Perseverance rover on Mars.</p>

						<Suspense
							fallback={
								<div className="flex justify-center items-center h-80">
									<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
								</div>
							}
						>
							<MarsWeatherChart />
						</Suspense>
					</div>
				</TabsContent>

				<TabsContent value="exoplanets">
					<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
						<h2 className="text-2xl font-bold mb-4">Exoplanet Discovery Timeline</h2>
						<p className="text-gray-400 mb-6">Visualization of exoplanet discoveries over time by detection method.</p>

						<Suspense
							fallback={
								<div className="flex justify-center items-center h-80">
									<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
								</div>
							}
						>
							<ExoplanetChart />
						</Suspense>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
