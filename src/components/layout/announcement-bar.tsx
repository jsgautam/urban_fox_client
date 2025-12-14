"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="relative z-50 bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 text-white overflow-hidden"
            >
                {/* Abstract shapes for "cool gradient" effect */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
                    <div className="absolute top-0 right-20 w-60 h-60 bg-purple-500/10 blur-3xl rounded-full" />
                </div>

                <div className="container mx-auto px-4 h-10 md:h-12 flex items-center justify-between text-xs md:text-sm font-medium relative z-10">
                    <div className="hidden md:flex flex-1" /> {/* Spacer */}

                    <div className="flex items-center gap-2 md:gap-3 flex-1 justify-center whitespace-nowrap">
                        <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary fill-primary animate-pulse" />
                        <span>
                            Limited Time: <span className="font-bold text-primary">Free Shipping</span> on orders over ₹999!
                        </span>
                        <Link href="/products" className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors underline decoration-primary/50 underline-offset-4">
                            Shop Now <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Close announcement"
                        >
                            <X className="w-3 h-3 md:w-4 md:h-4 opacity-70 hover:opacity-100" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
