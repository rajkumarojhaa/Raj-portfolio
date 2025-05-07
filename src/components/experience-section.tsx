"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { Calendar, Building, MapPin } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isMobile = useMobile()

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

  const experiences = [
    {
      company: "Mavenai Technologies",
      position: "Frontend Developer Intern",
      period: "March 2025 - Present",
      location: "Remote",
      description:
        "  I focus on building responsive and interactive user interfaces using React.js and Tailwind CSS. I translate design mockups into functional components, optimize performance, and ensure cross-browser compatibility. I collaborate closely with backend developers and designers to deliver seamless user experiences across various web applications.",
      technologies: ["React","JavaScript","Tailwind CSS", "Shadcn", "Figma"],
    },
    {
      company: "Techsimplus",
      position: "Fullstack Developer",
      period: "July 2024 - December 2024",
      location: "Bhopal",
      description:
        " I worked as a Full Stack Developer Intern where I contributed to building scalable web applications using the MERN stack. I was responsible for developing dynamic frontend components with React and Tailwind CSS, implementing backend APIs using Node.js and Express, and managing data with MongoDB. I collaborated closely with the design and product teams to deliver responsive, user-friendly interfaces and ensure seamless functionality across the platform.",
      technologies: ["React","JavaScript","Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
    {
      company: "LevelUP Technologies",
      position: "Web Developer Intern",
      period: "Jun 2024 - Aug 2024",
      location: "Remote",
      description:
        " I work as a React Web Developer Intern, contributing to the development of a Learning Management System (LMS). I am responsible for designing and implementing a fully responsive admin panel using React and Tailwind CSS.",
      technologies: ["React", "JavaScript", "TailwindCSS", "Figma", "Shadcn"],
    }
  ]

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Work Experience
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            {!isMobile && (
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 transform md:translate-x-px"></div>
            )}

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <TimelineItem key={index} experience={experience} index={index} isEven={index % 2 === 0} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  experience: {
    company: string
    position: string
    period: string
    location: string
    description: string
    technologies: string[]
  }
  index: number
  isEven: boolean
}

function TimelineItem({ experience, index, isEven }: TimelineItemProps) {
  const [isHovered, setIsHovered] = useState(false)
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
    setIsHovered(false)
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: isMobile ? 0 : isEven ? -20 : 20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
          },
        },
      }}
      className={`relative flex flex-col ${isMobile ? "" : `md:flex-row ${isEven ? "md:flex-row-reverse" : ""}`}`}
    >
      {/* Timeline dot */}
      {!isMobile && (
        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-1/2 md:-translate-x-3 z-10"></div>
      )}

      {/* Content */}
      <div
        className={`w-full ${isMobile ? "" : `md:w-1/2 ${isEven ? "md:pl-0 md:pr-8" : "md:pl-8 md:pr-0"}`} ${isMobile ? "" : "pl-8"}`}
      >
        <motion.div
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
          className="p-6 rounded-xl  bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg"
        >
          <div className="flex items-center mb-2" style={{ transform: "translateZ(20px)" }}>
            <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-300 mr-2" />
            <span className="text-sm text-blue-500 dark:text-blue-300">{experience.period}</span>
          </div>

          <h3
            className="text-xl font-semibold text-gray-800 dark:text-white mb-1"
            style={{ transform: "translateZ(25px)" }}
          >
            {experience.position}
          </h3>

          <div className="flex items-center mb-3" style={{ transform: "translateZ(20px)" }}>
            <Building className="h-4 w-4 text-gray-500 dark:text-white/60 mr-2" />
            <h4 className="text-lg text-gray-600 dark:text-white/80">{experience.company}</h4>
          </div>

          <div className="flex items-center mb-3" style={{ transform: "translateZ(15px)" }}>
            <MapPin className="h-4 w-4 text-gray-500 dark:text-white/60 mr-2" />
            <span className="text-sm text-gray-500 dark:text-white/60">{experience.location}</span>
          </div>

          <p className="text-gray-600 dark:text-white/70 text-sm mb-4" style={{ transform: "translateZ(10px)" }}>
            {experience.description}
          </p>

          <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(15px)" }}>
            {experience.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-500 dark:text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 3D floating element */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-lg"
            animate={isHovered ? { scale: 1.2, opacity: 0.8 } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
