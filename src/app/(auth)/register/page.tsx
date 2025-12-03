"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import { OtpLogin } from "@/components/auth/otp-login"
import { Chrome } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function RegisterPage() {
    const [mode, setMode] = useState<"email" | "phone">("email")
    const router = useRouter()
    const { user, loading } = useAuth()

    // Redirect to profile if already authenticated
    useEffect(() => {
        if (!loading && user) {
            router.push("/profile")
        }
    }, [loading, user, router])

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            router.push("/profile")
        } catch (error) {
            console.error("Error signing in with Google", error)
        }
    }

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-muted/40">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render register form if user is authenticated (will redirect)
    if (user) {
        return null
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        {mode === "email"
                            ? "Create a new account to start shopping."
                            : "Register with your phone number."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {mode === "email" ? (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <Button className="w-full">Create account</Button>
                        </>
                    ) : (
                        <OtpLogin />
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>

                    <Button
                        variant="link"
                        className="w-full"
                        onClick={() => setMode(mode === "email" ? "phone" : "email")}
                    >
                        {mode === "email" ? "Register with Phone" : "Register with Email"}
                    </Button>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-center w-full">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
