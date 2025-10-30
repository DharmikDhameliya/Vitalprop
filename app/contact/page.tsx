"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@vitalprop.com",
    href: "mailto:hello@vitalprop.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote & On-site",
    href: null,
  },
]

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1
            className="text-5xl md:text-6xl font-sf-display font-bold mb-6 tracking-tighter"
            variants={itemVariants}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground font-sf-text font-semibold max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to transform your business with AI automation? Let's start the conversation.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-3xl font-sf-display font-bold mb-8" variants={itemVariants}>
              Get in Touch
            </motion.h2>

            <motion.div className="space-y-6 mb-12" variants={containerVariants}>
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <info.icon className="h-6 w-6 text-white group-hover:text-gray-300 transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-sf-display font-bold text-foreground mb-1">{info.title}</h3>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-sf-text font-semibold"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <span className="text-muted-foreground font-sf-text font-light">{info.value}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-muted-foreground font-sf-text font-semibold leading-relaxed">
                Whether you're looking to automate your CRM, implement AI voice solutions, or streamline your entire
                operation, our team is here to help. We respond to all inquiries within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={itemVariants}>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-sf-display font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground font-sf-text font-semibold">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Input
                          name="company"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your project and how we can help..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 transition-colors duration-300 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
