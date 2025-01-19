interface PageHeaderProps {
  heading: string
  subheading?: string
  children?: React.ReactNode
}

export function PageHeader({
  heading,
  subheading,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center pb-8">
      <div className="space-y-2 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {heading}
        </h1>
        {subheading && (
          <p className="text-muted-foreground text-lg">
            {subheading}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-4 mt-6">
          {children}
        </div>
      )}
    </div>
  )
} 