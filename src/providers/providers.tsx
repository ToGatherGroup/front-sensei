'use client'
import { AuthProvider } from "@/contexts/auth/index"
import { ApiProvider } from "../contexts/api/index"

export const Providers = ({ children }: {children: React.ReactNode}) => {
    return (
        <AuthProvider>
            <ApiProvider>
                {children}
            </ApiProvider>
        </AuthProvider>
    )
}