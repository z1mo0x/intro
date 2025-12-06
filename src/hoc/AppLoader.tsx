'use client'

import { useLenisSmooth } from "@/hooks/useLenisSmooth"

export default function AppLoader({ children }: { children: React.ReactNode }) {
    useLenisSmooth()
    return (
        <>{children}</>
    )
}