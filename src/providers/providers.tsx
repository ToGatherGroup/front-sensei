"use client";
import { AuthProvider } from "@/contexts/auth/index";
import { ApiProvider } from "../contexts/api/index";
import { AthleteProvider } from "@/contexts";
import { ComparisonStateProvider } from "@/contexts/comparison/comparison";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ApiProvider>
        <ComparisonStateProvider>
        <AthleteProvider>{children}</AthleteProvider>
        </ComparisonStateProvider>
      </ApiProvider>
    </AuthProvider>
  );
};
