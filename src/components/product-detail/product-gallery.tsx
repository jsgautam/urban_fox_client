"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Maximize2, Box } from "lucide-react";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={images[selectedImage]}
                    alt="Product Image"
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                />

                {/* Floating Actions */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-50 dark:hover:bg-zinc-900">
                        <Maximize2 className="h-5 w-5" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-zinc-900 dark:bg-zinc-50/80 dark:text-zinc-900 dark:hover:bg-zinc-50">
                        <Box className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative aspect-square overflow-hidden rounded-xl bg-zinc-100 transition-all dark:bg-zinc-800",
                            selectedImage === index
                                ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-950"
                                : "opacity-70 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
