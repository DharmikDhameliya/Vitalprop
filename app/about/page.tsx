"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Lightbulb, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "We deliver targeted automation solutions that address your specific business challenges with surgical precision.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying at the forefront of AI technology to provide cutting-edge solutions that give you a competitive advantage.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We work as an extension of your team, ensuring seamless integration and ongoing support for your success.",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1
            className="text-5xl md:text-6xl font-sf-display font-bold mb-6 tracking-tighter"
            variants={itemVariants}
          >
            About Vital Prop
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground font-sf-text font-semibold max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Pioneering the future of business automation through intelligent AI solutions
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 font-light">Team Photo Placeholder</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-sf-display font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground font-sf-text font-semibold leading-relaxed">
              <p>
                Vital Prop was founded with a singular vision: to democratize the power of AI automation for businesses
                of all sizes. We recognized that while AI technology was advancing rapidly, many businesses struggled to
                harness its potential effectively.
              </p>
              <p>
                Our team of AI specialists and automation experts brings decades of combined experience in transforming
                business operations. We've helped companies across industries streamline their processes, reduce costs,
                and accelerate growth through intelligent automation.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible with AI, creating solutions that not only
                automate tasks but truly understand and adapt to your business needs.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800">
            <h3 className="text-3xl md:text-4xl font-sf-display font-bold mb-6">Our Mission</h3>
            <p className="text-xl text-muted-foreground font-sf-text font-semibold max-w-4xl mx-auto leading-relaxed">
              Simplifying business growth through intelligent automation. We believe that every business deserves access
              to cutting-edge AI technology that works seamlessly, scales effortlessly, and delivers measurable results.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-sf-display font-bold text-center mb-12"
            variants={itemVariants}
          >
            Our Values
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-black border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 group h-full">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <value.icon className="h-12 w-12 text-white group-hover:text-gray-300 transition-colors duration-300" />
                    </div>
                    <h4 className="text-xl font-sf-display font-bold mb-4 text-foreground">{value.title}</h4>
                    <p className="text-muted-foreground font-sf-text font-semibold leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          
        </motion.div>
      </div>
    </div>
  )
}
