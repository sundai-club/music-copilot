import { create } from 'zustand'
import { BrandIdentityResponse } from '@/types/api'

interface BrandIdentityStore {
  brandIdentity: BrandIdentityResponse | null
  spotify_url: string | null
  setBrandIdentity: (data: BrandIdentityResponse) => void
  setSpotifyUrl: (url: string) => void
  clearBrandIdentity: () => void
}

export const useBrandIdentityStore = create<BrandIdentityStore>()((set) => ({
  brandIdentity: null,
  spotify_url: null,
  setBrandIdentity: (data: BrandIdentityResponse) => set({ brandIdentity: data }),
  setSpotifyUrl: (url: string) => set({ spotify_url: url }),
  clearBrandIdentity: () => set({ brandIdentity: null, spotify_url: null }),
})) 