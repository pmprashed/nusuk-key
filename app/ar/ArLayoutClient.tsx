"use client";

import { useEffect } from "react";

export function ArLayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");

    return () => {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    };
  }, []);

  return <>{children}</>;
}
