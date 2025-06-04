"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, SpaceIcon as Planet, Search, ImageIcon, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const routes = [
		{ name: "Головна", path: "/", icon: <Rocket className="h-5 w-5 mr-2" /> },
		{ name: "Об'єкти біля Землі", path: "/neo", icon: <Planet className="h-5 w-5 mr-2" /> },
		{ name: "Марсоходи", path: "/mars", icon: <ImageIcon className="h-5 w-5 mr-2" /> },
		{ name: "Пошук медіа", path: "/search", icon: <Search className="h-5 w-5 mr-2" /> },
		{ name: "Візуалізації даних", path: "/visualizations", icon: <BarChart2 className="h-5 w-5 mr-2" /> },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-800 backdrop-blur-sm bg-black/70">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<Rocket className="h-6 w-6 text-purple-500" />
							<span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">Space Explorer</span>
						</Link>
					</div>

					{/* Desktop navigation */}
					<nav className="hidden md:flex items-center space-x-6">
						{routes.map((route) => (
							<Link
								key={route.path}
								href={route.path}
								className={cn(
									"flex items-center text-sm font-medium transition-colors hover:text-purple-500",
									pathname === route.path ? "text-purple-500" : "text-gray-300"
								)}
							>
								{route.icon}
								{route.name}
							</Link>
						))}
					</nav>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile navigation */}
			{isOpen && (
				<div className="md:hidden border-t border-gray-800">
					<div className="container mx-auto px-4 py-3 space-y-1">
						{routes.map((route) => (
							<Link
								key={route.path}
								href={route.path}
								className={cn(
									"flex items-center py-3 text-base font-medium transition-colors hover:text-purple-500",
									pathname === route.path ? "text-purple-500" : "text-gray-300"
								)}
								onClick={() => setIsOpen(false)}
							>
								{route.icon}
								{route.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
