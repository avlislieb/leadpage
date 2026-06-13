declare global {
  interface Window {
    gtag: Gtag.Gtag;
    dataLayer: Array<Record<string, unknown>>;
  }

  // Tipagem flexível para a API gtag.js
  namespace Gtag {
    interface Gtag {
      (command: "consent", consentArg: ConsentArg | "default" | "update", params: Record<string, string>): void;
      (command: "config", targetId: string, config?: Record<string, unknown>): void;
      (command: "set", config: Record<string, unknown>): void;
      (command: "event", eventName: string, eventParams?: Record<string, unknown>): void;
      (command: "js", date: Date): void;
    }
    type ConsentArg = "ad_storage" | "analytics_storage" | "ad_user_data" | "ad_personalization";
  }
}

import { GA_MEASUREMENT_ID } from "./analytics.config";

const MEASUREMENT_ID = GA_MEASUREMENT_ID;

let initialized = false;

/**
 * Inicializa o Google Analytics 4 somente se a Measurement ID estiver definida.
 * Segura para chamadas múltiplas (idempotente).
 */
export function initGA(): void {
  if (initialized) return;
  if (!MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.warn("[GA4] VITE_GA_MEASUREMENT_ID não configurada. Analytics desativado.");
    }
    return;
  }

  initialized = true;

  // Inicializa dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false, // Controlamos manualmente via SPA
  });

  // Injeta script do GA dinamicamente
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  if (import.meta.env.DEV) {
    console.log(`[GA4] Inicializado com ID: ${MEASUREMENT_ID}`);
  }
}

/**
 * Envia um page_view manual para o GA4.
 * Útil para SPAs onde a mudança de rota não recarrega a página.
 */
export function trackPageView(path: string, title?: string): void {
  if (!MEASUREMENT_ID || !window.gtag) return;

  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
    send_page_view: true,
  });

  if (import.meta.env.DEV) {
    console.log(`[GA4] page_view: ${path} — ${title || document.title}`);
  }
}

/**
 * Eventos personalizados tipados suportados pela plataforma.
 */
export type GAEventName =
  | "create_community_click"
  | "form_submit"
  | "whatsapp_click"
  | "product_click"
  | "lesson_click"
  | "nav_click"
  | string;

export interface TrackEventParams {
  event: GAEventName;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Dispara um evento personalizado para o GA4.
 */
export function trackEvent(params: TrackEventParams): void {
  if (!MEASUREMENT_ID || !window.gtag) return;

  const { event, ...rest } = params;
  window.gtag("event", event, rest);

  if (import.meta.env.DEV) {
    console.log(`[GA4] event: ${event}`, rest);
  }
}
