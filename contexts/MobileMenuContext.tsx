"use client";

import { createContext, useContext, useState, useCallback } from "react";

type MobileMenuContextType = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <MobileMenuContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen: useCallback((open: boolean) => setMobileMenuOpen(open), []),
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) {
    return { mobileMenuOpen: false, setMobileMenuOpen: () => {} };
  }
  return ctx;
}
