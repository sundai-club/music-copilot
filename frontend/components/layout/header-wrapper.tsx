'use client';

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const showHeader = pathname !== "/";

  if (!showHeader) return null;
  return <SiteHeader />;
} 