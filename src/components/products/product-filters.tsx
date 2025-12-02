"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories = [
    { id: "t-shirts", label: "T-Shirts" },
    { id: "hoodies", label: "Hoodies" },
    { id: "sweatshirts", label: "Sweatshirts" },
    { id: "jackets", label: "Jackets" },
    { id: "bottoms", label: "Bottoms" },
];

const colors = [
    { id: "black", class: "bg-black" },
    { id: "white", class: "bg-white border border-zinc-200" },
    { id: "gray", class: "bg-zinc-500" },
    { id: "blue", class: "bg-blue-500" },
    { id: "green", class: "bg-green-500" },
    { id: "red", class: "bg-red-500" },
    { id: "yellow", class: "bg-yellow-400" },
    { id: "purple", class: "bg-purple-500" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductFilters() {
    const [priceRange, setPriceRange] = useState([50, 150]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    return (
        <div className="w-full space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Filters
                </h3>
                <button className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Clear All
                </button>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Categories */}
            <div className="space-y-4">
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex w-full items-center justify-between text-sm font-bold text-zinc-900 dark:text-zinc-50"
                >
                    <span>Categories</span>
                    {isCategoryOpen ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
                {isCategoryOpen && (
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox id={category.id} />
                                <Label
                                    htmlFor={category.id}
                                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                                >
                                    {category.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    Price Range
                </h4>
                <Slider
                    defaultValue={[50, 150]}
                    max={300}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                />
                <div className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Colors */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    Color
                </h4>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            className={`h-8 w-8 rounded-full ${color.class} ring-2 ring-transparent ring-offset-2 transition-all hover:scale-110 hover:ring-zinc-300 focus:outline-none focus:ring-zinc-900 dark:ring-offset-zinc-900 dark:hover:ring-zinc-600 dark:focus:ring-zinc-50`}
                            aria-label={`Select ${color.id} color`}
                        />
                    ))}
                </div>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Sizes */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    Size
                </h4>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className="flex h-10 w-14 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-medium text-zinc-900 transition-all hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-50 dark:hover:bg-zinc-700"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <Button className="w-full rounded-full bg-primary py-6 text-base font-bold text-black hover:bg-primary/90">
                Apply Filters
            </Button>
        </div>
    );
}
