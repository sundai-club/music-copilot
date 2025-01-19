import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen animated-gradient-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: "0s" }} />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: "-2s" }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary/10 rounded-full blur-2xl floating-animation" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Hero Section with Visual */}
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12 relative">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
            AI-Powered Music Marketing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent animate-in fade-in duration-1000">
            Turn Your Music Into a Chart-Topping Brand in Minutes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Join 50,000+ artists using AI-driven insights to skyrocket their streams and build a loyal fanbase. No marketing experience needed.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: "200ms" }}>
            <Link
              href="/setup"
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 glow-effect"
            >
              Start Free Trial
            </Link>
            <Link
              href="/branding"
              className="px-8 py-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              See Success Stories
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            No credit card required • Set up in 2 minutes • Cancel anytime
          </div>
        </div>
        {/* Hero Visual */}
        <div className="flex-1 relative h-[400px] w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Animated Waveform */}
              <g className="animate-pulse">
                {Array.from({ length: 40 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 20}
                    y={200 - Math.abs(Math.sin(i * 0.2)) * 100}
                    width="4"
                    height={Math.abs(Math.sin(i * 0.2)) * 200}
                    className="fill-primary/20"
                    rx="2"
                  />
                ))}
              </g>
              {/* Analytics Overlay */}
              <g className="translate-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${350 - i * 50} L 800 ${350 - i * 50}`}
                    className="stroke-primary/10"
                    strokeDasharray="4 4"
                  />
                ))}
                <path
                  d={`M 0 350 Q 200 100 400 200 T 800 50`}
                  className="stroke-primary/50 fill-none"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50K+", label: "Artists Served" },
            { number: "85%", label: "Growth Rate" },
            { number: "2M+", label: "Songs Analyzed" },
            { number: "24/7", label: "AI Support" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur border border-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section with Visual Elements */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Everything you need to transform your music into a professional brand, backed by data-driven insights
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              ),
              title: "AI-Generated Brand Narratives",
              description: "Personalize your story and create a unique brand identity."
            },
            {
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: "Custom Visual Guidelines",
              description: "Unique palettes and typography tailored to your style."
            },
            {
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              ),
              title: "Social Media Strategies",
              description: "Captions, hashtags, and engagement tips for growth."
            },
            {
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Audience Insights",
              description: "Demographic and engagement analysis for better targeting."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 rounded-2xl bg-card/50 backdrop-blur border border-primary/10 space-y-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Success Story */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="rounded-3xl bg-card/50 backdrop-blur border border-primary/10 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Success Story
              </div>
              <h3 className="text-2xl font-bold">From Unknown to 1M+ Monthly Listeners</h3>
              <p className="text-muted-foreground">
                &ldquo;Using the AI branding tools and analytics, I went from 1,000 to over 1 million monthly listeners in just 6 months. The platform showed me exactly who my audience was and how to connect with them.&rdquo;
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">Independent Artist • Los Angeles</div>
                </div>
              </div>
            </div>
            <div className="relative h-[300px]">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Grid Lines */}
                <g className="stroke-muted-foreground/20">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <path
                      key={`h-${i}`}
                      d={`M 0 ${i * 50} L 400 ${i * 50}`}
                      strokeDasharray="4 4"
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <path
                      key={`v-${i}`}
                      d={`M ${i * 50} 0 L ${i * 50} 300`}
                      strokeDasharray="4 4"
                    />
                  ))}
                </g>
                {/* Growth Line */}
                <path
                  d="M 0 280 C 100 250, 200 150, 300 50 Q 350 20, 400 10"
                  className="stroke-primary"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Area under the curve */}
                <path
                  d="M 0 280 C 100 250, 200 150, 300 50 Q 350 20, 400 10 L 400 300 L 0 300 Z"
                  className="fill-primary/10"
                />
                {/* Data Points */}
                {[
                  { x: 0, y: 280 },
                  { x: 100, y: 250 },
                  { x: 200, y: 150 },
                  { x: 300, y: 50 },
                  { x: 400, y: 10 }
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    className="fill-primary"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section with Icons */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4">Why Artists Choose Us</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Skip years of trial and error. Get everything you need to succeed in today&apos;s music industry.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "30-Second Setup",
              description: "Connect your streaming accounts and get personalized insights instantly."
            },
            {
              title: "Save 20+ Hours/Week",
              description: "Automate your branding and marketing tasks with AI assistance."
            },
            {
              title: "Data-Backed Results",
              description: "85% of our artists see streaming growth within 30 days."
            },
            {
              title: "Risk-Free Trial",
              description: "Try all features free for 14 days. Cancel anytime."
            }
          ].map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-primary/10 space-y-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section with Visual Background */}
      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-12 relative">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent rounded-3xl" />
          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to help music artists of all levels unlock their full potential by simplifying the branding process and providing actionable, data-driven strategies. We bridge the gap between creativity and audience connection, enabling artists to focus on what matters most for them: creating extraordinary music.
            </p>
          </div>
          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold">Our Promise</h2>
            <p className="text-lg text-muted-foreground">
              We empower artists to transform their music into a compelling, professional brand that connects them with audiences worldwide. Using AI-driven insights and tools, we make branding intuitive, fast, and completely tailored to your unique sound and style.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-8">
          <h3 className="text-xl font-semibold text-muted-foreground">Trusted by Artists on</h3>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {/* Spotify */}
            <svg className="w-32 h-10 text-muted-foreground/50 hover:text-primary transition-colors" viewBox="0 0 2931 882" fill="currentColor">
              <path d="M1423.3 598.6c-115.7 0-209.5-93.8-209.5-209.5 0-115.7 93.8-209.5 209.5-209.5 115.7 0 209.5 93.8 209.5 209.5 0 115.7-93.8 209.5-209.5 209.5m0-375.2c-91.3 0-165.7 74.4-165.7 165.7s74.4 165.7 165.7 165.7 165.7-74.4 165.7-165.7-74.4-165.7-165.7-165.7m382.8 364.9c-84.9 0-154.1-69.2-154.1-154.1s69.2-154.1 154.1-154.1c84.9 0 154.1 69.2 154.1 154.1s-69.2 154.1-154.1 154.1m0-264.3c-60.5 0-110.2 49.7-110.2 110.2s49.7 110.2 110.2 110.2 110.2-49.7 110.2-110.2-49.7-110.2-110.2-110.2m382.8 264.3c-84.9 0-154.1-69.2-154.1-154.1s69.2-154.1 154.1-154.1c84.9 0 154.1 69.2 154.1 154.1s-69.2 154.1-154.1 154.1m0-264.3c-60.5 0-110.2 49.7-110.2 110.2s49.7 110.2 110.2 110.2 110.2-49.7 110.2-110.2-49.7-110.2-110.2-110.2m382.8 264.3c-84.9 0-154.1-69.2-154.1-154.1s69.2-154.1 154.1-154.1c84.9 0 154.1 69.2 154.1 154.1s-69.2 154.1-154.1 154.1m0-264.3c-60.5 0-110.2 49.7-110.2 110.2s49.7 110.2 110.2 110.2 110.2-49.7 110.2-110.2-49.7-110.2-110.2-110.2"/>
            </svg>
            {/* Apple Music */}
            <svg className="w-32 h-10 text-muted-foreground/50 hover:text-primary transition-colors" viewBox="0 0 88 22" fill="currentColor">
              <path d="M8.2 5.7c.3-.9 1.1-1.4 2.1-1.4s1.8.5 2.1 1.4l4.8 13.9h-2.3L13.3 15H7.3l-1.6 4.6H3.4L8.2 5.7zm-1.8 7.3h5.8L9.3 6.9 6.4 13zm16.3-8.7h2.1v16h-2.1v-16zm10.5 16.3c-2.3 0-3.7-1.6-3.7-4.1V8.4h2.1v8c0 1.7.8 2.7 2.2 2.7 1.4 0 2.4-.9 2.4-2.7v-8h2.1v8.1c0 2.5-1.4 4.1-3.7 4.1h-1.4zm13.3-.3h-2.1v-16h2.1v16zm10.5.3c-2.3 0-3.7-1.6-3.7-4.1V8.4h2.1v8c0 1.7.8 2.7 2.2 2.7 1.4 0 2.4-.9 2.4-2.7v-8h2.1v8.1c0 2.5-1.4 4.1-3.7 4.1h-1.4zm13.3-.3h-2.1v-16h2.1v16zm10.5.3c-2.3 0-3.7-1.6-3.7-4.1V8.4h2.1v8c0 1.7.8 2.7 2.2 2.7 1.4 0 2.4-.9 2.4-2.7v-8h2.1v8.1c0 2.5-1.4 4.1-3.7 4.1h-1.4z"/>
            </svg>
            {/* SoundCloud */}
            <svg className="w-32 h-10 text-muted-foreground/50 hover:text-primary transition-colors" viewBox="0 0 48 22" fill="currentColor">
              <path d="M.8 11.3c0-3.9 3.2-7.1 7.1-7.1 1.9 0 3.7.8 5 2.1v12.1H.8V11.3zm15.4 0c0-3.9 3.2-7.1 7.1-7.1 1.9 0 3.7.8 5 2.1v12.1h-12V11.3zm15.4 0c0-3.9 3.2-7.1 7.1-7.1 1.9 0 3.7.8 5 2.1v12.1h-12V11.3z"/>
            </svg>
            {/* YouTube Music */}
            <svg className="w-32 h-10 text-muted-foreground/50 hover:text-primary transition-colors" viewBox="0 0 159 110" fill="currentColor">
              <path d="M154 17.5c-1.8-6.7-7.1-12-13.8-13.8C128.4.4 79.7.4 79.7.4S31 .5 19.3 3.7c-6.7 1.8-12 7.1-13.8 13.8C2.3 29.2 2.3 55 2.3 55s0 25.8 3.2 37.5c1.8 6.7 7.1 12 13.8 13.8C31 110 79.7 110 79.7 110s48.7 0 60.4-3.2c6.7-1.8 12-7.1 13.8-13.8 3.2-11.7 3.2-37.5 3.2-37.5s0-25.8-3.2-37.5zM63.8 79.3V30.7L104.7 55 63.8 79.3z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
            Limited Time Offer
          </div>
          <h2 className="text-3xl font-bold animate-in fade-in duration-1000">
            Start Your Journey to Music Success
          </h2>
          <p className="text-muted-foreground">
            Join 50,000+ artists already using our platform to grow their audience. Get started free today.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/setup"
              className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 glow-effect"
            >
              Start Free Trial
            </Link>
            <div className="text-sm text-muted-foreground">
              14-day free trial • No credit card required • Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
