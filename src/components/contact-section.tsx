"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { Github, Linkedin, Mail, Send, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMobile } from "@/hooks/use-mobile"

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <ContactInfoCard />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <ContactForm formState={formState} handleChange={handleChange} handleSubmit={handleSubmit} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactInfoCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // For smoother animation
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const springRotateX = useSpring(0, springConfig)
  const springRotateY = useSpring(0, springConfig)
  const springScale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    const tiltAmount = 5
    springRotateX.set(-percentY * tiltAmount)
    springRotateY.set(percentX * tiltAmount)
    springScale.set(1.02)
  }

  const handleMouseLeave = () => {
    springRotateX.set(0)
    springRotateY.set(0)
    springScale.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="p-6 rounded-xl  bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg h-full"
    >
      <h3
        className="text-xl font-semibold text-gray-800 dark:text-white mb-4"
        style={{ transform: "translateZ(20px)" }}
      >
        Contact Information
      </h3>
      <p className="text-gray-600 dark:text-white/70 mb-6" style={{ transform: "translateZ(15px)" }}>
        Feel free to reach out if  you&#39;re looking for a developer, have a question, or just want to connect.
      </p>

      <div className="space-y-4" style={{ transform: "translateZ(10px)" }}>
        <a
          href="mailto:hello@example.com"
          className="flex items-center text-gray-600 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          <Mail className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-300" />
          <span>rajkumarojha532@gmail.com</span>
        </a>

        <div className="flex space-x-4 pt-4">
          <SocialIcon icon={<Github className="h-5 w-5" />} href="https://github.com/rajkumarojhaa" />
          <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="https://www.linkedin.com/in/rajkumar-ojha-390070216/" />
          
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"
        style={{ transform: "translateZ(5px)" }}
      />
    </motion.div>
  )
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-600 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-white/20 transition-colors relative"
      style={{ transform: "translateZ(25px)" }}
    >
      {icon}
      {isHovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm -z-10"
        />
      )}
    </motion.a>
  )
}

interface ContactFormProps {
  formState: {
    name: string
    email: string
    message: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

function ContactForm({ formState, handleChange, handleSubmit }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const isMobile = useMobile()

  // For smoother animation
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const springRotateX = useSpring(0, springConfig)
  const springRotateY = useSpring(0, springConfig)
  const springScale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current || isMobile) return

    const rect = formRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    const tiltAmount = 5
    springRotateX.set(-percentY * tiltAmount)
    springRotateY.set(percentX * tiltAmount)
    springScale.set(1.02)
  }

  const handleMouseLeave = () => {
    springRotateX.set(0)
    springRotateY.set(0)
    springScale.set(1)
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="p-6 rounded-xl backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg"
    >
      <div className="space-y-4">
        <div style={{ transform: "translateZ(20px)" }}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            placeholder="Your name"
            required
          />
        </div>

        <div style={{ transform: "translateZ(20px)" }}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div style={{ transform: "translateZ(20px)" }}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 min-h-[120px]"
            placeholder="Your message"
            required
          />
        </div>

        <MagneticButton />
      </div>
    </motion.form>
  )
}

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isMobile) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Magnetic effect - pull toward cursor
    setPosition({
      x: distanceX * 0.2,
      y: distanceY * 0.2,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      style={{ transform: "translateZ(30px)" }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Button
        ref={buttonRef}
        type="submit"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
      >
        <span className="relative z-10 flex items-center">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </span>
        <span className="absolute inset-0 bg-white/10 group-hover:opacity-100 opacity-0 transition-opacity" />

        {/* Glow effect */}
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
      </Button>
    </motion.div>
  )
}
