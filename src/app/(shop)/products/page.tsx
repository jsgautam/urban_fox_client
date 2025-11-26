
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Our Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Placeholder for product list */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Card key={item}>
                        <CardHeader>
                            <div className="aspect-square bg-muted rounded-md mb-2"></div>
                            <CardTitle className="text-lg">Product {item}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">$99.00</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
