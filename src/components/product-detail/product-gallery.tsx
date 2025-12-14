"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative w-full h-full bg-zinc-950">
            {/* Main Full-Screen Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={images[selectedImage]}
                    alt="Product Image"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>

            {/* Cinematic Gradient Overlay (Top) */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            {/* Controls Layer */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button
                    onClick={prevImage}
                    className="pointer-events-auto w-12 h-full hover:bg-black/10 transition-colors flex items-center justify-start group"
                >
                    <div className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white/50 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </div>
                </button>
                <button
                    onClick={nextImage}
                    className="pointer-events-auto w-12 h-full hover:bg-black/10 transition-colors flex items-center justify-end group"
                >
                    <div className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white/50 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </button>
            </div>

            {/* Pagination Indicators - Floating Top Right */}
            <div className="absolute top-8 right-8 z-30 flex gap-1.5 pointer-events-none">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-1 rounded-full transition-all duration-300 backdrop-blur-sm",
                            selectedImage === index
                                ? "w-8 bg-white"
                                : "w-2 bg-white/30"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
