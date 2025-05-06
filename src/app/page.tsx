"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import CustomCursor from "@/components/custom-cursor"
import { ThemeProvider } from "@/components/themeProvider"
import ScrollProgress from "@/components/scroll-progress"
import ScrollTriggeredAnimation from "@/components/scroll-triggered-animation"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // For parallax scrolling effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
            style={{ y: backgroundY }}
          />
        </div>

        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <ScrollTriggeredAnimation />

        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>
    </ThemeProvider>
  )
}
