"use client"
import { Header } from "@/components/header"
import { SidebarDashboard } from "@/components/sidebarDashboard"
import { useAuth } from "@/context/authContext"
import { Dashboard } from "@/pages/dashboardPage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const Home = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log(loading)
    console.log(user)
    if (loading == false) {
       if(user == null) return router.push('/login')
    }
  }, [user, loading])

  const handleInteractionSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }


  return (
    <div className="flex h-screen bg-gray-900">
      <div className={`transtion-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-[15%]' : 'w-0' }  `}>
        <SidebarDashboard />
      </div>
      <div className={`flex flex-col flex-1 ? 'w-[70%]' `}>
        <div className="w-full">
          <Header
            handleOpeningSidebar={handleInteractionSidebar}
          />
        </div>

        <main className="flex-1 p-4 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default Home
