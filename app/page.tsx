import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, CheckSquare, ClipboardList, UserCheck } from "lucide-react"

export default function Home() {
  const features = [
    { title: "Inspections", description: "Conduct material and workmanship inspections", icon: CheckSquare, href: "/inspections" },
    { title: "Audits", description: "Perform detailed project audits", icon: ClipboardList, href: "/audits" },
    { title: "Rework Tracking", description: "Track and manage project reworks", icon: BarChart, href: "/reworks" },
    { title: "Customer Satisfaction", description: "Gather and analyze customer feedback", icon: UserCheck, href: "/customer-satisfaction" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Construction Quality Tracker</h1>
      <p className="text-xl">Welcome to the comprehensive quality tracking application for your construction projects.</p>
      <Button asChild>
        <Link href="/dashboard">View Dashboard</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-6 w-6" />
                {feature.title}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={feature.href}>Go to {feature.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}