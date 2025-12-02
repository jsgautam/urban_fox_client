"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalInfo() {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Personal Information
                </h2>
                <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                    Edit
                </Button>
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            defaultValue="Alex Johnson"
                            disabled
                            className="bg-zinc-50 dark:bg-zinc-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="alex.j@email.com"
                            disabled
                            className="bg-zinc-50 dark:bg-zinc-800"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        defaultValue="(***) ***-1234"
                        disabled
                        className="bg-zinc-50 dark:bg-zinc-800"
                    />
                </div>
            </div>
        </div>
    );
}
