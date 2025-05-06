"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { GraduationCap, Calendar, Award } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      period: "2015 - 2017",
      description: "Specialized in Human-Computer Interaction and Web Technologies. Graduated with honors.",
      achievements: ["Dean's List", "Best Thesis Award", "Research Publication"],
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      period: "2011 - 2015",
      description:
        "Focused on software development methodologies and user interface design. Participated in multiple hackathons.",
      achievements: ["Cum Laude", "Hackathon Winner", "Student Leadership Award"],
    },
  ]

  return (
    <section id="education" className="py-20 relative">
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
            Education
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item, index) => (
              <EducationCard key={index} education={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface EducationCardProps {
  education: {
    degree: string
    institution: string
    period: string
    description: string
    achievements: string[]
  }
  index: number
}

function EducationCard({ education, index }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  // Define itemVariants within the component
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
    setIsHovered(false)
  }

  return (
    <motion.div
      variants={itemVariants}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="p-6 rounded-xl  bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center mb-4" style={{ transform: "translateZ(20px)" }}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-4 text-blue-500 dark:text-blue-300">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{education.degree}</h3>
          <p className="text-gray-600 dark:text-white/80">{education.institution}</p>
        </div>
      </div>

      <div className="ml-16" style={{ transform: "translateZ(15px)" }}>
        <div className="flex items-center text-sm text-blue-500 dark:text-blue-300 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          {education.period}
        </div>
        <p className="text-gray-600 dark:text-white/70 text-sm mb-4">{education.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-white/90 flex items-center">
            <Award className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-300" />
            Achievements
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-white/70 pl-2">
            {education.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certificate-like embossed effect */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"></div>

      {/* Stamp effect */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center"
        animate={isHovered ? { rotate: 15, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-white/80">
          {index === 0 ? "MSc" : "BSc"}
        </div>
      </motion.div>

      {/* Folded corner effect */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-white/10 transform rotate-0"></div>
    </motion.div>
  )
}
