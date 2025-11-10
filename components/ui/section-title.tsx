import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl font-bold tracking-tight mb-4 ${className}`}>
      {children}
    </h2>
  );
}
