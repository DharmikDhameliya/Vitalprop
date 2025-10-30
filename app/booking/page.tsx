"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, AlertCircle, Download, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { createAppointment } from "./actions"
import { generateICS, downloadICS, getGoogleCalendarUrl, getOutlookCalendarUrl } from "@/lib/calendar"
import type { CalendarEvent } from "@/lib/calendar"

const services = [
  "CRM Integration",
  "Lead Capture",
  "AI Voice Caller",
  "Appointment Setter",
  "Full Automation Suite",
  "Consultation Only",
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError(null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        preferred_date: formData.date,
        preferred_time: formData.time,
        message: formData.message,
      })

      if (result.success) {
        setIsBooked(true)
      } else {
        setError(result.error || "Failed to book appointment")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Booking error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsBooked(false)
    setError(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      date: "",
      time: "",
      message: "",
    })
  }

  const handleAddToCalendar = (type: "google" | "outlook" | "ics") => {
    // Parse the date and time
    const [year, month, day] = formData.date.split("-").map(Number)
    const [time, period] = formData.time.split(" ")
    const [hours, minutes] = time.split(":").map(Number)

    // Convert to 24-hour format
    let hour24 = hours
    if (period === "PM" && hours !== 12) hour24 += 12
    if (period === "AM" && hours === 12) hour24 = 0

    const startTime = new Date(year, month - 1, day, hour24, minutes || 0)
    const endTime = new Date(startTime.getTime() + 30 * 60000) // 30 minutes later

    const calendarEvent: CalendarEvent = {
      title: `Vital Prop Consultation - ${formData.service}`,
      description: `Consultation with Vital Prop for ${formData.service}.\n\nContact: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}${formData.message ? `\n\nNotes: ${formData.message}` : ""}`,
      location: "Virtual Meeting (Link will be sent via email)",
      startTime,
      endTime,
      attendeeEmail: formData.email,
      attendeeName: formData.name,
      organizerEmail: "hello@vitalprop.com",
      organizerName: "Vital Prop",
    }

    if (type === "google") {
      window.open(getGoogleCalendarUrl(calendarEvent), "_blank")
    } else if (type === "outlook") {
      window.open(getOutlookCalendarUrl(calendarEvent), "_blank")
    } else if (type === "ics") {
      const icsContent = generateICS(calendarEvent)
      downloadICS(icsContent, `vital-prop-consultation-${formData.date}.ics`)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1
            className="text-5xl md:text-6xl font-sf-display font-bold mb-6 tracking-tighter text-glow"
            variants={itemVariants}
          >
            Book Your Consultation
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground font-sf-text font-semibold max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Schedule a free consultation to discover how AI automation can transform your business operations
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm neon-border">
            <CardContent className="p-8">
              {isBooked ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 glow-cyan">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-sf-display font-bold mb-4 text-glow">Consultation Booked!</h3>
                  <div className="bg-background/50 rounded-xl p-6 mb-6 border border-cyan-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1 font-sf-text font-semibold">Service</p>
                        <p className="text-foreground font-sf-text font-bold">{formData.service}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1 font-sf-text font-semibold">Date & Time</p>
                        <p className="text-foreground font-sf-text font-bold">
                          {formData.date} at {formData.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1 font-sf-text font-semibold">Contact</p>
                        <p className="text-foreground font-sf-text font-bold">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1 font-sf-text font-semibold">Phone</p>
                        <p className="text-foreground font-sf-text font-bold">{formData.phone}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-sf-text font-semibold mb-8">
                    We've sent a confirmation email with meeting details. Our team will contact you shortly to confirm
                    the appointment.
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-sf-display font-bold mb-4 text-foreground">Add to Calendar:</h4>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => handleAddToCalendar("google")}
                        className="btn-sci-fi transition-all duration-300 hover:scale-105 group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Google Calendar
                      </Button>
                      <Button
                        onClick={() => handleAddToCalendar("outlook")}
                        className="btn-sci-fi transition-all duration-300 hover:scale-105 group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Outlook
                      </Button>
                      <Button
                        onClick={() => handleAddToCalendar("ics")}
                        className="btn-sci-fi transition-all duration-300 hover:scale-105 group"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download .ics
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 font-sf-text">
                      The .ics file works with Apple Calendar, Thunderbird, and other calendar apps
                    </p>
                  </div>

                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="neon-border bg-transparent text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300"
                  >
                    Book Another Consultation
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-center gap-3"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="text-destructive font-semibold">{error}</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        name="company"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-background/50 border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                      Service of Interest *
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("service", value)} required>
                      <SelectTrigger className="bg-background/50 border-cyan-500/30 text-foreground focus:border-cyan-400 transition-colors duration-300">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-card/95 backdrop-blur-sm border-cyan-500/30">
                        {services.map((service) => (
                          <SelectItem
                            key={service}
                            value={service}
                            className="text-foreground hover:bg-cyan-500/10 focus:bg-cyan-500/10"
                          >
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Preferred Date *
                      </label>
                      <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-background/50 border-cyan-500/30 text-foreground focus:border-cyan-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                        <Clock className="inline w-4 h-4 mr-2" />
                        Preferred Time *
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("time", value)} required>
                        <SelectTrigger className="bg-background/50 border-cyan-500/30 text-foreground focus:border-cyan-400 transition-colors duration-300">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 backdrop-blur-sm border-cyan-500/30">
                          {timeSlots.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              className="text-foreground hover:bg-cyan-500/10 focus:bg-cyan-500/10"
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-sf-text font-bold text-muted-foreground mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your current challenges and what you'd like to achieve..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-background/50 border border-cyan-500/30 rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <div className="bg-card/30 rounded-xl p-6 border border-cyan-500/30">
                    <h4 className="font-sf-display font-bold text-foreground mb-2">What to Expect:</h4>
                    <ul className="text-muted-foreground font-sf-text font-semibold space-y-1 text-sm">
                      <li>• 30-minute consultation call</li>
                      <li>• Analysis of your current processes</li>
                      <li>• Custom automation recommendations</li>
                      <li>• No-obligation proposal</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-sci-fi transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg"
                  >
                    {isSubmitting ? "Booking Your Consultation..." : "Book Free Consultation"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
