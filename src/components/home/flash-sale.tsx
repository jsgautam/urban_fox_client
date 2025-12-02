"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FlashSale() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Countdown timer state
    const [timeLeft, setTimeLeft] = useState({
        days: 8,
        hours: 24,
        minutes: 52,
        seconds: 0,
    });

    // Scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Countdown timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
        >
            <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                    {/* Title */}
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
                        FLASH SALE!
                    </h2>

                    {/* Description */}
                    <p className="mb-6 text-base text-zinc-800 md:text-lg">
                        Get <span className="font-bold">40% OFF EVERYTHING</span> for a limited time. Don't miss out on these deals.
                    </p>

                    {/* Countdown Timer */}
                    <div className="mb-8 flex gap-3 md:gap-4">
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-bold text-zinc-900 shadow-md md:h-14 md:w-14 md:text-2xl">
                                {String(timeLeft.days).padStart(2, "0")}
                            </div>
                            <span className="mt-1 text-xs font-medium text-zinc-700">
                                Days
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-bold text-zinc-900 shadow-md md:h-14 md:w-14 md:text-2xl">
                                {String(timeLeft.hours).padStart(2, "0")}
                            </div>
                            <span className="mt-1 text-xs font-medium text-zinc-700">
                                Hrs
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-bold text-zinc-900 shadow-md md:h-14 md:w-14 md:text-2xl">
                                {String(timeLeft.minutes).padStart(2, "0")}
                            </div>
                            <span className="mt-1 text-xs font-medium text-zinc-700">
                                Min
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-bold text-zinc-900 shadow-md md:h-14 md:w-14 md:text-2xl">
                                {String(timeLeft.seconds).padStart(2, "0")}
                            </div>
                            <span className="mt-1 text-xs font-medium text-zinc-700">
                                Sec
                            </span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href="/products?sale=flash"
                            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-primary/10 hover:shadow-lg"
                        >
                            Grab The Sale
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative flex items-center justify-center">
                    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300 md:h-[400px]">
                        <Image
                            src="/gallery/wear-waves-4.jpg"
                            alt="Flash Sale Product"
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
