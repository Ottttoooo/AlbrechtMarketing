import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactForm() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Get in touch</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email address" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us how we can help..." className="min-h-[150px]" required />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>Here&apos;s how you can reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 9AM - 5PM</p>
                  <p className="text-sm text-muted-foreground">Saturday: 10AM - 2PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@example.com</p>
                  <p className="text-sm text-muted-foreground">support@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">123 Business Street</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-muted p-4">
                <h3 className="font-medium">Response Time</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We typically respond to inquiries within 24-48 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
