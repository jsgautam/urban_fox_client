
import { Button } from "@/components/ui/button"

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    return (
        <div className="container mx-auto py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">Product {slug}</h1>
                    <p className="text-2xl font-semibold mb-6">$99.00</p>
                    <p className="text-muted-foreground mb-8">
                        This is a placeholder description for the product. It features high-quality materials and a modern design.
                    </p>
                    <Button size="lg">Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}
