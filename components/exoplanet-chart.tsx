import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// This would normally fetch from an API, but for demo purposes we're using static data
// Simulated exoplanet discovery data by method and year
const exoplanetData = [
  { year: 1995, transit: 0, radialVelocity: 1, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 1996, transit: 0, radialVelocity: 6, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 1997, transit: 0, radialVelocity: 9, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 1998, transit: 0, radialVelocity: 15, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 1999, transit: 0, radialVelocity: 27, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 2000, transit: 0, radialVelocity: 43, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 2001, transit: 0, radialVelocity: 68, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 2002, transit: 2, radialVelocity: 95, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 2003, transit: 5, radialVelocity: 110, directImaging: 0, microlensing: 0, timing: 0 },
  { year: 2004, transit: 8, radialVelocity: 135, directImaging: 1, microlensing: 1, timing: 0 },
  { year: 2005, transit: 12, radialVelocity: 160, directImaging: 2, microlensing: 2, timing: 0 },
  { year: 2006, transit: 18, radialVelocity: 190, directImaging: 3, microlensing: 3, timing: 1 },
  { year: 2007, transit: 25, radialVelocity: 220, directImaging: 5, microlensing: 5, timing: 2 },
  { year: 2008, transit: 35, radialVelocity: 250, directImaging: 7, microlensing: 7, timing: 3 },
  { year: 2009, transit: 60, radialVelocity: 290, directImaging: 10, microlensing: 10, timing: 5 },
  { year: 2010, transit: 100, radialVelocity: 330, directImaging: 12, microlensing: 12, timing: 8 },
  { year: 2011, transit: 150, radialVelocity: 380, directImaging: 15, microlensing: 15, timing: 10 },
  { year: 2012, transit: 250, radialVelocity: 420, directImaging: 18, microlensing: 18, timing: 12 },
  { year: 2013, transit: 400, radialVelocity: 450, directImaging: 20, microlensing: 20, timing: 15 },
  { year: 2014, transit: 600, radialVelocity: 480, directImaging: 22, microlensing: 22, timing: 18 },
  { year: 2015, transit: 800, radialVelocity: 510, directImaging: 25, microlensing: 25, timing: 20 },
  { year: 2016, transit: 1000, radialVelocity: 540, directImaging: 28, microlensing: 28, timing: 22 },
  { year: 2017, transit: 1200, radialVelocity: 570, directImaging: 30, microlensing: 30, timing: 25 },
  { year: 2018, transit: 1400, radialVelocity: 600, directImaging: 32, microlensing: 32, timing: 28 },
  { year: 2019, transit: 1600, radialVelocity: 630, directImaging: 35, microlensing: 35, timing: 30 },
  { year: 2020, transit: 1800, radialVelocity: 660, directImaging: 38, microlensing: 38, timing: 32 },
  { year: 2021, transit: 2000, radialVelocity: 690, directImaging: 40, microlensing: 40, timing: 35 },
  { year: 2022, transit: 2200, radialVelocity: 720, directImaging: 42, microlensing: 42, timing: 38 },
  { year: 2023, transit: 2400, radialVelocity: 750, directImaging: 45, microlensing: 45, timing: 40 },
]

export default function ExoplanetChart() {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer>
          <AreaChart data={exoplanetData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#888" }}
              label={{
                value: "Year",
                position: "bottom",
                offset: 0,
                fill: "#888",
              }}
            />
            <YAxis
              tick={{ fill: "#888" }}
              label={{
                value: "Number of Discoveries",
                angle: -90,
                position: "insideLeft",
                fill: "#888",
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent>
                        <div className="font-bold">Year {label}</div>
                        {payload.map((entry) => (
                          <div key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                          </div>
                        ))}
                        <div className="text-sm font-medium mt-1">
                          Total: {payload.reduce((sum, entry) => sum + (entry.value as number), 0)}
                        </div>
                      </ChartTooltipContent>
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="transit" name="Transit" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
            <Area
              type="monotone"
              dataKey="radialVelocity"
              name="Radial Velocity"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
            />
            <Area
              type="monotone"
              dataKey="directImaging"
              name="Direct Imaging"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
            />
            <Area
              type="monotone"
              dataKey="microlensing"
              name="Microlensing"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
            />
            <Area
              type="monotone"
              dataKey="timing"
              name="Timing Variations"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}
