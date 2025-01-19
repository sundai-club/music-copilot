import { MainNav } from "@/components/layout/main-nav"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 