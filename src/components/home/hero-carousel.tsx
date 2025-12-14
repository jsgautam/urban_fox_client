"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ApiClient } from "@/lib/api-client";
import { Banner } from "@/types/banner";
import { Button } from "@/components/ui/button";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
}

export default function HeroCarousel() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fetch banners from API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setError(null);
                const response = await ApiClient.getBanners();
                const activeBanners: Slide[] = response.banners
                    .filter((banner: Banner) => banner.is_active)
                    .map((banner: Banner, index: number) => ({
                        id: index + 1,
                        title: banner.title,
                        subtitle: banner.sub_text,
                        buttonText: "Shop Collection",
                        buttonLink: banner.link,
                        image: banner.image,
                        imageAlt: banner.title,
                    }));
                setSlides(activeBanners);
            } catch (err) {
                console.error("Failed to fetch banners:", err);
                setError("Failed to load banners");
            }
        };
        fetchBanners();
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        if (!isAutoPlaying || slides.length === 0) return;
        const interval = setInterval(() => nextSlide(), 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide, slides.length]);

    if (error || (slides.length === 0 && !error)) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center bg-muted/20 rounded-3xl border border-dashed">
                <p className="text-muted-foreground">{error || "No current offers"}</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[110vh] min-h-[700px] overflow-hidden bg-black mx-auto">
            <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={slide.image}
                                alt={slide.imageAlt}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                quality={100}
                                sizes="100vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center text-center p-6 pt-[100px]">
                                <div className="max-w-4xl space-y-8">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white"
                                    >
                                        {slide.title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="text-base md:text-xl text-neutral-200 max-w-xl mx-auto font-light leading-relaxed"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        <Link href={slide.buttonLink || "/products"}>
                                            <span className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-primary to-orange-600 text-white rounded-full font-bold text-base shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer">
                                                <span className="relative z-10 drop-shadow-sm">Grab Now</span>
                                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform drop-shadow-sm" />
                                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-12 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={() => { setIsAutoPlaying(false); prevSlide(); }}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
}
