import { Suspense } from "react";
import AppShell from "../components/AppShell";
import VideoCategoryBar from "../components/VideoCategoryBar";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <AppShell>
      {/* Does NOT scroll */}
      <Suspense
        fallback={<div className="h-14.25 border-b border-(--hairline)" />}
      >
        <VideoCategoryBar />
      </Suspense>
      {children}
    </AppShell>
  );
}
