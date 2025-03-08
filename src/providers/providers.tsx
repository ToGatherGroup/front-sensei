"use client";
import { AuthProvider } from "@/contexts/auth/index";
import { ApiProvider } from "../contexts/api/index";
import { AthleteProvider } from "@/contexts";
import { ThemeProvider } from "@mui/material";
import { muiGlobalTheme } from "@/components/ui/mui/globalTheme";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Toaster
      toastOptions={{
        className: "!bg-winePattern !text-white !py-5",
      }}
      containerStyle={{ top: 100 }}
    />
    <AuthProvider>
      <ApiProvider>
        <ThemeProvider theme={muiGlobalTheme}>
          <AthleteProvider>{children}</AthleteProvider>
        </ThemeProvider>
      </ApiProvider>
    </AuthProvider>
    </>
  );
};
