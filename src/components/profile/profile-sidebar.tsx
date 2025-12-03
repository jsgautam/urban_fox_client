"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { logOut } from "@/lib/authClient";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/profile" },
    { icon: Package, label: "Order History", href: "/profile/orders" },
    { icon: Heart, label: "Saved Items", href: "/profile/saved" },
    { icon: MapPin, label: "Address Book", href: "/profile/addresses" },
    { icon: Settings, label: "Account Settings", href: "/profile/settings" },
];

export default function ProfileSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Get user display name or fallback
    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
    // Get user initials for avatar fallback
    const initials = displayName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <aside className="w-full lg:w-64 lg:shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.photoURL || "/placeholder-avatar.jpg"} alt={displayName} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {initials || <User className="h-6 w-6" />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                            {displayName}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                            {user?.email || user?.phoneNumber || "No contact info"}
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
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-primary/10 dark:text-red-400 dark:hover:bg-red-950/20"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
