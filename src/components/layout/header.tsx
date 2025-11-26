
import Link from "next/link"
import { ShoppingBag, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            URBAN FOX
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Products
                        </Link>
                        <Link href="/products?category=men" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Men
                        </Link>
                        <Link href="/products?category=women" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Women
                        </Link>
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link href="/" className="flex items-center">
                            <span className="font-bold">URBAN FOX</span>
                        </Link>
                        <nav className="mt-8 flex flex-col space-y-4">
                            <Link href="/products" className="text-foreground/60 hover:text-foreground">
                                Products
                            </Link>
                            <Link href="/products?category=men" className="text-foreground/60 hover:text-foreground">
                                Men
                            </Link>
                            <Link href="/products?category=women" className="text-foreground/60 hover:text-foreground">
                                Women
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search placeholder */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        <Link href="/cart">
                            <Button variant="ghost" size="icon">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
