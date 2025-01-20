import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface PageTransitionProps {
  isActive: boolean
}

export function PageTransition({ isActive }: PageTransitionProps) {
  return (
    <motion.div
      initial={false}
      animate={isActive ? {
        opacity: [0, 1],
        y: ["100%", "0%"],
      } : {
        opacity: 0,
        y: "100%",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={false}
        animate={isActive ? {
          opacity: 1,
          scale: 1,
        } : {
          opacity: 0,
          scale: 0.9,
        }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut"
        }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <div className="relative w-16 h-16">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold">
          Generating Your Brand Identity
        </h3>
        <p className="text-muted-foreground">
          This may take a moment...
        </p>
      </motion.div>
    </motion.div>
  )
} 