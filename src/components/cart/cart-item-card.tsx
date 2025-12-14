"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";

interface CartItemCardProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItemCard({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemCardProps) {
    return (
        <div className="flex gap-4 rounded-[1.5rem] border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md md:p-5">
            {/* Product Image */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted md:h-32 md:w-32">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1">
                            {item.name}
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:bg-red-50 hover:text-red-600 -mr-2 -mt-2"
                            onClick={() => onRemove(item.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground font-medium">
                        <span className="bg-muted px-2 py-0.5 rounded-md text-xs">{item.size}</span>
                        <span className="bg-muted px-2 py-0.5 rounded-md text-xs">{item.color}</span>
                    </div>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-end justify-between mt-2">
                    <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-full border border-border/50">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-white dark:hover:bg-zinc-800"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-white dark:hover:bg-zinc-800"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="text-lg font-bold text-primary">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
