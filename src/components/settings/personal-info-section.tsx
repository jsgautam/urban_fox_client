"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PersonalInfoSectionProps {
    initialData?: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
}

export default function PersonalInfoSection({
    initialData = {
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
    },
}: PersonalInfoSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleSave = () => {
        // In a real app, this would save to backend
        console.log("Saving personal info:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(initialData);
        setIsEditing(false);
    };

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <User className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Personal Information
                </h2>
            </div>

            {/* Form */}
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                            disabled={!isEditing}
                            className={!isEditing ? "bg-zinc-50 dark:bg-zinc-800" : ""}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                            }
                            disabled={!isEditing}
                            className={!isEditing ? "bg-zinc-50 dark:bg-zinc-800" : ""}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className={!isEditing ? "bg-zinc-50 dark:bg-zinc-800" : ""}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className={!isEditing ? "bg-zinc-50 dark:bg-zinc-800" : ""}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    {isEditing ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className="rounded-full"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="rounded-full bg-primary text-black hover:bg-primary"
                            >
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                            className="rounded-full"
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
