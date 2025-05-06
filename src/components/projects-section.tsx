"use client";

import type React from "react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const projects = [
    {
      title: "Job Scan",
      description:
        "Job Scan is a MERN stack-based web application designed for students and recruiters. Students can register or log in to search for jobs and apply, while recruiters can create accounts to post job listings and manage their postings efficiently.",
      tags: [
        "React",
        "JavaScript",
        "TailwindCSS",
        "Node.js",
        "Express",
        "MongoDB",
      ],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/Job-Scan",
      demo: "https://job-scan-frontend.onrender.com/",
      featured: true,
    },
    {
      title: "Debug-Diaries",
      description:
        "Debug Diaries Debug Diaries is a modern and responsive developer-centric blog platform, designed for sharing insights, solving bugs, and documenting development journeys. With an Appwrite-powered backend, this full-stack app makes it easier than ever to post, explore, and engage with developer blogs.",
      tags: ["React", "Framer Motion", "TailwindCSS", "Appwrite"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/Debug-Diaries",
      demo: "https://debug-diaries.vercel.app",
      featured: false,
    },
    {
      title: "TravelEase",
      description:
        "Tour-Travel is a sleek and user-friendly frontend web application designed to enhance the travel planning experience. Users can effortlessly search for their desired destinations, explore a variety of hotels. With a modern interface and seamless navigation, Tour-Travel aims to make travel discovery and booking both simple and enjoyable.",
      tags: ["Next.js", "Framer Motion", "Stripe", "Supabase"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/Tour-Travel",
      demo: "https://travelease-blue.vercel.app",
      featured: false,
    },
    {
      title: "Tools-Hub-v2",
      description:
        "Tools Hub A collection of powerful and easy-to-use developer and productivity tools built with modern technologies. From image converters to AI-powered generators, Tools Hub makes everyday tasks simple and efficient—all in one place.",
      tags: ["React", "JavaScript", "TailwindCSS", "API"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/Tools-Hub-v2",
      demo: "https://tools-hub-v2.vercel.app",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description:
        "A 3D-styled portfolio website with interactive elements and animations.",
      tags: ["Next.js", "Framer Motion", "TailwindCSS", "CSS 3D"],
      image: "/placeholder.svg?height=600&width=800",
      github: "#",
      demo: "#",
      featured: false,
    },
    {
      title: "Quick Save",
      description:
        "Quick Save is a powerful and intuitive platform that allows users to effortlessly download content from popular social media platforms like Instagram, Facebook, YouTube (including Shorts), and more. Whether it's videos, reels, or short clips, Quick Save makes it easy to save and access your favorite content anytime, anywhere—with just a few clicks.",
      tags: ["React", "Multiple API", "TailwindCSS", "Shadcn"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/video-downloader",
      demo: "https://quick-save-kappa.vercel.app",
      featured: false,
    },
    {
      title: "Finance Management",
      description:
        "Finance Management is a smart and user-friendly platform that helps users take control of their finances. Users can add multiple accounts, record daily transactions, and track their income and expenses with ease. The platform offers features like monthly budget planning, recent transaction tracking, and a visual monthly expense breakdown—empowering users to manage their money more effectively and make informed financial decisions.",
      tags: ["React", "TailwindCSS", "Shadcn", "JavaScript"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com/rajkumarojhaa/Finance1",
      demo: "https://finance1-seven.vercel.app",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github: string;
    demo: string;
    featured: boolean;
  };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  // For smoother animation
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const springRotateX = useSpring(0, springConfig);
  const springRotateY = useSpring(0, springConfig);
  const springScale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    const tiltAmount = 10;
    springRotateX.set(-percentY * tiltAmount);
    springRotateY.set(percentX * tiltAmount);
    springScale.set(1.05);
  };

  const handleMouseLeave = () => {
    springRotateX.set(0);
    springRotateY.set(0);
    springScale.set(1);
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
          },
        },
      }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        className="relative h-full rounded-xl overflow-hidden  bg-white/20 dark:bg-white/5 border border-white/20 shadow-xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={500} // Set a default width
            height={300} // Set a default height
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ transform: "translateZ(0)" }}
            priority={true} // Optional: preload important images
          />

          {project.featured && (
            <div className="absolute top-3 right-3 z-20 flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </div>
          )}
        </div>

        <div className="p-6" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-white/70 text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-500 dark:text-blue-300"
                style={{ transform: "translateZ(30px)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              style={{ transform: "translateZ(40px)" }}
            >
              <Github className="h-4 w-4 mr-1" />
              <span className="text-sm">Code</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              style={{ transform: "translateZ(40px)" }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span className="text-sm">Live Demo</span>
            </a>
          </div>
        </div>

        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl pointer-events-none transition-all duration-500" />

        {/* Glow effect on hover */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
