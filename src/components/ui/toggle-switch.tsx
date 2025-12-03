"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
    options: { label: string; value: string }[]
    value: string
    onChange: (value: string) => void
    className?: string
}

export function ToggleSwitch({ options, value, onChange, className }: ToggleSwitchProps) {
    return (
        <div className={cn("flex p-1 bg-muted/50 rounded-full w-full", className)}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        "flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-200",
                        value === option.value
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
