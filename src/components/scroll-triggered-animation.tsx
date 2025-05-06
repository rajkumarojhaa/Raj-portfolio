"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function ScrollTriggeredAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Always call useTransform unconditionally (React hooks rule)
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.6])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360])
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.1, 0.5])
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.3, 0.7])
  const opacity3 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  if (isMobile) return null

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 backdrop-blur-md"
        style={{
          y,
          rotate,
          scale,
          opacity,
          left: "15%",
        }}
      />

      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-500/30 backdrop-blur-md"
        style={{
          y: y2,
          rotate: rotate2,
          scale: scale2,
          opacity: opacity2,
          right: "20%",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-md"
        style={{
          y: y3,
          rotate: rotate3,
          scale: scale3,
          opacity: opacity3,
          right: "40%",
        }}
      />
    </div>
  )
}
