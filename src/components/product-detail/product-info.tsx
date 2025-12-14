"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Ruler, Loader2, Minus, Plus, ShoppingBag, Truck, RotateCcw, Flame, Clock, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/hooks/useAuth";

const COLOR_MAP: Record<string, string> = {
    "black": "#000000",
    "white": "#FFFFFF",
    "red": "#EF4444",
    "blue": "#3B82F6",
    "green": "#22C55E",
    "yellow": "#EAB308",
    "purple": "#A855F7",
    "pink": "#EC4899",
    "orange": "#F97316",
    "gray": "#6B7280",
    "grey": "#6B7280",
    "beige": "#F5F5DC",
    "navy": "#1E3A8A",
    "teal": "#14B8A6",
    "maroon": "#800000",
    "brown": "#78350F",
};

interface ProductInfoProps {
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    description: string;
    stock?: number;
    variants?: ProductVariant[];
    productId?: string | number;
}

export default function ProductInfo({
    title,
    price,
    originalPrice,
    rating,
    reviews,
    description,
    stock = 0,
    variants = [],
    productId,
}: ProductInfoProps) {
    const router = useRouter();
    const { user } = useAuth();
    const { addToCart, isLoading: cartLoading } = useCart();

    const [addingToCart, setAddingToCart] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // FOMO States
    const [viewers, setViewers] = useState(12);
    const [timeLeft, setTimeLeft] = useState("");

    // Setup Variants
    const variantColors = Array.from(new Set(variants.filter(v => v.color).map(v => v.color).filter((c): c is string => !!c)));
    const variantSizes = Array.from(new Set(variants.filter(v => v.size).map(v => v.size).filter((s): s is string => !!s)));

    const defaultColors = ["Black", "White", "Navy", "Blue"];
    const defaultSizes = ["S", "M", "L", "XL", "XXL"];

    const availableColors = variantColors.length > 0 ? variantColors : defaultColors;
    const availableSizes = variantSizes.length > 0 ? variantSizes : defaultSizes;

    const [selectedColor, setSelectedColor] = useState(availableColors[0] || "");
    const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");

    // Set defaults
    useEffect(() => {
        if (availableColors.length > 0 && !selectedColor) setSelectedColor(availableColors[0]);
        if (availableSizes.length > 0 && !selectedSize) setSelectedSize(availableSizes[0]);
    }, [variants, availableColors, availableSizes, selectedColor, selectedSize]);


    const selectedVariant = variants.length > 0 ? variants.find(v => v.color === selectedColor && v.size === selectedSize) : undefined;
    const variantStock = selectedVariant?.stock_quantity ?? selectedVariant?.stock ?? stock ?? 0;

    // FOMO Logic: Dynamic Viewers & Timer
    useEffect(() => {
        // Random viewer count between 15 and 45
        // setViewers(Math.floor(Math.random() * (45 - 15 + 1)) + 15); // Replaced by new FOMO logic

        // Simulated FOMO updates
        const interval = setInterval(() => {
            setViewers(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(5, Math.min(50, prev + change));
            });
        }, 5000);
        return () => clearInterval(interval);

        // Timer for "Next Day Delivery" - Removed as per new header
        // const updateTimer = () => {
        //     const now = new Date();
        //     const tomorrow = new Date();
        //     tomorrow.setHours(24, 0, 0, 0);
        //     const diff = tomorrow.getTime() - now.getTime();

        //     const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //     const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        //     const secs = Math.floor((diff % (1000 * 60)) / 1000);

        //     setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
        // };

        // const timer = setInterval(updateTimer, 1000);
        // updateTimer();

        // return () => clearInterval(timer);
    }, []);

    const handleAddToCart = async () => {
        if (!user) return router.push("/login"); // Simplistic auth check

        setAddingToCart(true);
        try {
            const variantId = typeof selectedVariant?.id === "string" ? parseInt(selectedVariant.id, 10) : selectedVariant?.id || 0;
            // Simulated add to cart for demo if no real backend
            await addToCart(variantId, quantity);
            // Successfully added to cart
        } catch (error) {
            console.error("Failed to add to cart:", error);
            // Failed to add to cart
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!user) return router.push("/login");

        setBuyingNow(true);
        try {
            const variantId = typeof selectedVariant?.id === "string" ? parseInt(selectedVariant.id, 10) : selectedVariant?.id || 0;
            const success = await addToCart(variantId, quantity);
            if (success) {
                // Proceeding to checkout
                router.push("/checkout");
            } else {
                console.error("Failed to add to cart for checkout.");
            }
        } catch (error) {
            console.error("Failed to buy now:", error);
            // Failed to buy now
        } finally {
            setBuyingNow(false);
        }
    };

    const isButtonDisabled = variantStock === 0 || addingToCart || buyingNow || cartLoading;

    return (
        <div className="w-full max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-700 fade-in fill-mode-forwards pointer-events-auto">
            <div className="relative overflow-hidden rounded-[2rem] bg-white/80 backdrop-blur-3xl border border-black/10 p-6 md:p-8">

                {/* Glass Shim Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative flex flex-col md:flex-row gap-8 items-end">

                    {/* Left: Info & Variants */}
                    <div className="flex-1 w-full space-y-6">

                        {/* Header: Title & Info Chips */}
                        <div className="space-y-3">
                            {/* Stats Chips Row */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Viewers Chip */}
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 backdrop-blur-md border border-black/10">
                                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                                    <span className="text-xs font-bold text-black/90">{viewers} viewing</span>
                                </div>

                                {/* Rating Chip */}
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 backdrop-blur-md border border-black/10">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-bold text-black/90">{rating}</span>
                                    <span className="text-[10px] text-black/50">({reviews})</span>
                                </div>

                                {/* Low Stock Chip */}
                                {variantStock < 10 && variantStock > 0 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 backdrop-blur-md border border-red-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-xs font-bold text-red-700">Low Stock: {variantStock} left</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-end justify-between">
                                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-black leading-none drop-shadow-sm">
                                    {title}
                                </h1>
                            </div>

                            {/* Price Line - Compact */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl md:text-5xl font-black text-black tracking-tighter drop-shadow-sm">₹{price.toFixed(0)}</span>
                                {originalPrice && (
                                    <>
                                        <span className="text-lg text-black/40 line-through decoration-black/20 font-medium">MRP ₹{originalPrice.toFixed(0)}</span>
                                        <span className="text-xs font-bold text-white bg-black px-2 py-0.5 rounded-full">
                                            SAVE {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Variants - Horizontal Scroll Pill Lists */}
                        <div className="flex flex-col gap-4">
                            {/* Colors */}
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 items-center">
                                <span className="text-xs font-bold text-black/50 uppercase tracking-widest shrink-0 w-12">Color</span>
                                {availableColors.map((color) => {
                                    const isSelected = selectedColor === color;
                                    const hexColor = COLOR_MAP[color.toLowerCase()] || color;
                                    const isWhite = hexColor.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white';

                                    return (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={cn(
                                                "h-10 px-4 rounded-full border flex items-center gap-2 text-xs font-bold transition-all duration-300 shrink-0",
                                                isSelected
                                                    ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] scale-105"
                                                    : "border-black/10 bg-black/5 text-black/60 hover:bg-black/10 hover:border-black/20"
                                            )}
                                        >
                                            <div
                                                className={cn("w-3 h-3 rounded-full shadow-sm", isWhite ? "border border-black/10" : "")}
                                                style={{ backgroundColor: hexColor }}
                                            />
                                            {color}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Sizes */}
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 items-center">
                                <span className="text-xs font-bold text-black/50 uppercase tracking-widest shrink-0 w-12">Size</span>
                                {availableSizes.map((size) => {
                                    const isSelected = selectedSize === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "h-10 min-w-[3rem] px-3 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0",
                                                isSelected
                                                    ? "border-black bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] scale-105"
                                                    : "border-black/10 bg-black/5 text-black/60 hover:bg-black/10 hover:border-black/20"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="w-full md:w-auto md:min-w-[340px] flex flex-col gap-3">

                        {/* Quantity & Add to Cart Row */}
                        <div className="flex items-center gap-3 h-14">
                            {/* Capsule Quantity */}
                            <div className="h-full flex items-center bg-black/5 border border-black/10 rounded-full px-1 backdrop-blur-md shrink-0">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-full flex items-center justify-center text-black/50 hover:text-black transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-black text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-full flex items-center justify-center text-black/50 hover:text-black transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Add to Cart - Primary Action */}
                            <Button
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className="flex-1 h-full rounded-full text-base font-bold bg-white text-black hover:scale-[1.02] hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] border-0"
                            >
                                {addingToCart ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="h-5 w-5" />
                                        <span>Add to Cart</span>
                                    </div>
                                )}
                            </Button>
                        </div>

                        {/* Buy Now - Secondary (Orange) */}
                        <Button
                            onClick={handleBuyNow}
                            disabled={isButtonDisabled}
                            className="w-full h-12 rounded-full text-base font-bold bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:scale-[1.02]"
                        >
                            {buyingNow ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now"}
                        </Button>

                        {/* Micro-indicators - Removed as per new header, now part of chips */}
                        {/* <div className="flex items-center justify-center gap-4 pt-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/40">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {viewers} viewing
                            </div>
                            {variantStock < 10 && variantStock > 0 && (
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-amber-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    Low Stock
                                </div>
                            )}
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    );
}

