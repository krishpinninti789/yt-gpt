"use client";

import { Suspense, useState } from "react";

import Header from "./Header";
import SideBar from "./SideBar";
import VideoCategoryBar from "./VideoCategoryBar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Header onMenuClick={() => setIsSidebarExpanded((prev) => !prev)} />

      <div className="flex h-[calc(100vh-6rem)]">
        <SideBar isExpanded={isSidebarExpanded} />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden border-l border-[var(--hairline)]">
          {/* Does NOT scroll */}
          <div className="shrink-0">
            <Suspense
              fallback={
                <div className="h-14.25 border-b border-(--hairline)" />
              }
            >
              <VideoCategoryBar />
            </Suspense>
          </div>

          {/* Only this area scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
