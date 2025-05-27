import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

// This would normally fetch from an API, but for demo purposes we're using static data
const asteroidData = [
  { name: "Bennu", diameter: 0.49, color: "#9333ea" },
  { name: "Apophis", diameter: 0.37, color: "#8b5cf6" },
  { name: "2020 QG", diameter: 0.003, color: "#a78bfa" },
  { name: "Didymos", diameter: 0.78, color: "#7c3aed" },
  { name: "Ryugu", diameter: 0.9, color: "#6d28d9" },
  { name: "1998 OR2", diameter: 2.1, color: "#5b21b6" },
  { name: "Eros", diameter: 16.8, color: "#4c1d95" },
  { name: "Vesta", diameter: 525, color: "#2e1065" },
]

// Add comparison objects
const comparisonData = [
  { name: "Basketball", diameter: 0.00024, color: "#f97316" },
  { name: "Bus", diameter: 0.012, color: "#f59e0b" },
  { name: "Football Field", diameter: 0.1, color: "#84cc16" },
  { name: "Empire State", diameter: 0.443, color: "#10b981" },
  { name: "Central Park", diameter: 4, color: "#06b6d4" },
  { name: "Manhattan", diameter: 21.6, color: "#0ea5e9" },
]

// Combine and sort by size
const combinedData = [...asteroidData, ...comparisonData].sort((a, b) => a.diameter - b.diameter)

export default function AsteroidSizeChart() {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer>
          <BarChart data={combinedData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
            <XAxis
              type="number"
              domain={[0.0001, "dataMax"]}
              scale="log"
              tick={{ fill: "#888" }}
              tickFormatter={(value) => value.toFixed(2)}
              label={{
                value: "Diameter (km) - Log Scale",
                position: "bottom",
                offset: 0,
                fill: "#888",
              }}
            />
            <YAxis dataKey="name" type="category" tick={{ fill: "#888" }} width={100} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent>
                        <div className="font-bold">{data.name}</div>
                        <div className="text-sm">
                          Diameter:{" "}
                          {data.diameter < 0.01
                            ? `${(data.diameter * 1000).toFixed(1)} meters`
                            : `${data.diameter.toFixed(2)} km`}
                        </div>
                      </ChartTooltipContent>
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="diameter"
              fill="#8884d8"
              radius={[0, 4, 4, 0]}
              barSize={20}
              label={{
                position: "right",
                fill: "#fff",
                fontSize: 12,
                formatter: (value: number) =>
                  value < 0.01 ? `${(value * 1000).toFixed(1)}m` : `${value.toFixed(2)}km`,
              }}
            >
              {combinedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}
