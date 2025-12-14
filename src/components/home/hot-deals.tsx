"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ApiClient } from "@/lib/api-client";
import { ApiProduct } from "@/types/product";

interface DealCategory {
    id: string;
    title: string;
    discount: string;
    image: string;
    imageAlt: string;
    link: string;
}

export default function HotDeals() {
    const [deals, setDeals] = useState<DealCategory[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                setError(null);
                const response = await ApiClient.getProducts({ onSale: true, limit: 50 });
                const categoryMap = new Map<string, ApiProduct[]>();
                response.products.forEach((product: ApiProduct) => {
                    const category = product.category_name || "Other";
                    if (!categoryMap.has(category)) {
                        categoryMap.set(category, []);
                    }
                    categoryMap.get(category)!.push(product);
                });

                const dealCategories: DealCategory[] = Array.from(categoryMap.entries())
                    .slice(0, 6)
                    .map(([categoryName, products], index) => {
                        const avgDiscount = products.reduce((sum, p) =>
                            sum + (p.discount_percentage || 0), 0) / products.length;

                        let imageUrl = "/placeholder-product.jpg";
                        if (products[0].images && products[0].images.length > 0) {
                            const primaryImage = products[0].images.find(img => img.sort_order === 1);
                            if (primaryImage && primaryImage.url) {
                                imageUrl = primaryImage.url;
                            } else if (products[0].images[0] && products[0].images[0].url) {
                                imageUrl = products[0].images[0].url;
                            }
                        }

                        return {
                            id: `${index + 1}`,
                            title: categoryName,
                            discount: avgDiscount > 0
                                ? `${Math.round(avgDiscount)}% OFF`
                                : "SALE",
                            image: imageUrl,
                            imageAlt: `${categoryName} Deal`,
                            link: `/products?category=${categoryName.toLowerCase().replace(/\s+/g, '-')}&sale=true`,
                        };
                    });

                setDeals(dealCategories);
            } catch (err) {
                console.error("Failed to fetch deals:", err);
                setError("Failed to load deals");
            }
        };

        fetchDeals();
    }, []);

    if (error || (deals.length === 0 && !error)) return null;

    return (
        <section className="w-full py-[10px] bg-zinc-50 dark:bg-zinc-950/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <Flame className="w-4 h-4 text-red-600 fill-current animate-pulse" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
                            Steal <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Deals</span>
                        </h2>
                    </div>
                    <Link href="/products?sale=true" className="group flex items-center text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        View All
                        <div className="ml-2 w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-mr-0.5">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {deals.map((deal, i) => (
                        <motion.div
                            key={deal.id}
                            className="relative group overflow-hidden rounded-[1.5rem] h-[280px] bg-zinc-100 dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link href={deal.link} className="block h-full w-full">
                                <Image
                                    src={deal.image}
                                    alt={deal.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 16vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute top-3 right-3 z-10">
                                    <div className="bg-white/95 backdrop-blur-sm text-red-600 font-black text-xs px-2.5 py-1 rounded-md shadow-sm transform group-hover:scale-110 transition-transform">
                                        {deal.discount}
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-lg font-black text-white uppercase italic leading-none mb-1 drop-shadow-md truncate">
                                        {deal.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Shop Now
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
