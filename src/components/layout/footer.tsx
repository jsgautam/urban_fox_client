import Link from "next/link"
import { Facebook, Instagram, Twitter, User, CreditCard, Wallet, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const footerLinks = [
    {
        title: "Shop & Discover",
        links: [
            { label: "New Arrivals", href: "#" },
            { label: "Trending Collections", href: "#" },
            { label: "T-Shirts", href: "#" },
            { label: "Hoodies", href: "#" },
            { label: "Sweatshirts", href: "#" },
            { label: "Oversized Collection", href: "#" },
            { label: "Athleisure", href: "#" },
            { label: "Flash Sale", href: "#" },
            { label: "Exclusive Offers", href: "#" },
        ],
    },
    {
        title: "Help & Support",
        links: [
            { label: "FAQ", href: "/faq" },
            { label: "Contact Us", href: "#" },
            { label: "Order History", href: "#" },
            { label: "Returns & Exchanges", href: "#" },
            { label: "Size Guide", href: "#" },
            { label: "Payment Methods", href: "#" },
        ],
    },
    {
        title: "Company & Legal",
        links: [
            { label: "About Us", href: "/about-us" },
            { label: "Our Story", href: "/about-us" },
            { label: "Careers", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Rewards Program", href: "#" },
        ],
    },
]

export function Footer() {
    return (
        <footer className="bg-background pt-16 pb-8 border-t rounded-t-3xl mx-2 mt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-cyan-400" />
                            <span className="text-xl font-bold">Urban Fox</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Ride the Style Wave.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-cyan-400">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-cyan-400">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-cyan-400">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-cyan-400">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Link>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Stay in the loop</h4>
                            <form className="flex w-full space-x-2">
                                <Input
                                    className="flex-1 bg-muted/50 focus-visible:ring-cyan-400"
                                    placeholder="Your email address"
                                    type="email"
                                />
                                <Button className="group bg-cyan-400 text-black hover:bg-cyan-500" type="submit">
                                    Subscribe
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h4 className="text-sm font-semibold">{section.title}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="transition-colors hover:text-cyan-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © 2024 Urban Fox. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            {/* Placeholder icons for payment methods */}
                            <CreditCard className="h-6 w-6" />
                            <Wallet className="h-6 w-6" />
                            <div className="h-6 w-8 rounded bg-muted/50" />
                            <div className="h-6 w-8 rounded bg-cyan-900" />
                        </div>
                        <Select defaultValue="en-usd">
                            <SelectTrigger className="w-[140px] h-8 text-xs focus:ring-cyan-400">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en-usd">English / USD</SelectItem>
                                <SelectItem value="fr-eur">French / EUR</SelectItem>
                                <SelectItem value="de-eur">German / EUR</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </footer>
    )
}
