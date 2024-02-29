'use client'
import { ApiProvider } from "@/contexts"

export const Providers = ({ children }: {children: React.ReactNode}) => {
    return (
        <ApiProvider>
            {children}
        </ApiProvider>
    )
}