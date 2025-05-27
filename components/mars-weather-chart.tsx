import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// This would normally fetch from an API, but for demo purposes we're using static data
// Simulated Mars weather data (temperatures in Celsius, pressure in Pascals)
const marsWeatherData = [
  { sol: 1, minTemp: -83, maxTemp: -33, avgTemp: -63, pressure: 730 },
  { sol: 2, minTemp: -85, maxTemp: -29, avgTemp: -61, pressure: 728 },
  { sol: 3, minTemp: -84, maxTemp: -31, avgTemp: -62, pressure: 729 },
  { sol: 4, minTemp: -82, maxTemp: -28, avgTemp: -60, pressure: 731 },
  { sol: 5, minTemp: -86, maxTemp: -32, avgTemp: -64, pressure: 726 },
  { sol: 6, minTemp: -88, maxTemp: -35, avgTemp: -67, pressure: 724 },
  { sol: 7, minTemp: -87, maxTemp: -34, avgTemp: -65, pressure: 725 },
  { sol: 8, minTemp: -85, maxTemp: -30, avgTemp: -62, pressure: 727 },
  { sol: 9, minTemp: -83, maxTemp: -27, avgTemp: -59, pressure: 730 },
  { sol: 10, minTemp: -81, maxTemp: -26, avgTemp: -58, pressure: 732 },
  { sol: 11, minTemp: -82, maxTemp: -28, avgTemp: -60, pressure: 731 },
  { sol: 12, minTemp: -84, maxTemp: -30, avgTemp: -62, pressure: 729 },
  { sol: 13, minTemp: -86, maxTemp: -33, avgTemp: -64, pressure: 726 },
  { sol: 14, minTemp: -85, maxTemp: -31, avgTemp: -63, pressure: 728 },
]

export default function MarsWeatherChart() {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer>
          <LineChart data={marsWeatherData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="sol"
              tick={{ fill: "#888" }}
              label={{
                value: "Sol (Mars Day)",
                position: "bottom",
                offset: 0,
                fill: "#888",
              }}
            />
            <YAxis
              yAxisId="temp"
              tick={{ fill: "#888" }}
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideLeft",
                fill: "#888",
              }}
            />
            <YAxis
              yAxisId="pressure"
              orientation="right"
              domain={[710, 740]}
              tick={{ fill: "#888" }}
              label={{
                value: "Pressure (Pa)",
                angle: 90,
                position: "insideRight",
                fill: "#888",
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent>
                        <div className="font-bold">Sol {label}</div>
                        <div className="text-sm text-red-400">Max Temp: {payload[0].value}°C</div>
                        <div className="text-sm text-yellow-400">Avg Temp: {payload[1].value}°C</div>
                        <div className="text-sm text-blue-400">Min Temp: {payload[2].value}°C</div>
                        <div className="text-sm text-green-400">Pressure: {payload[3].value} Pa</div>
                      </ChartTooltipContent>
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="maxTemp"
              name="Max Temp"
              stroke="#ef4444"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="avgTemp"
              name="Avg Temp"
              stroke="#eab308"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="minTemp"
              name="Min Temp"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="pressure"
              type="monotone"
              dataKey="pressure"
              name="Pressure"
              stroke="#10b981"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}
