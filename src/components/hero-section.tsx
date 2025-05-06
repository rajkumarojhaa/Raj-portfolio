"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  Download,
  ChevronRight,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  // For parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse position for gradient movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: clientX / innerWidth,
      y: clientY / innerHeight,
    });
  };

  // Smooth spring animation for mouse position
  const mouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  // Dynamic gradient based on mouse position
  const background = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, 
      rgba(59, 130, 246, 0.15) 0%, 
      rgba(147, 51, 234, 0.15) 25%, 
      rgba(0, 0, 0, 0) 50%
    )
  `;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Interactive background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.15] bg-grid-pattern"></div>
      </div>

      {/* Animated particles */}
      <EnhancedParticles />

      {/* Main content */}
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Text content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          style={{ y, opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-300 text-sm font-medium">
              Frontend Developer & UI Engineer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight"
          >
            Creating{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600">
              digital
            </span>{" "}
            experiences that{" "}
            <span className="text-gradient bg-gradient-to-r from-purple-500 to-pink-500">
              inspire
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-xl"
          >
            I specialize in crafting immersive, responsive, and performant web
            applications with modern technologies and thoughtful design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Explore My Work
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/40 transition-all duration-300"
            >
              <a href="/My New Resume.pdf" download>
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-6 pt-4"
          >
            <SocialIcon
              icon={<Github className="h-5 w-5" />}
              href="https://github.com/rajkumarojhaa"
              label="GitHub"
            />
            <SocialIcon
              icon={<Linkedin className="h-5 w-5" />}
              href="https://www.linkedin.com/in/rajkumar-ojha-390070216/"
              label="LinkedIn"
            />
            {/* <SocialIcon
              icon={<Twitter className="h-5 w-5" />}
              href="#"
              label="Twitter"
            /> */}
          </motion.div>
        </motion.div>

        {/* Right side - 3D Profile */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <HeroProfile />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
        }}
      >
        <ArrowDown className="h-6 w-6 text-gray-400 dark:text-white/50" />
      </motion.div>
    </motion.section>
  );
}

function SocialIcon({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ y: -3, scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-300 hover:border-blue-500/50 dark:hover:border-blue-300/50 transition-colors relative"
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
  );
}

function HeroProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  // For smoother animation
  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    if (isMobile) {
      // For mobile, use device orientation if available
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.beta === null || e.gamma === null) return;

        const beta = Math.min(Math.max(e.beta - 40, -20), 20);
        const gamma = Math.min(Math.max(e.gamma, -20), 20);

        rotateX.set(beta / 2);
        rotateY.set(-gamma / 2);
      };

      window.addEventListener("deviceorientation", handleOrientation);
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation);
    } else {
      // For desktop, track mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);

        

        rotateX.set(percentY * -10);
        rotateY.set(percentX * 10);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile, rotateX, rotateY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-72 h-72 md:w-96 md:h-96"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute -top-10 -left-10 w-20 h-20 rounded-xl bg-blue-500/20 backdrop-blur-md border border-blue-500/30"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
        animate={{
          rotate: [0, 10, 0],
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
        animate={{
          rotate: [0, -15, 0],
          y: [0, 10, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-1/2 -right-8 w-12 h-12 rounded-lg bg-pink-500/20 backdrop-blur-md border border-pink-500/30"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px) rotate(45deg)",
        }}
        animate={{
          rotate: [45, 60, 45],
          y: [0, -5, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Main profile container */}
      <motion.div
        className="relative z-10 w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-xl"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        {/* Profile image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/raj.png?height=400&width=400"
            alt="Developer Portrait"
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
          <motion.h3
            className="text-2xl font-bold mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Rajkumar Ojha
          </motion.h3>
          <motion.p
            className="text-white/80 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Frontend Developer & UI Engineer
          </motion.p>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="px-2 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs font-medium border border-blue-500/30">
              Reactjs
            </span>
            <span className="px-2 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-xs font-medium border border-purple-500/30">
              Tailwind CSS
            </span>
            <span className="px-2 py-1 bg-pink-500/30 backdrop-blur-sm rounded-full text-xs font-medium border border-pink-500/30">
              JavaScript
            </span>
          </motion.div>
        </div>

        {/* Animated highlight effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function EnhancedParticles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: "blur(1px)",
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
