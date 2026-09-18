"use client";

import { useState } from "react";

import Header from "./Header";
import SideBar from "./SideBar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Header onMenuClick={() => setIsExpanded((prev) => !prev)} />

      <div className="flex h-[calc(100vh-4rem)]">
        <SideBar isExpanded={isExpanded} />

        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
