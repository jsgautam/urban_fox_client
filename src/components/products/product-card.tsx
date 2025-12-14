"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative block h-full">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Product Image */}
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Badge */}
                {product.badge && (
                    <div
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${product.badge.color === "new"
                            ? "bg-black text-white"
                            : product.badge.color === "sale"
                                ? "bg-primary text-black"
                                : "bg-red-500 text-white"
                            }`}
                    >
                        {product.badge.text}
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-zinc-900 shadow-sm transition-all duration-300 hover:bg-primary hover:scale-110 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                    <Heart className="h-5 w-5" />
                </button>

                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button className="w-full rounded-xl bg-white/90 text-black hover:bg-white backdrop-blur-md shadow-lg font-semibold h-11">
                        <ShoppingBag className="mr-2 h-4 w-4" /> Quick Add
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-1 px-2">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-bold text-foreground line-clamp-1 hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                        ₹{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                            ₹{product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
