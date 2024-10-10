"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  reworkType: z.enum(["materialFailure", "workmanshipIssues", "designChanges"]),
  reworkReason: z.string().min(10, {
    message: "Rework reason must be at least 10 characters.",
  }),
  materialUsage: z.string().min(2, {
    message: "Material usage must be at least 2 characters.",
  }),
  manHours: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Man hours must be a valid number.",
  }),
  costImpact: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Cost impact must be a valid number.",
  }),
  projectPhase: z.string().min(2, {
    message: "Project phase must be at least 2 characters.",
  }),
  comments: z.string().optional(),
  image: z.instanceof(File).optional(),
})

export default function ReworkForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      reworkType: "materialFailure",
      reworkReason: "",
      materialUsage: "",
      manHours: "",
      costImpact: "",
      projectPhase: "",
      comments: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Rework submitted",
        description: "The rework has been successfully recorded.",
      })
      setIsSubmitting(false)
      form.reset()
      setImagePreview(null)
    }, 1000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Rework Tracking</h1>
        <p className="text-muted-foreground">Complete the form below to submit a rework record.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reworkType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rework Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rework type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="materialFailure">Material Failure</SelectItem>
                    <SelectItem value="workmanshipIssues">Workmanship Issues</SelectItem>
                    <SelectItem value="designChanges">Design Changes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reworkReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rework Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain the reason for rework"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materialUsage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Usage</FormLabel>
                <FormControl>
                  <Input placeholder="Enter materials used" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Man Hours</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Enter man hours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costImpact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Impact</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter cost impact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectPhase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Phase</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project phase" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any additional comments"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rework Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormDescription>
                  Take a picture or upload an image of the rework area.
                </FormDescription>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-2">
                    <Image src={imagePreview} alt="Rework preview" width={200} height={200} />
                  </div>
                )}
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Rework"}
          </Button>
        </form>
      </Form>
    </div>
  )
}