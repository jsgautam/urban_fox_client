"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/product-card";
import { ApiClient } from "@/lib/api-client";
import { mapApiProductToProduct, Product, ApiProduct } from "@/types/product";
import { Sparkles, TrendingUp } from "lucide-react";

interface RelatedProductsProps {
    categoryName?: string;
    currentProductId?: string | number;
}

export default function RelatedProducts({ categoryName, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch products from the same category
                let response = await ApiClient.getProducts(
                    categoryName ? { category: categoryName, limit: 8 } : { limit: 8 }
                );

                // Filter out the current product, then map to UI format
                let mappedProducts = response.products
                    .filter((apiProduct: ApiProduct) => String(apiProduct.id) !== String(currentProductId))
                    .slice(0, 4) // Limit to 4 products
                    .map(mapApiProductToProduct);

                // Fallback: If no products found in category, fetch from all products
                if (mappedProducts.length === 0 && categoryName) {
                    response = await ApiClient.getProducts({ limit: 8 });
                    mappedProducts = response.products
                        .filter((apiProduct: ApiProduct) => String(apiProduct.id) !== String(currentProductId))
                        .slice(0, 4)
                        .map(mapApiProductToProduct);
                }

                setProducts(mappedProducts);
            } catch (err) {
                console.error("Failed to fetch related products:", err);
                setError("Failed to load related products");
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [categoryName, currentProductId]);

    if (loading) {
        return (
            <section className="mb-20">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Trending Now</span>
                        </div>
                        <div className="h-px bg-black/10 flex-1" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">
                        You Might Also Like
                    </h2>
                    <p className="text-black/60 text-sm md:text-base max-w-2xl">
                        Handpicked products from the same collection that match your style.
                    </p>
                </div>

                {/* Loading Skeleton */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100 border border-black/5"></div>
                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
                            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error || products.length === 0) {
        return null;
    }

    return (
        <section className="mb-20">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Trending Now</span>
                    </div>
                    <div className="h-px bg-black/10 flex-1" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">
                    You Might Also Like
                </h2>
                <p className="text-black/60 text-sm md:text-base max-w-2xl">
                    Handpicked products from the same collection that match your style.
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
