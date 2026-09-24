"use client";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <div>
      <Header onMenuClick={handleBack} />
      {children}
    </div>
  );
};

export default layout;
