"use client";

import Image from "next/image";
import Link from "next/link";

export default function RecentOrder() {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Recent Order
                </h2>
                <Link
                    href="/profile/orders"
                    className="text-sm font-medium text-primary hover:text-primary/80"
                >
                    View All
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <Image
                        src="/gallery/wear-waves-2.jpg"
                        alt="Tidal Graphic Hoodie"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                        "Tidal" Graphic Hoodie
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Order #WW-837492
                    </p>
                    <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                        Status: In Transit
                    </p>
                </div>
            </div>
        </div>
    );
}
