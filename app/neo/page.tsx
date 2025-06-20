import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import NeoChart from "@/components/neo-chart";
import NeoTable from "@/components/neo-table";

export const metadata = {
	title: "Near-Earth Objects | Space Explorer",
	description: "Track and visualize asteroids and comets that pass close to Earth",
};

export default function NeoPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Навколоземні об'єкти</h1>
				<p className="text-gray-400">
					Відстежуйте та візуалізуйте астероїди та комети, які пройдуть близько до Землі протягом наступних 7 днів. Дані надані веб-службою NASA's
					Near Earth Object Web (NeoWs).
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8">
				<section>
					<h2 className="text-2xl font-bold mb-4">Активність навколоземних обєктів</h2>
					<div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
						<Suspense
							fallback={
								<div className="flex justify-center items-center h-80">
									<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
								</div>
							}
						>
							<NeoChart />
						</Suspense>
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-bold mb-4">Найближчі навколоземні об'єкти</h2>
					<Suspense
						fallback={
							<div className="flex justify-center items-center h-96">
								<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
							</div>
						}
					>
						<NeoTable />
					</Suspense>
				</section>
			</div>
		</div>
	);
}
