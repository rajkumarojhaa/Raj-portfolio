"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { Code, Palette, Zap, Layers, Globe, Cpu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const skills = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Building responsive and performant web applications with React, Next.js, JavaScript and Tailwind CSS",
      color: "blue",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing interfaces with Figma and modern CSS frameworks",
      color: "purple",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Animation & Interaction",
      description: "Crafting smooth animations and micro-interactions with Framer Motion and GSAP",
      color: "pink",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "3D & Creative Coding",
      description: "Developing immersive experiences with Three.js and creative coding techniques",
      color: "cyan",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Ensuring applications work flawlessly across all devices and screen sizes",
      color: "green",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Optimizing web applications for speed, accessibility, and SEO",
      color: "amber",
    },
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.15] bg-grid-pattern"></div>
        <motion.div
          className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.3]) }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.3]) }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              Get to know my background, skills, and approach to creating exceptional digital experiences
            </p>
          </motion.div>

          {/* Bio section with 3D card */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Frontend Developer with a passion for{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500">creative solutions</span>
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-white/80">
                <p>
                I&apos;m a passionate frontend developer with 1+ years of experience creating immersive web experiences. I
                  specialize in building performant, accessible, and visually stunning applications using modern web
                  technologies.
                </p>
                <p>
                  I specialize in building performant, accessible, and visually stunning applications using modern web
                  technologies. My approach combines technical expertise with an eye for design, allowing me to
                  transform complex requirements into elegant solutions.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new design trends, contributing to open-source
                  projects, or sharing knowledge through technical articles and mentorship.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <InteractiveProfileCard />
            </motion.div>
          </div>

          {/* Skills section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
              My Expertise
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  )
}

function InteractiveProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()

  // For smoother animation
  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    setMousePosition({ x: percentX, y: percentY })

    const tiltAmount = 10
    rotateX.set(-percentY * tiltAmount)
    rotateY.set(percentX * tiltAmount)
    scale.set(1.05)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="relative w-full max-w-md mx-auto h-[400px] rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 dark:border-white/10" />

      {/* Profile image */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(20px)" }}>
        <div className="relative w-[70%] h-[80%] rounded-xl overflow-hidden border-2 border-white/30">
          <Image
            src="/rajkumar.png"
            alt="Developer Portrait"
            width={400}
            height={400}
            className="w-full h-full object-fit"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-6 left-6 w-12 h-12 rounded-full bg-blue-400/30 backdrop-blur-md border border-blue-400/30"
        style={{ transform: "translateZ(40px)" }}
        animate={{
          y: [0, -5, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-purple-400/30 backdrop-blur-md border border-purple-400/30"
        style={{ transform: "translateZ(30px)" }}
        animate={{
          y: [0, 8, 0],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <motion.div
        className="absolute top-1/2 right-6 w-10 h-10 rounded-lg bg-pink-400/30 backdrop-blur-md border border-pink-400/30"
        style={{ transform: "translateZ(50px) rotate(45deg)" }}
        animate={{
          y: [0, -8, 0],
          rotate: [45, 60, 45],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold mb-1">Rajkumar Ojha</h3>
        <p className="text-white/80 text-sm mb-2">Frontend Developer & UI Engineer</p>

        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs font-medium border border-blue-500/30">
            1+ Years
          </span>
          <span className="px-2 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-xs font-medium border border-purple-500/30">
            UI Expert
          </span>
        </div>

        <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs mt-1 text-white/70">Frontend Development - 85%</p>
      </div>

      {/* Reflection effect */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50"
        style={{
          transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
    </motion.div>
  )
}

interface SkillCardProps {
  skill: {
    icon: React.ReactNode
    title: string
    description: string
    color: string
  }
  index: number
  isInView: boolean
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
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
    springScale.set(1.05)
  }

  const handleMouseLeave = () => {
    springRotateX.set(0)
    springRotateY.set(0)
    springScale.set(1)
  }

  // Get color classes based on skill color
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      blue: {
        bg: "from-blue-500/20 to-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-500 dark:text-blue-300",
      },
      purple: {
        bg: "from-purple-500/20 to-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-500 dark:text-purple-300",
      },
      pink: {
        bg: "from-pink-500/20 to-pink-600/20",
        border: "border-pink-500/30",
        text: "text-pink-500 dark:text-pink-300",
      },
      cyan: {
        bg: "from-cyan-500/20 to-cyan-600/20",
        border: "border-cyan-500/30",
        text: "text-cyan-500 dark:text-cyan-300",
      },
      green: {
        bg: "from-green-500/20 to-green-600/20",
        border: "border-green-500/30",
        text: "text-green-500 dark:text-green-300",
      },
      amber: {
        bg: "from-amber-500/20 to-amber-600/20",
        border: "border-amber-500/30",
        text: "text-amber-500 dark:text-amber-300",
      },
    }

    return colorMap[color] || colorMap.blue
  }

  const colorClasses = getColorClasses(skill.color)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="p-6 rounded-xl backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses.bg} flex items-center justify-center mb-4 ${colorClasses.text} ${colorClasses.border} border`}
        style={{ transform: "translateZ(20px)" }}
      >
        {skill.icon}
      </div>
      <h3
        className="text-lg font-semibold text-gray-800 dark:text-white mb-2"
        style={{ transform: "translateZ(15px)" }}
      >
        {skill.title}
      </h3>
      <p className="text-gray-600 dark:text-white/70 text-sm" style={{ transform: "translateZ(10px)" }}>
        {skill.description}
      </p>

      {/* Progress bar */}
      <div
        className="mt-4 w-full bg-gray-200/30 dark:bg-white/10 h-1 rounded-full overflow-hidden"
        style={{ transform: "translateZ(10px)" }}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses.bg}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${75 + index * 5}%` } : { width: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Decorative element */}
      <div
        className={`absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br ${colorClasses.bg} opacity-30`}
        style={{ transform: "translateZ(5px)" }}
      />
    </motion.div>
  )
}




