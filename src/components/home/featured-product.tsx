"use client";

import Image from "next/image";
import Link from "next/link";

interface FeaturedProductProps {
    badge?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
    backgroundColor?: string;
}

export default function FeaturedProduct({
    badge = "NEW DROP",
    title = "The Wave Hoodie",
    description = "Experience ultimate comfort and style with our new oversized Wave Hoodie. Made from 100% premium cotton, it's perfect for any occasion. Limited stock available.",
    buttonText = "Explore The Collection",
    buttonLink = "/products?collection=wave-hoodie",
    image = "/gallery/wear-waves-4.jpg",
    imageAlt = "The Wave Hoodie",
    backgroundColor = "bg-zinc-50",
}: Partial<FeaturedProductProps> = {}) {
    return (
        <section className={`w-full overflow-hidden rounded-2xl ${backgroundColor} shadow-lg`}>
            <div className="grid gap-8 md:grid-cols-2 md:gap-0">
                {/* Left Content */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black">
                            {badge}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-6xl">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="mb-8 max-w-md text-base leading-relaxed text-zinc-600 dark:text-primary md:text-lg">
                        {description}
                    </p>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href={buttonLink}
                            className="inline-block rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative h-[400px] md:h-full md:min-h-[500px]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300" />
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-contain p-8 md:p-12"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
