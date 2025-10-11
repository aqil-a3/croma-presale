import { useMemo, useRef, useState } from "react";
import { useReferralContext } from "../provider";
import { comission } from "../comission";

export function useEstimationProgress(
  max: number,
  min: number,
  defaultClients: number,
  ratePerClient: number,
  step: number
) {
  const { userStatistic } = useReferralContext();
  const comissionBonus = userStatistic ? comission[userStatistic.current_tier] : 5;
  const comissionPercent = comissionBonus / 100;
  
  const [clients, setClients] = useState(
    Math.min(max, Math.max(min, defaultClients))
  );

  const income = useMemo(
    () => Math.max(0, Math.round(clients * ratePerClient * comissionPercent)),
    [clients, ratePerClient, comissionPercent]
  );
  const pct = ((clients - min) / (max - min)) * 100;

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function setFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const raw = (clientX - left) / width;
    const clamped = Math.max(0, Math.min(1, raw));
    const value = min + clamped * (max - min);
    const snapped = Math.round(value / step) * step;
    setClients(Math.max(min, Math.min(max, snapped)));
  }

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  }

  function onPointerUp(e: React.PointerEvent) {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setClients((c) => Math.max(min, c - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setClients((c) => Math.min(max, c + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setClients(min);
    } else if (e.key === "End") {
      e.preventDefault();
      setClients(max);
    }
  }

  return {
    income,
    pct,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    clients,
    trackRef,
  };
}
