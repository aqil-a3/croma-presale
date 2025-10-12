"use client";

import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { fontOrbitron } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { useEstimationProgress } from "../../hooks/use-estimation-progress";
import { TrackHeader } from "./TrackHeader";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  ratePerClient?: number;
  defaultClients?: number;
  ticks?: number[];
  className?: string;
};

const fmt = new Intl.NumberFormat("en-US");

export function EstimationProgresSectionInteractive({
  min = 0,
  max = 500,
  step = 1,
  ratePerClient = 37,
  defaultClients = 86,
  ticks = [10, 50, 100, 200, 300, 400, 500],
  className,
}: Props) {
  const {
    income,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    pct,
    clients,
    setClients,
    trackRef,
  } = useEstimationProgress(max, min, defaultClients, ratePerClient, step);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <PannelContainer className={className}>
        <h3
          className={`${fontOrbitron.className} text-white font-semibold text-2xl lg:text-4xl text-center`}
        >
          Estimation Progress
        </h3>

        {/* Header kecil */}
        <TrackHeader clients={clients} income={income} setClients={setClients}maxClients={max} />

        {/* Track + Fill + Knob (interaktif) */}
        <div className="mt-4">
          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={clients}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className={cn(
              "relative w-full h-6 rounded-full bg-white/15 outline-none select-none cursor-pointer",
              // inner shadow seperti Figma
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.25)]"
            )}
          >
            {/* Inner track (abu gelap) */}
            <div className="absolute inset-[3px] rounded-full bg-black/25 pointer-events-none" />

            {/* Fill */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#B72204] to-[#FC6400]"
              style={{ width: `${pct}%` }}
            />

            {/* Knob */}
            <div
              className="absolute top-1/2 size-10 -translate-y-1/2 translate-x-[-50%] rounded-full
                       bg-gradient-to-r from-[#B72204] to-[#FC6400] shadow-lg pointer-events-none"
              style={{ left: `${pct}%` }}
              aria-hidden
            />
          </div>

          {/* Ticks bawah */}
          <div className="mt-3 flex justify-between text-white/70">
            {ticks.map((t) => (
              <span
                key={t}
                className={`${fontOrbitron.className} text-sm tracking-wide`}
              >
                {fmt.format(t)}
              </span>
            ))}
          </div>
        </div>
      </PannelContainer>
    </motion.div>
  );
}
