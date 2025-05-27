import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ApodDisplay from "@/components/apod-display"
import { SpaceIcon as Planet, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Space background"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>

        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Explore the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">Universe</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 animate-fade-in-delay">
            Discover the wonders of space through NASA's data and imagery
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/neo">
                Explore Near-Earth Objects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950"
            >
              <Link href="/mars">
                View Mars Rover Images
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* APOD section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Astronomy Picture of the Day</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            NASA's most popular service - discover a new stunning image or photograph of our universe daily
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
            </div>
          }
        >
          <ApodDisplay />
        </Suspense>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle>Near-Earth Objects</CardTitle>
              <CardDescription>Track asteroids and comets that pass close to Earth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gray-800 rounded-md flex items-center justify-center">
                <Planet className="h-16 w-16 text-purple-500" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/neo">Explore NEOs</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle>Mars Rover Gallery</CardTitle>
              <CardDescription>Browse the latest images from Mars rovers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gray-800 rounded-md flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-purple-500" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/mars">View Images</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle>NASA Media Search</CardTitle>
              <CardDescription>Search NASA's vast library of images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gray-800 rounded-md flex items-center justify-center">
                <Search className="h-16 w-16 text-purple-500" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/search">Search Media</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
