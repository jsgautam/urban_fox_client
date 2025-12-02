"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CompleteLook() {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-teal-900 p-8 md:p-12">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                {/* Content */}
                <div className="max-w-md space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Complete The Look
                    </h2>
                    <p className="text-primary">
                        Our Wave Hoodie pairs perfectly with the Dockside Beanie. Grab both and
                        get 15% off your combo.
                    </p>
                    <Button className="rounded-full bg-primary px-8 py-6 text-base font-bold text-black hover:bg-primary">
                        Shop The Combo
                    </Button>
                </div>

                {/* Visual Combo */}
                <div className="flex items-center gap-4">
                    <div className="relative h-40 w-32 overflow-hidden rounded-xl bg-white p-2 shadow-lg md:h-48 md:w-40">
                        <Image
                            src="/gallery/wear-waves-2.jpg"
                            alt="Main Product"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                        <Plus className="h-6 w-6" />
                    </div>
                    <div className="relative h-40 w-32 overflow-hidden rounded-xl bg-white p-2 shadow-lg md:h-48 md:w-40">
                        <Image
                            src="/looks/urban-explorer.jpg"
                            alt="Complementary Product"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
