"use client";

import Image from "next/image";

interface CategoryHeroProps {
    title: string;
    description: string;
    image: string;
}

export default function CategoryHero({
    title,
    description,
    image,
}: CategoryHeroProps) {
    return (
        <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-3xl bg-zinc-900 md:h-[400px]">
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-60"
                priority
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center pt-[100px] px-8 md:px-16">
                <span className="mb-2 text-sm font-bold uppercase tracking-widest text-yellow-400">
                    THE {title} COLLECTION
                </span>
                <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                    Stay Warm in Style.
                </h1>
                <p className="mb-8 max-w-lg text-base text-primary md:text-lg">
                    {description}
                </p>
                <div className="h-1 w-24 rounded-full bg-primary" />
            </div>
        </div>
    );
}
