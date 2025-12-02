"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "The Summer Edit is Here",
        subtitle: "Discover the latest in classic and on-trend styles in fresh looks, bold statements",
        buttonText: "Shop Now",
        buttonLink: "/products",
        image: "/carousel/summer-edit.jpg",
        imageAlt: "Summer Collection",
    },
    {
        id: 2,
        title: "New Arrivals",
        subtitle: "Explore our latest collection of premium streetwear and casual essentials",
        buttonText: "Explore Now",
        buttonLink: "/products?filter=new",
        image: "/carousel/new-arrivals.jpg",
        imageAlt: "New Arrivals",
    },
    {
        id: 3,
        title: "Winter Collection",
        subtitle: "Stay warm and stylish with our cozy winter essentials",
        buttonText: "Shop Winter",
        buttonLink: "/products?season=winter",
        image: "/carousel/winter-collection.jpg",
        imageAlt: "Winter Collection",
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handlePrevClick = () => {
        setIsAutoPlaying(false);
        prevSlide();
    };

    const handleNextClick = () => {
        setIsAutoPlaying(false);
        nextSlide();
    };

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            {/* Slides Container */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src={slide.image}
                                alt={slide.imageAlt}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            {/* Dark Overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/30" />
                        </div>

                        {/* Content */}
                        <div className="relative flex h-full items-center justify-center px-4 text-center">
                            <div className="max-w-3xl space-y-6">
                                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                                    {slide.title}
                                </h2>
                                <p className="mx-auto max-w-2xl text-base text-white/90 md:text-lg lg:text-xl">
                                    {slide.subtitle}
                                </p>
                                <div className="pt-4">
                                    <a
                                        href={slide.buttonLink}
                                        className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50"
                                    >
                                        {slide.buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrevClick}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-6 md:p-3"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
                onClick={handleNextClick}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-6 md:p-3"
                aria-label="Next slide"
            >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
