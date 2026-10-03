"use client";

import { navItems } from "@/utils/config/bottomBar-config";
import { triggerHaptic } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomBar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-(--hairline)
        bg-background
        md:hidden
      "
    >
      <div className="mx-auto flex h-20 max-w-md items-center justify-around px-2 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex h-full min-w-16 flex-col items-center justify-center
                gap-1 text-xs transition-colors
                ${isActive ? "text-foreground" : "text-muted-foreground"}
              `}
              onClick={() => triggerHaptic(10)}
            >
              <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomBar;
