"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { RFQS, DASHBOARD_STATS } from "./mock-data";
import type { Rfq, RfqStatus } from "./types";

export type ServiceMode = "forwarding" | "trucking";

interface AppState {
  rfqs: Rfq[];
  mode: ServiceMode;
  setMode: (mode: ServiceMode) => void;
  getRfq: (id: string) => Rfq | undefined;
  setRfqStatus: (id: string, status: RfqStatus) => void;
  resolveMissingInfo: (id: string, resolution: "asked" | "assumed" | "edited") => void;
  quotesSentCount: number;
  markQuoteSent: (id: string) => void;
  dashboardStats: {
    rfqsToday: number;
    pendingToday: number;
    quotesPreparedToday: number;
    avgResponseMinutes: number;
    responseTimeReduction: number;
    rfqsProcessed: number;
    quotesPreparedTotal: number;
    avgProcessingMinutes: number;
    avgManualMinutes: number;
    timeSavedHours: number;
    pendingTotal: number;
    quotesSentToday: number;
  };
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [rfqs, setRfqs] = useState<Rfq[]>(RFQS);
  const [mode, setMode] = useState<ServiceMode>("forwarding");
  const [quotesSentCount, setQuotesSentCount] = useState(0);

  const getRfq = useCallback((id: string) => rfqs.find((r) => r.id === id), [rfqs]);

  const setRfqStatus = useCallback((id: string, status: RfqStatus) => {
    setRfqs((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const resolveMissingInfo = useCallback(
    (id: string, _resolution: "asked" | "assumed" | "edited") => {
      setRfqs((prev) => prev.map((r) => (r.id === id ? { ...r, missingInfoResolved: true } : r)));
    },
    []
  );

  const markQuoteSent = useCallback((id: string) => {
    setRfqs((prev) => prev.map((r) => (r.id === id ? { ...r, status: "sent" } : r)));
    setQuotesSentCount((c) => c + 1);
  }, []);

  const processedDelta = useMemo(
    () => rfqs.filter((r) => r.status === "quoted" || r.status === "sent").length - 1,
    [rfqs]
  );

  const dashboardStats = useMemo(() => {
    const delta = Math.max(0, processedDelta);
    return {
      rfqsToday: DASHBOARD_STATS.rfqsToday,
      pendingToday: Math.max(0, DASHBOARD_STATS.pendingToday - delta),
      quotesPreparedToday: DASHBOARD_STATS.quotesPreparedToday + delta,
      avgResponseMinutes: DASHBOARD_STATS.avgResponseMinutes,
      responseTimeReduction: DASHBOARD_STATS.responseTimeReduction,
      rfqsProcessed: DASHBOARD_STATS.rfqsProcessed + delta,
      quotesPreparedTotal: DASHBOARD_STATS.quotesPreparedTotal + delta,
      avgProcessingMinutes: DASHBOARD_STATS.avgProcessingMinutes,
      avgManualMinutes: DASHBOARD_STATS.avgManualMinutes,
      timeSavedHours: DASHBOARD_STATS.timeSavedHours,
      pendingTotal: Math.max(0, DASHBOARD_STATS.pendingTotal - delta),
      quotesSentToday: quotesSentCount,
    };
  }, [processedDelta, quotesSentCount]);

  const value: AppState = {
    rfqs,
    mode,
    setMode,
    getRfq,
    setRfqStatus,
    resolveMissingInfo,
    quotesSentCount,
    markQuoteSent,
    dashboardStats,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
