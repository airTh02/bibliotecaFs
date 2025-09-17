"use client"
import { Header } from "@/components/header"
import { SidebarDashboard } from "@/components/sidebarDashboard"
import { Dashboard } from "@/pages/dashboardPage"

const Home = () => {
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
