"use client";

import { useState, useEffect } from "react";
import { X, ThumbsUp, Compass, Share2, Gift, Star, Lock, Flame, Bird, Diamond, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RewardsPage() {
    const [streak, setStreak] = useState(7);
    const [progress, setProgress] = useState(2);
    const [claimedRewards, setClaimedRewards] = useState<number[]>([1]);
    const [completedTasks, setCompletedTasks] = useState<number[]>([1]);
    const [showConfetti, setShowConfetti] = useState(false);

    const dailyTasks = [
        { id: 0, icon: ThumbsUp, title: "Like 3 Hoodies", progress: 1, total: 3, color: "bg-yellow-100 text-yellow-600" },
        { id: 1, icon: Compass, title: "Explore Summer", progress: 1, total: 1, color: "bg-primary/10 text-primary" },
        { id: 2, icon: Share2, title: "Share an Item", progress: 0, total: 1, color: "bg-orange-100 text-orange-600" },
    ];

    const rewards = [
        { id: 0, icon: Gift, title: "15% Off Your Next Order", status: "unlocked", color: "bg-primary/10 text-primary" },
        { id: 1, icon: Star, title: "50 Wave Points", status: "claimed", color: "bg-primary/10 text-primary" },
        { id: 2, icon: Lock, title: "Final Reward", status: "locked", subtitle: "Complete all tasks", color: "bg-zinc-100 text-zinc-400" },
    ];

    const badges = [
        { id: 0, icon: Flame, title: "7-Day Streak", unlocked: true, color: "bg-yellow-100 text-yellow-600" },
        { id: 1, icon: Bird, title: "Early Bird", unlocked: true, color: "bg-primary/10 text-primary" },
        { id: 2, icon: Diamond, title: "Top Fan", unlocked: false, color: "bg-zinc-100 text-zinc-300" },
        { id: 3, icon: Users, title: "Socialite", unlocked: false, color: "bg-zinc-100 text-zinc-300" },
        { id: 4, icon: MapPin, title: "Explorer", unlocked: false, color: "bg-zinc-100 text-zinc-300" },
    ];

    const handleClaimReward = (id: number) => {
        if (!claimedRewards.includes(id) && rewards[id].status === "unlocked") {
            setClaimedRewards([...claimedRewards, id]);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);
        }
    };

    const handleCompleteTask = (id: number) => {
        if (!completedTasks.includes(id)) {
            setCompletedTasks([...completedTasks, id]);
            if (dailyTasks[id].progress < dailyTasks[id].total) {
                setProgress(Math.min(3, progress + 1));
            }
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Header with Title */}
                <div className="mb-8 animate-slide-down">
                    <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl">
                        Your Daily Wave Rewards!
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Complete tasks and claim your rewards
                    </p>
                </div>

                {/* Avatar Character */}
                <div className="mb-8 flex justify-center">
                    <div className="relative animate-bounce-slow">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 shadow-lg">
                            <span className="text-6xl">🌊</span>
                        </div>
                        {showConfetti && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-ping text-4xl">✨</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Daily Streak & Progress */}
                <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                Daily Progress
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Daily Streak: <span className="font-bold text-primary">{streak} Days!</span>
                            </p>
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {progress}/3 Milestones Reached
                        </div>
                    </div>
                    <div className="relative h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-orange-600 transition-all duration-1000 ease-out"
                            style={{ width: `${(progress / 3) * 100}%` }}
                        >
                            <div className="absolute right-0 top-0 h-full w-2 animate-pulse bg-white/50" />
                        </div>
                    </div>
                </div>

                {/* Complete Your Dailies */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        Complete Your Dailies
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {dailyTasks.map((task, index) => {
                            const Icon = task.icon;
                            const isCompleted = completedTasks.includes(task.id);
                            return (
                                <div
                                    key={task.id}
                                    className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-full", task.color)}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-zinc-900 dark:text-zinc-50">
                                        {task.title}
                                    </h3>
                                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        Progress: {isCompleted ? task.total : task.progress}/{task.total}
                                    </p>
                                    <Button
                                        onClick={() => handleCompleteTask(task.id)}
                                        disabled={isCompleted}
                                        className={cn(
                                            "w-full rounded-full",
                                            isCompleted
                                                ? "bg-zinc-200 text-zinc-500 dark:bg-zinc-800"
                                                : "bg-primary text-black hover:bg-primary"
                                        )}
                                    >
                                        {isCompleted ? "Completed" : "Go"}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Today's Rewards */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        Today's Rewards
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {rewards.map((reward, index) => {
                            const Icon = reward.icon;
                            const isClaimed = claimedRewards.includes(reward.id);
                            const isLocked = reward.status === "locked";
                            const isUnlocked = reward.status === "unlocked";

                            return (
                                <div
                                    key={reward.id}
                                    className={cn(
                                        "group rounded-2xl border p-6 shadow-sm transition-all",
                                        isLocked
                                            ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                                            : "border-zinc-200 bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900",
                                        isUnlocked && !isClaimed && "animate-pulse-glow"
                                    )}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-full", reward.color)}>
                                        <Icon className={cn("h-8 w-8", isLocked && "animate-wiggle")} />
                                    </div>
                                    <h3 className={cn("mb-2 font-bold", isLocked ? "text-zinc-400" : "text-zinc-900 dark:text-zinc-50")}>
                                        {reward.title}
                                    </h3>
                                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        {isClaimed ? "Claimed!" : reward.subtitle || "Unlocked!"}
                                    </p>
                                    <Button
                                        onClick={() => handleClaimReward(reward.id)}
                                        disabled={isClaimed || isLocked}
                                        className={cn(
                                            "w-full rounded-full transition-all",
                                            isClaimed
                                                ? "bg-zinc-200 text-zinc-500 dark:bg-zinc-800"
                                                : isLocked
                                                    ? "bg-zinc-200 text-zinc-400 dark:bg-zinc-800"
                                                    : "animate-breathing bg-primary text-black hover:scale-105 hover:bg-primary"
                                        )}
                                    >
                                        {isClaimed ? "Claimed" : isLocked ? "Locked" : "Claim Now"}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Badges */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        Badges
                    </h2>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {badges.map((badge, index) => {
                            const Icon = badge.icon;
                            return (
                                <div
                                    key={badge.id}
                                    className={cn(
                                        "group flex shrink-0 flex-col items-center rounded-2xl border p-6 transition-all hover:scale-105",
                                        badge.unlocked
                                            ? "border-zinc-200 bg-white shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                            : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    )}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={cn("mb-3 flex h-16 w-16 items-center justify-center rounded-full", badge.color)}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <p className={cn("text-center text-sm font-medium", badge.unlocked ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400")}>
                                        {badge.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Redeem CTA */}
                <div className="rounded-3xl bg-gradient-to-r from-primary to-orange-600 p-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        Ready to Redeem?
                    </h2>
                    <p className="mb-6 text-lg text-white/90">
                        Use your Wave Points to unlock exclusive rewards and discounts!
                    </p>
                    <Button
                        size="lg"
                        className="animate-breathing rounded-full bg-white text-primary hover:scale-105 hover:bg-zinc-100"
                    >
                        Redeem My Points!
                    </Button>
                </div>
            </div>

            <style jsx global>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(250, 155, 37, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(250, 155, 37, 0.2);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-breathing {
          animation: breathing 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
        </div>
    );
}
