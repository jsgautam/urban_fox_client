"use client";

import ProductCard, { Product } from "@/components/products/product-card";

const relatedProducts: Product[] = [
    {
        id: 1,
        title: "Ocean Drift Tee",
        price: 34.99,
        image: "/carousel/summer-edit.jpg",
    },
    {
        id: 2,
        title: "Tidal Kicks",
        price: 120.00,
        image: "/looks/coastal-vibe.jpg",
    },
    {
        id: 3,
        title: "Coastal Crewneck",
        price: 65.00,
        image: "/gallery/wear-waves-3.jpg",
    },
    {
        id: 4,
        title: "Dockside Beanie",
        price: 25.00,
        image: "/looks/urban-explorer.jpg",
    },
];

export default function RelatedProducts() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 md:text-3xl">
                You Might Also Like
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
