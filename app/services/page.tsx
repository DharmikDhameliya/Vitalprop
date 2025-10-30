"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, Phone, Calendar, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const services = [
  {
    icon: Zap,
    title: "CRM Integration",
    description:
      "Transform your customer relationship management with intelligent automation that connects all your business systems.",
    features: [
      "Seamless data synchronization",
      "Automated workflow triggers",
      "Real-time analytics dashboard",
      "Custom integration solutions",
    ],
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Advanced lead generation systems that identify, qualify, and nurture prospects automatically.",
    features: [
      "Multi-channel lead tracking",
      "Intelligent lead scoring",
      "Automated follow-up sequences",
      "Conversion optimization",
    ],
  },
  {
    icon: Phone,
    title: "AI Voice Caller",
    description: "Human-like AI voice systems that handle customer interactions with natural conversation flow.",
    features: [
      "Natural language processing",
      "24/7 availability",
      "Call analytics and insights",
      "Custom voice personalities",
    ],
  },
  {
    icon: Calendar,
    title: "Appointment Setter",
    description: "Intelligent scheduling automation that converts leads into confirmed appointments effortlessly.",
    features: [
      "Smart calendar integration",
      "Automated reminders",
      "Timezone optimization",
      "Booking confirmation system",
    ],
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Floating particles */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1
            className="text-5xl md:text-6xl font-sf-display font-bold mb-6 tracking-tighter text-glow"
            variants={itemVariants}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground font-sf-text font-semibold max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Comprehensive AI automation solutions designed to transform your business operations and accelerate growth
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm neon-border transition-all duration-500 hover:scale-[1.02] group h-full relative overflow-hidden">
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 glow-cyan">
                      <service.icon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-sf-display font-bold text-foreground">{service.title}</h3>
                  </div>

                  <p className="text-muted-foreground font-sf-text font-semibold mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full btn-sci-fi transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden">
                    <span className="relative z-10">Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-card/30 backdrop-blur-sm neon-border rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 holographic opacity-10" />
            <div className="relative z-10">
              <h3 className="text-3xl font-sf-display font-bold mb-4 text-glow">Ready to Get Started?</h3>
              <p className="text-muted-foreground font-semibold mb-8 max-w-2xl mx-auto">
                Let's discuss how our AI automation solutions can transform your business operations and drive growth.
              </p>
              <Link href="/booking">
                <Button
                  size="lg"
                  className="btn-sci-fi transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <span className="relative z-10">Schedule a Consultation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
