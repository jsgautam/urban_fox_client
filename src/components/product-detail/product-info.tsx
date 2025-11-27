"use client";

import { useState } from "react";
import { Star, Minus, Plus, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    title: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
}

const colors = [
    { name: "Black", value: "bg-black" },
    { name: "White", value: "bg-white border border-zinc-200" },
    { name: "Navy", value: "bg-blue-900" },
    { name: "Blue", value: "bg-blue-500" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductInfo({
    title,
    price,
    rating,
    reviews,
    description,
}: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
                    {title}
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        ${price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "h-4 w-4",
                                    i < Math.floor(rating)
                                        ? "fill-cyan-400 text-cyan-400"
                                        : "fill-zinc-200 text-zinc-200 dark:fill-zinc-800 dark:text-zinc-800"
                                )}
                            />
                        ))}
                        <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
                            ({reviews} reviews)
                        </span>
                    </div>
                </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    Color: <span className="text-zinc-500 dark:text-zinc-400">{colors[selectedColor].name}</span>
                </span>
                <div className="flex gap-3">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedColor(index)}
                            className={cn(
                                "h-8 w-8 rounded-full ring-2 ring-transparent ring-offset-2 transition-all hover:scale-110 dark:ring-offset-zinc-950",
                                color.value,
                                selectedColor === index && "ring-cyan-400"
                            )}
                            aria-label={`Select ${color.name}`}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Size</span>
                    <button className="flex items-center gap-1 text-xs font-medium text-cyan-500 hover:text-cyan-600">
                        <Ruler className="h-3 w-3" />
                        Size Guide
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "flex h-10 w-12 items-center justify-center rounded-md border text-sm font-medium transition-all",
                                selectedSize === size
                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-600 dark:text-cyan-400"
                                    : "border-zinc-200 bg-transparent text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
                <Button className="h-12 w-full rounded-full bg-cyan-400 text-base font-bold text-black hover:bg-cyan-500">
                    Add to Cart
                </Button>
                <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-zinc-900 text-base font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900"
                >
                    Buy Now
                </Button>
            </div>

            {/* Description */}
            <div className="space-y-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Description</h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>100% Premium Cotton</li>
                    <li>Relaxed, comfortable fit</li>
                    <li>Embroidered wave detail</li>
                    <li>Ribbed cuffs and hem</li>
                </ul>
            </div>
        </div>
    );
}
