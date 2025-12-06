"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmail } from "@/lib/authClient"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"

export function EmailLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Authenticate with Firebase - useAuth hook will handle database verification
            await signInWithEmail(email, password)
            // Redirect after successful authentication - useAuth will verify user
            router.push("/profile")
        } catch (err: any) {
            console.error("Error signing in with email:", err)

            // Handle Firebase authentication errors
            if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                setError("Invalid email or password. Please try again.")
            } else if (err.code === "auth/user-not-found") {
                setError("No account found with this email.")
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email address.")
            } else if (err.code === "auth/too-many-requests") {
                setError("Too many failed login attempts. Please try again later.")
            } else {
                setError(err.message || "Failed to sign in. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleEmailLogin} className="grid gap-6">
            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="email" className="text-base font-medium">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="h-11 bg-muted/20 border-input/50"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="h-11 bg-muted/20 border-input/50"
                />
            </div>

            <Button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full h-11 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-medium text-base shadow-md transition-all"
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
        </form>
    )
}
