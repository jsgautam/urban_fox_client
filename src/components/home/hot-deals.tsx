"use client";

import Image from "next/image";
import Link from "next/link";

interface DealCategory {
    id: number;
    title: string;
    discount: string;
    image: string;
    imageAlt: string;
    link: string;
}

const deals: DealCategory[] = [
    {
        id: 1,
        title: "ALL T-SHIRTS",
        discount: "30% - 70% OFF",
        image: "/carousel/summer-edit.jpg",
        imageAlt: "T-Shirts Deal",
        link: "/products?category=t-shirts&sale=true",
    },
    {
        id: 2,
        title: "HOODIES",
        discount: "20% - 60% OFF",
        image: "/gallery/wear-waves-2.jpg",
        imageAlt: "Hoodies Deal",
        link: "/products?category=hoodies&sale=true",
    },
    {
        id: 3,
        title: "POLOS",
        discount: "UP TO 50% OFF",
        image: "/carousel/winter-collection.jpg",
        imageAlt: "Polos Deal",
        link: "/products?category=polos&sale=true",
    },
    {
        id: 4,
        title: "BOTTOMWEAR",
        discount: "30% - 60% OFF",
        image: "/gallery/wear-waves-1.jpg",
        imageAlt: "Bottomwear Deal",
        link: "/products?category=bottomwear&sale=true",
    },
    {
        id: 5,
        title: "FOOTWEAR",
        discount: "UP TO 40% OFF",
        image: "/looks/urban-explorer.jpg",
        imageAlt: "Footwear Deal",
        link: "/products?category=footwear&sale=true",
    },
    {
        id: 6,
        title: "ACCESSORIES",
        discount: "20% - 50% OFF",
        image: "/looks/coastal-vibe.jpg",
        imageAlt: "Accessories Deal",
        link: "/products?category=accessories&sale=true",
    },
];

export default function HotDeals() {
    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl lg:text-4xl">
                    SHOP OUR HOT DEALS
                </h2>
            </div>

            {/* Deals Grid */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-6 md:pb-0 scrollbar-hide">
                {deals.map((deal) => (
                    <Link
                        key={deal.id}
                        href={deal.link}
                        className="group relative aspect-[3/4] w-[60%] shrink-0 snap-center overflow-hidden rounded-2xl bg-zinc-900 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] sm:w-[40%] md:w-auto"
                    >
                        {/* Image */}
                        <Image
                            src={deal.image}
                            alt={deal.imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-300 md:text-xs">
                                {deal.title}
                            </h3>
                            <p className="text-lg font-black tracking-tight text-primary md:text-xl">
                                {deal.discount}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
