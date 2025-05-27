import Image from "next/image"
import { format } from "date-fns"
import { Calendar, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getApodData() {
  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      { next: { revalidate: 3600 } }, // Revalidate every hour
    )

    if (!response.ok) {
      throw new Error(`NASA API responded with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch APOD data:", error)
    return null
  }
}

export default async function ApodDisplay() {
  const data = await getApodData()

  if (!data) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Error Loading APOD</CardTitle>
          <CardDescription>Unable to load the Astronomy Picture of the Day. Please try again later.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <div className="relative aspect-video">
        {data.media_type === "image" ? (
          <Image src={data.url || "/placeholder.svg"} alt={data.title} fill className="object-cover" />
        ) : (
          <iframe src={data.url} title={data.title} allowFullScreen className="w-full h-full" />
        )}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{data.title}</CardTitle>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {format(new Date(data.date), "MMMM d, yyyy")}
          </div>
        </div>
        <CardDescription className="flex items-start gap-1">
          <Info className="h-4 w-4 mt-1 flex-shrink-0" />
          <span>{data.explanation}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-gray-400">{data.copyright && <p>© {data.copyright}</p>}</div>
      </CardContent>
    </Card>
  )
}
