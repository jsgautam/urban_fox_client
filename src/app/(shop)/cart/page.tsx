"use client";

import Link from "next/link";
import { ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import CartItemCard from "@/components/cart/cart-item-card";
import OrderSummary from "@/components/cart/order-summary";
import CompleteYourLook from "@/components/cart/complete-your-look";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const { cartItems, cartSummary, isLoading, updateQuantity, removeItem } = useCart();

    const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
        await updateQuantity(Number(cartItemId), quantity);
    };

    const handleRemoveItem = async (cartItemId: string) => {
        await removeItem(Number(cartItemId));
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center py-40 space-y-4">
                        <div className="relative">
                            <div className="h-16 w-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <span className="text-muted-foreground font-medium">Loading your selection...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Map API cart items to UI format
    const uiCartItems = cartItems.map((item) => ({
        id: String(item.cart_item_id),
        name: item.product_name,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        image: item.product_image || "/placeholder-product.jpg",
    }));

    // Use totals from API summary
    const subtotal = cartSummary?.subtotal || uiCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 999 ? 0 : 99;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black/50 pb-20">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground md:text-5xl">
                        Your Cart
                    </h1>
                    <p className="mt-2 text-muted-foreground text-lg">
                        {uiCartItems.length} {uiCartItems.length === 1 ? "item" : "items"} ready for checkout
                    </p>
                </div>

                {uiCartItems.length > 0 ? (
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-8">
                            <div className="space-y-4">
                                {uiCartItems.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemove={handleRemoveItem}
                                    />
                                ))}
                            </div>
                            {/* Complete Your Look */}
                            <div className="mt-16">
                                <CompleteYourLook />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <OrderSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    onCheckout={handleCheckout}
                                />
                                <div className="mt-6 flex justify-center gap-4 text-muted-foreground opacity-60 grayscale hover:grayscale-0 transition-all">
                                    {/* Payment Icons Placeholders */}
                                    {/* Can add SVGs here if needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-[2.5rem] bg-white dark:bg-zinc-900 p-12 text-center shadow-soft max-w-2xl mx-auto border border-border/50">
                        <div className="bg-primary/10 p-6 rounded-full mb-6">
                            <ShoppingBag className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-foreground">
                            Your cart feels a bit light
                        </h2>
                        <p className="mb-8 text-muted-foreground max-w-md">
                            There’s nothing in here yet. Discover our new arrivals and find something styled just for you.
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
