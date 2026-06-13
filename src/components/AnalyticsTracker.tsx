import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initGA, trackPageView } from "@/lib/analytics";

/**
 * Componente responsável por inicializar o GA4 e rastrear
 * mudanças de rota automaticamente em uma SPA.
 *
 * Deve ser montado uma única vez, preferencialmente no layout raiz (__root.tsx).
 */
export function AnalyticsTracker() {
  // Inicializa GA4 uma vez ao montar (somente no client)
  useEffect(() => {
    initGA();
  }, []);

  const lastPathRef = useRef<string | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    requestAnimationFrame(() => {
      trackPageView(pathname, document.title);
    });
  }, [pathname]);

  return null;
}
