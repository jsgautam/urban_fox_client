import ProductGallery from "@/components/product-detail/product-gallery";
import ProductInfo from "@/components/product-detail/product-info";
import CompleteLook from "@/components/product-detail/complete-look";
import RelatedProducts from "@/components/product-detail/related-products";

// Mock product data
const productData: Record<string, {
    title: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    images: string[];
}> = {
    "1": {
        title: "The Wave Hoodie",
        price: 79.99,
        rating: 4.5,
        reviews: 128,
        description: "Ride the wave of comfort and style with our signature Wave Hoodie. Made from premium, soft 100% cotton, this hoodie is designed to be your go-to for any adventure. Embroidery adds a touch of playful sophistication.",
        images: [
            "/gallery/wear-waves-2.jpg",
            "/looks/urban-explorer.jpg",
            "/carousel/winter-collection.jpg",
            "/gallery/wear-waves-1.jpg",
        ],
    },
    "2": {
        title: "Urban Explorer Hoodie",
        price: 89.99,
        rating: 4.8,
        reviews: 256,
        description: "Master the elements with this all-in-one look. Engineered for Urban Exploration. Designed for comfort and durability.",
        images: [
            "/looks/urban-explorer.jpg",
            "/gallery/wear-waves-2.jpg",
            "/carousel/summer-edit.jpg",
            "/looks/coastal-vibe.jpg",
        ],
    },
};

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const product = productData[slug] || productData["1"];

    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>Hoodies</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                        {product.title}
                    </span>
                </div>

                {/* Product Section */}
                <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <ProductGallery images={product.images} />
                    <ProductInfo
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        reviews={product.reviews}
                        description={product.description}
                    />
                </div>

                {/* Complete The Look */}
                <div className="mb-16">
                    <CompleteLook />
                </div>

                {/* Related Products */}
                <RelatedProducts />
            </div>
        </div>
    );
}
