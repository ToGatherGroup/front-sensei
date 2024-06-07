"use client";

import { AssessmentsProvider } from "@/contexts";

export default function AssessmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssessmentsProvider>{children}</AssessmentsProvider>;
}
