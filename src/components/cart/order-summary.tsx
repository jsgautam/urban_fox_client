"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag } from "lucide-react";

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    onCheckout: () => void;
}

export default function OrderSummary({
    subtotal,
    shipping,
    onCheckout,
}: OrderSummaryProps) {
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isApplying, setIsApplying] = useState(false);

    const total = subtotal + shipping - discount;

    const handleApplyCoupon = () => {
        setIsApplying(true);
        // Simulate API call
        setTimeout(() => {
            if (couponCode.toLowerCase() === "wave10") {
                setDiscount(subtotal * 0.1);
            } else {
                setDiscount(0);
            }
            setIsApplying(false);
        }, 800);
    };

    return (
        <div className="rounded-[2rem] border border-border/50 bg-card p-6 shadow-soft md:p-8">
            <h2 className="mb-6 text-xl font-bold text-foreground">
                Order Summary
            </h2>

            <div className="space-y-4">
                {/* Available Coupons */}
                <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex gap-2 items-center text-primary text-sm font-bold mb-1">
                        <Tag className="h-4 w-4" /> Available Offers
                    </div>
                    <p className="text-xs text-muted-foreground">Use code <span className="font-bold text-foreground">WAVE10</span> for 10% off</p>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">
                        ₹{subtotal.toFixed(2)}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium text-primary">
                        {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                    </span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{discount.toFixed(2)}</span>
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-dashed border-border my-4" />

                {/* Total */}
                <div className="flex justify-between items-end mb-6">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground block">Including Taxes</span>
                        <span className="text-2xl font-black text-primary">₹{total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Coupon Code */}
                <div className="space-y-3">
                    <div className="relative">
                        <Input
                            placeholder="Promo Code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="bg-muted/50 border-transparent focus:bg-background pr-20 h-12 rounded-xl"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleApplyCoupon}
                            disabled={!couponCode || isApplying}
                            className="absolute right-1 top-1 h-10 px-4 text-primary hover:text-primary font-bold hover:bg-white shadow-sm rounded-lg"
                        >
                            {isApplying ? "..." : "APPLY"}
                        </Button>
                    </div>
                    {discount > 0 && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <Tag className="h-3 w-3" /> Coupon applied successfully!
                        </p>
                    )}
                </div>

                {/* Checkout Button */}
                <Button
                    onClick={onCheckout}
                    className="w-full mt-4 rounded-full bg-gradient-to-r from-primary to-orange-600 h-14 text-base font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                >
                    Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-[10px] text-center text-muted-foreground pt-2">
                    Secure checkout powered by Razorpay
                </p>
            </div>
        </div>
    );
}
