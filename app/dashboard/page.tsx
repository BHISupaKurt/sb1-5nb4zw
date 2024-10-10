"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data for demonstration purposes
const mockData = {
  inspections: 150,
  audits: 30,
  reworks: 15,
  customerSatisfaction: 4.2,
  qualityScore: 85,
  reworkCost: 50000,
  projectCompliance: 92,
}

const mockChartData = [
  { name: 'Jan', inspections: 20, audits: 5, reworks: 2 },
  { name: 'Feb', inspections: 25, audits: 7, reworks: 3 },
  { name: 'Mar', inspections: 30, audits: 6, reworks: 1 },
  { name: 'Apr', inspections: 22, audits: 4, reworks: 2 },
  { name: 'May', inspections: 28, audits: 5, reworks: 4 },
  { name: 'Jun', inspections: 35, audits: 8, reworks: 3 },
]

const mockPieData = [
  { name: 'Pass', value: 70 },
  { name: 'Fail', value: 15 },
  { name: 'Needs Improvement', value: 15 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard() {
  const [data, setData] = useState(mockData)
  const [chartData, setChartData] = useState(mockChartData)
  const [pieData, setPieData] = useState(mockPieData)

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    setData(mockData)
    setChartData(mockChartData)
    setPieData(mockPieData)
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Quality Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.inspections}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audits Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.audits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reworks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.reworks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.customerSatisfaction.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={data.qualityScore} className="w-full" />
            <p className="text-center mt-2">{data.qualityScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rework Cost Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${data.reworkCost.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quality Metrics Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inspections" fill="#8884d8" />
                <Bar dataKey="audits" fill="#82ca9d" />
                <Bar dataKey="reworks" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inspection Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}