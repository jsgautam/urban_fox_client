import CategoryHero from "@/components/products/category-hero";
import ProductFilters from "@/components/products/product-filters";
import ProductGrid from "@/components/products/product-grid";
import { Product } from "@/components/products/product-card";

// Mock Data
const products: Product[] = [
    {
        id: 1,
        title: "Astro-Graphic Hoodie",
        price: 89.99,
        image: "/gallery/wear-waves-2.jpg",
        badge: { text: "New", color: "new" },
    },
    {
        id: 2,
        title: "Midnight Essential Hoodie",
        price: 75.00,
        image: "/looks/urban-explorer.jpg",
    },
    {
        id: 3,
        title: "Urban Sand Hoodie",
        price: 80.00,
        image: "/gallery/wear-waves-1.jpg",
    },
    {
        id: 4,
        title: "Heather Grey Classic",
        price: 64.99,
        originalPrice: 79.99,
        image: "/carousel/summer-edit.jpg",
        badge: { text: "20% OFF", color: "sale" },
    },
    {
        id: 5,
        title: "Aqua-Wave Tech Hoodie",
        price: 95.00,
        image: "/looks/coastal-vibe.jpg",
    },
    {
        id: 6,
        title: "Sunset Orange Pullover",
        price: 82.50,
        image: "/carousel/winter-collection.jpg",
        badge: { text: "Hot", color: "hot" },
    },
];

const categoryInfo: Record<string, { title: string; description: string; image: string }> = {
    "t-shirts": {
        title: "T-Shirts",
        description: "Discover our premium collection of cotton t-shirts. Breathable, durable, and designed for everyday comfort.",
        image: "/carousel/summer-edit.jpg",
    },
    hoodies: {
        title: "Hoodies",
        description: "Our latest collection of hoodies combines premium comfort with street-ready design. Perfect for any adventure.",
        image: "/gallery/wear-waves-2.jpg",
    },
    sweatshirts: {
        title: "Sweatshirts",
        description: "Cozy up in our softest sweatshirts. The perfect layer for those chilly evenings and relaxed weekends.",
        image: "/carousel/winter-collection.jpg",
    },
    jackets: {
        title: "Jackets",
        description: "Brave the elements with our stylish jackets. From lightweight windbreakers to warm winter coats.",
        image: "/looks/urban-explorer.jpg",
    },
    bottoms: {
        title: "Bottoms",
        description: "Complete your look with our versatile bottoms. Joggers, cargos, and shorts for every occasion.",
        image: "/gallery/wear-waves-1.jpg",
    },
    all: {
        title: "Collection",
        description: "Explore our full range of urban streetwear. Designed for those who move with the city.",
        image: "/carousel/summer-edit.jpg",
    },
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const category = (params.category as string) || "all";
    const info = categoryInfo[category] || categoryInfo["all"];

    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50 capitalize">
                        {info.title}
                    </span>
                </div>

                {/* Hero Section */}
                <CategoryHero
                    title={info.title}
                    description={info.description}
                    image={info.image}
                />

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 lg:shrink-0">
                        <div className="sticky top-24">
                            <ProductFilters />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <ProductGrid products={products} />
                </div>
            </div>
        </div>
    );
}
