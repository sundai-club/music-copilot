import { MainNav } from "@/components/layout/main-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        {/* Gradient line at the top */}
        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        
        {/* Main header content */}
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
            <MainNav />
          </div>
        </div>
        
        {/* Gradient line at the bottom */}
        <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>
    </header>
  )
} 