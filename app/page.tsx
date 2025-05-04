"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Get Things Done with <span className="text-rose-500">Task Manager</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl">
          A minimal, elegant todo app that helps you focus on what matters. Organize your day and stay productive.
        </p>
        <Button
          className="bg-rose-600 hover:bg-rose-700 text-lg px-8 py-6 transition rounded-xl"
          onClick={() => router.push("/todo")}
        >
          Get Started
        </Button>
      </div>
    </main>
  )
}