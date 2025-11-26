
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cart Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Your cart is currently empty.</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>$0.00</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Checkout</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
