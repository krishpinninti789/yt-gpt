"use client";

import { useState } from "react";

import Header from "./Header";
import SideBar from "./SideBar";
import VideoCategoryBar from "./VideoCategoryBar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Header onMenuClick={() => setIsSidebarExpanded((prev) => !prev)} />

      <div className="flex h-[calc(100vh-4rem)]">
        <SideBar isExpanded={isSidebarExpanded} />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Does NOT scroll */}
          <VideoCategoryBar />

          {/* Only this area scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
