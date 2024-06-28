"use client";

import { AssessmentsProvider } from "@/contexts/assessments/assessments";

export default function AssessmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssessmentsProvider>{children}</AssessmentsProvider>;
}