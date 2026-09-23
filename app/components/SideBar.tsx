"use client";

import React from "react";
import { SIDEBAR_CONFIG } from "@/utils/config/sidebar-config";
import { SideBarProps } from "@/utils/types";
import Link from "next/link";

const SideBar = ({ isExpanded }: SideBarProps) => {
  return (
    <aside
      className={`hidden h-full shrink-0 bg-black text-white md:block ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full overflow-y-auto px-3 py-4">
        {SIDEBAR_CONFIG.map((section, sectionIndex) => (
          <React.Fragment key={section.title ?? sectionIndex}>
            {sectionIndex > 0 && (
              <div className="my-4 border-t border-gray-800" />
            )}

            {section.title && isExpanded && (
              <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h2>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`group relative flex items-center rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-gray-900 hover:text-white ${
                      isExpanded ? "gap-4" : "justify-center"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />

                    {isExpanded && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
