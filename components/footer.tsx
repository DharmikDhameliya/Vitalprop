"use client"

import Link from "next/link"
import { Mail, Phone, Twitter, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "CRM Integration", href: "/services" },
      { name: "Lead Capture", href: "/services" },
      { name: "AI Voice Caller", href: "/services" },
      { name: "Appointment Setter", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Book Consultation", href: "/booking" },
    ],
  },
]

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/vitalprop", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/vitalprop", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-cyan-500/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-orbitron font-bold brand-text">Vital Prop</span>
            </Link>
            <p className="text-muted-foreground font-sf-text font-semibold mb-6 max-w-md leading-relaxed">
              Empowering businesses with intelligent AI automation solutions. Streamline operations, capture leads, and
              accelerate growth with our cutting-edge technology.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground hover:text-cyan-300 transition-colors duration-300">
                <Mail className="h-4 w-4 mr-3 text-cyan-400" />
                <a href="mailto:hello@vitalprop.com" className="font-sf-text font-semibold">
                  hello@vitalprop.com
                </a>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-cyan-300 transition-colors duration-300">
                <Phone className="h-4 w-4 mr-3 text-cyan-400" />
                <a href="tel:+15551234567" className="font-light">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-cyan-400 font-sf-display font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-cyan-300 transition-colors duration-300 font-sf-text font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-cyan-500/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground font-sf-text font-semibold text-sm mb-4 md:mb-0">
            © 2025 Vital Prop. All rights reserved.
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-cyan-300 transition-all duration-300 hover:scale-110 p-2 rounded-full neon-border bg-card/30 backdrop-blur-sm glow-cyan"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
