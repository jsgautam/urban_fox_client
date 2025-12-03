"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import { OtpLogin } from "@/components/auth/otp-login"
import { Chrome } from "lucide-react"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const [mode, setMode] = useState<"email" | "phone">("phone") // Default to phone as per design
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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render login form if user is authenticated (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-[400px] space-y-8 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        </div>

        <ToggleSwitch
          options={[
            { label: "Phone Number", value: "phone" },
            { label: "Email", value: "email" },
          ]}
          value={mode}
          onChange={(val) => setMode(val as "email" | "phone")}
          className="mb-8"
        />

        <div className="grid gap-6">
          {mode === "email" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-base font-medium">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="h-11 bg-muted/20 border-input/50" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Input id="password" type="password" required className="h-11 bg-muted/20 border-input/50" />
              </div>
              <Button className="w-full h-11 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-medium text-base shadow-md transition-all">
                Sign in
              </Button>
            </>
          ) : (
            <OtpLogin />
          )}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="w-full h-12 rounded-full border-input/50 hover:bg-muted/20" onClick={handleGoogleLogin}>
              <Chrome className="mr-2 h-5 w-5" />
              <span className="text-sm">Login with Gmail</span>
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm text-[#0EA5E9]">
            <Link href="/forgot-password">
              Forgot Password?
            </Link>
            <div className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#0EA5E9] font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
