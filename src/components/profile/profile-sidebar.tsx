"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    Heart,
    MapPin,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/profile" },
    { icon: Package, label: "Order History", href: "/profile/orders" },
    { icon: Heart, label: "Saved Items", href: "/profile/saved" },
    { icon: MapPin, label: "Address Book", href: "/profile/addresses" },
    { icon: Settings, label: "Account Settings", href: "/profile/settings" },
];

export default function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-64 lg:shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                            Alex Johnson
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                            alex.j@email.com
                        </p>
                    </div>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Navigation */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-black"
                                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Logout */}
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-primary/10 dark:text-red-400 dark:hover:bg-red-950/20">
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
