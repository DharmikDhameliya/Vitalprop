"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Users, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    icon: Zap,
    title: "CRM Integration",
    description:
      "Seamlessly connect and automate your customer relationship management systems for enhanced efficiency.",
  },
  {
    icon: Users,
    title: "Lead Capture",
    description:
      "Intelligent lead generation and qualification systems that work around the clock to grow your business.",
  },
  {
    icon: Phone,
    title: "AI Voice Caller",
    description: "Advanced AI-powered voice systems that handle customer interactions with human-like conversation.",
  },
  {
    icon: Calendar,
    title: "Appointment Setter",
    description: "Automated scheduling solutions that convert leads into booked appointments effortlessly.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <motion.div
          className="text-center max-w-4xl mx-auto relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-sf-display font-bold mb-6 tracking-tighter text-glow"
            variants={itemVariants}
          >
            Empower Your Business with{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-black">
              AI Automation
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 font-sf-text font-semibold leading-relaxed"
            variants={itemVariants}
          >
            Streamline operations with CRM integration, lead capture, AI voice callers, and appointment setters
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/booking">
              <Button
                size="lg"
                className="btn-sci-fi text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              >
                <span className="relative z-10">Book a Free Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </motion.div>

          {/* Holographic background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] holographic rounded-full blur-3xl opacity-30" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-sf-display font-bold mb-6 tracking-tighter text-glow"
              variants={itemVariants}
            >
              Our Services
            </motion.h2>
            <motion.p className="text-xl text-muted-foreground font-bold" variants={itemVariants}>
              Intelligent automation solutions tailored for your business growth
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="bg-card/50 backdrop-blur-sm neon-border transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden h-full">
                  <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <CardContent className="p-6 text-center relative z-10 flex flex-col h-full">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 glow-cyan">
                        <service.icon className="h-7 w-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground font-semibold leading-relaxed text-sm flex-grow">
                      {service.description}
                    </p>
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
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="neon-border bg-transparent text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 hover:scale-105"
              >
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
