import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import MarsRoverGallery from "@/components/mars-rover-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
	title: "Mars Rover Gallery | Space Explorer",
	description: "Browse the latest images from Mars rovers Curiosity, Opportunity, and Spirit",
};

export default function MarsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Галерея з марсохода</h1>
				<p className="text-gray-400">
					Перегляньте останні зображення, зроблені марсоходами НАСА. Виберіть марсохід, щоб переглянути його найсвіжіші фотографії.
				</p>
			</div>

			<Tabs defaultValue="curiosity">
				<TabsList className="grid w-full grid-cols-3 mb-8">
					<TabsTrigger value="curiosity">Curiosity</TabsTrigger>
					<TabsTrigger value="opportunity">Opportunity</TabsTrigger>
					<TabsTrigger value="spirit">Spirit</TabsTrigger>
				</TabsList>

				<TabsContent value="curiosity">
					<Suspense
						fallback={
							<div className="flex justify-center items-center h-96">
								<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
							</div>
						}
					>
						<MarsRoverGallery rover="curiosity" />
					</Suspense>
				</TabsContent>

				<TabsContent value="opportunity">
					<Suspense
						fallback={
							<div className="flex justify-center items-center h-96">
								<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
							</div>
						}
					>
						<MarsRoverGallery rover="opportunity" />
					</Suspense>
				</TabsContent>

				<TabsContent value="spirit">
					<Suspense
						fallback={
							<div className="flex justify-center items-center h-96">
								<Loader2 className="h-12 w-12 animate-spin text-purple-500" />
							</div>
						}
					>
						<MarsRoverGallery rover="spirit" />
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
