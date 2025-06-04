"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, Camera, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// This would normally be a server component, but for demo purposes
// we're using client-side fetching to show loading states
export default function MarsRoverGallery({ rover }: { rover: string }) {
	const [photos, setPhotos] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

	useEffect(() => {
		const fetchRoverPhotos = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DEMO_KEY`);

				if (!response.ok) {
					throw new Error(`NASA API responded with status: ${response.status}`);
				}

				const data = await response.json();
				setPhotos(data.latest_photos || []);
			} catch (error) {
				console.error(`Failed to fetch ${rover} photos:`, error);
				setError(`Помилка завантаження ${rover} фотографій. Спробуйте пізніше`);
			} finally {
				setLoading(false);
			}
		};

		fetchRoverPhotos();
	}, [rover]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="text-center">
					<div className="inline-block mb-4">
						<div className="h-12 w-12 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
					</div>
					<p className="text-gray-400">Loading {rover} photos...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
				<p className="text-red-400">{error}</p>
			</div>
		);
	}

	if (photos.length === 0) {
		return (
			<div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
				<p>No photos available for {rover}.</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{photos.map((photo) => (
					<Card
						key={photo.id}
						className="bg-gray-900 border-gray-800 overflow-hidden hover:border-purple-500 transition-all cursor-pointer"
						onClick={() => setSelectedPhoto(photo)}
					>
						<div className="relative aspect-square">
							<Image src={photo.img_src || "/placeholder.svg"} alt={`Mars Rover ${rover} - Sol ${photo.sol}`} fill className="object-cover" />
						</div>
						<CardContent className="p-4">
							<div className="flex items-center justify-between mb-2">
								<Badge variant="outline" className="bg-purple-950 text-purple-400 border-purple-800">
									{photo.camera.full_name}
								</Badge>
								<div className="flex items-center text-gray-400 text-xs">
									<Calendar className="h-3 w-3 mr-1" />
									{format(new Date(photo.earth_date), "MMM d, yyyy")}
								</div>
							</div>
							<div className="text-xs text-gray-400">Sol: {photo.sol}</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Photo Modal */}
			{selectedPhoto && (
				<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
					<div className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden">
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70"
							onClick={() => setSelectedPhoto(null)}
						>
							<X className="h-5 w-5" />
							<span className="sr-only">Close</span>
						</Button>

						<div className="relative aspect-video">
							<Image
								src={selectedPhoto.img_src || "/placeholder.svg"}
								alt={`Mars Rover ${rover} - Sol ${selectedPhoto.sol}`}
								fill
								className="object-contain"
							/>
						</div>

						<div className="p-4">
							<div className="flex flex-wrap items-center gap-2 mb-2">
								<Badge className="bg-purple-600">{rover.charAt(0).toUpperCase() + rover.slice(1)}</Badge>
								<Badge variant="outline" className="flex items-center gap-1">
									<Camera className="h-3 w-3" />
									{selectedPhoto.camera.full_name} ({selectedPhoto.camera.name})
								</Badge>
								<div className="text-sm text-gray-400 ml-auto">Sol: {selectedPhoto.sol}</div>
							</div>

							<div className="flex items-center text-sm text-gray-400">
								<Calendar className="h-4 w-4 mr-1" />
								Earth Date: {format(new Date(selectedPhoto.earth_date), "MMMM d, yyyy")}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
