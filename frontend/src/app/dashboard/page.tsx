"use client"
import { Header } from "@/components/header"
import { SidebarDashboard } from "@/components/sidebarDashboard"
import { useAuth } from "@/context/authContext"
import { Dashboard } from "@/pages/dashboardPage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



const Home = () => {

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) return router.push('/login')
  }, [user])

  return (

    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-1 mt-10 border-t-2">
        <SidebarDashboard />
        <main className="flex-1 p-4 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default Home
