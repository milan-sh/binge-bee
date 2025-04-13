import { AppSidebar } from "@/components/shared/AppSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-8 bg-black">
      <AppSidebar />
      <main className="w-full px-4 border border-red-600">
        {children}
      </main>
    </div>
  )
}
