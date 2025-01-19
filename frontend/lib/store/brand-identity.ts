import { create } from 'zustand'
import { BrandIdentityResponse } from '@/types/api'

interface BrandIdentityStore {
  brandIdentity: BrandIdentityResponse | null
  setBrandIdentity: (data: BrandIdentityResponse) => void
  clearBrandIdentity: () => void
}

export const useBrandIdentityStore = create<BrandIdentityStore>()((set) => ({
  brandIdentity: null,
  setBrandIdentity: (data: BrandIdentityResponse) => set({ brandIdentity: data }),
  clearBrandIdentity: () => set({ brandIdentity: null }),
})) 