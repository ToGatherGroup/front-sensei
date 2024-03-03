'use client'
import { ApiProvider } from "../contexts/api/index"

export const Providers = ({ children }: {children: React.ReactNode}) => {
    return (
        <ApiProvider>
            {children}
        </ApiProvider>
    )
}