"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const sortOptions = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductSort() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "newest";

    const handleSortChange = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === "newest") {
                params.delete("sort");
            } else {
                params.set("sort", value);
            }

            const queryString = params.toString();
            router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
        },
        [searchParams, pathname, router]
    );

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">Sort by</span>
            <Select value={currentSort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] rounded-xl border-border bg-background hover:bg-muted/50 transition-colors">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border shadow-soft">
                    {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="focus:bg-primary/10 focus:text-primary rounded-lg my-1 cursor-pointer">
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
