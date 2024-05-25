'use client'
import { AuthProvider } from "@/contexts/auth/index"
import { ApiProvider } from "../contexts/api/index"
import { AthleteProvider } from "@/contexts"
import { AssessmentsProvider } from "@/contexts"

export const Providers = ({ children }: {children: React.ReactNode}) => {
    return (
        <AuthProvider>
            <ApiProvider>
                <AthleteProvider>
                    <AssessmentsProvider>
                        {children}
                    </AssessmentsProvider>
                </AthleteProvider>
            </ApiProvider>
        </AuthProvider>
    )
}