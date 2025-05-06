"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = useMobile()

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const trailX = useSpring(0, { stiffness: 100, damping: 25, mass: 1 })
  const trailY = useSpring(0, { stiffness: 100, damping: 25, mass: 1 })

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isMobile, cursorX, cursorY, trailX, trailY])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm z-50 pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-40 pointer-events-none filter blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.2 : 1,
        }}
      />
    </>
  )
}
