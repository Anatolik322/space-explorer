"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Search, Loader2, X, Calendar, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`)

      if (!response.ok) {
        throw new Error(`NASA API responded with status: ${response.status}`)
      }

      const data = await response.json()
      setResults(data.collection.items || [])
    } catch (error) {
      console.error("Failed to search NASA media:", error)
      setError("Failed to search NASA media. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">NASA Media Search</h1>
        <p className="text-gray-400">Search NASA's vast library of images, videos, and audio recordings.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <Input
          type="search"
          placeholder="Search for space images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-900 border-gray-800"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
          Search
        </Button>
      </form>

      {error && (
        <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item, index) => {
            const data = item.data[0]
            const imageUrl = item.links?.[0]?.href

            return (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 overflow-hidden hover:border-purple-500 transition-all cursor-pointer"
                onClick={() => setSelectedItem({ ...data, imageUrl })}
              >
                <div className="relative aspect-video">
                  {imageUrl && (
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={data.title || "NASA image"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{data.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mt-1">{data.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="bg-blue-950 text-blue-400 border-blue-800">
                      {data.center || "NASA"}
                    </Badge>
                    {data.date_created && (
                      <div className="text-xs text-gray-400">{new Date(data.date_created).getFullYear()}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        !loading &&
        query && (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <p>No results found for "{query}". Try a different search term.</p>
          </div>
        )
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gray-900 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedItem(null)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="relative aspect-video">
              {selectedItem.imageUrl && (
                <Image
                  src={selectedItem.imageUrl || "/placeholder.svg"}
                  alt={selectedItem.title || "NASA image"}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-blue-600">{selectedItem.center || "NASA"}</Badge>
                {selectedItem.date_created && (
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(selectedItem.date_created).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{selectedItem.description}</p>
                </div>

                {selectedItem.keywords && selectedItem.keywords.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Keywords:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.keywords.map((keyword: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.nasa_id && <p className="text-xs text-gray-500">NASA ID: {selectedItem.nasa_id}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
