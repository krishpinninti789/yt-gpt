"use client";
import React from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
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

export default Layout;
