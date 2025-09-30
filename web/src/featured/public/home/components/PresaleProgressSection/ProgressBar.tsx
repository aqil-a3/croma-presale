"use client";

import { Progress } from "@/components/ui/progress";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";
import React, { useEffect, useState } from "react";
import { motion, animate } from "motion/react";

export function ProgressBar() {
  const currentValue = 6_450_000;
  const targetValue = 20_450_000;
  const targetPercent = Math.round((currentValue / targetValue) * 100);

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex justify-between">
        <div className={fontOrbitron.className}>
          <p className="text-white text-base lg:text-xl font-medium">Current</p>
          <AnimatedCurrency
            value={currentValue}
            className={`${mainGradientFont} text-base lg:text-4xl font-bold`}
          />
        </div>

        <div className={`${fontOrbitron.className} text-right`}>
          <p className="text-white text-base lg:text-xl font-medium">Target Raise</p>
          <AnimatedCurrency
            value={targetValue}
            className={`${mainGradientFont} text-base lg:text-4xl font-bold`}
          />
        </div>
      </div>

      <ProgressBarIndicator value={targetPercent} />
    </motion.div>
  );
}

/** ===== Animated currency (on view) ===== */
function AnimatedCurrency({
  value,
  className,
  duration = 1.2,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [started, value, duration]);

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.4 },
      }}
      viewport={{ once: true }}
      onViewportEnter={() => setStarted(true)}
    >
      {formatCurrency(display)}
    </motion.p>
  );
}

/** ===== Animated progress (on view) ===== */
const ProgressBarIndicator: React.FC<{ value: number }> = ({ value }) => {
  const [percent, setPercent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setPercent(Math.round(v)),
    });
    return () => controls.stop();
  }, [started, value]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setStarted(true)}
    >
      <Progress value={percent} className="h-[27px] bg-[#323336]" />
      <motion.p
        className={`${fontPoppins.className} text-white text-base font-semibold absolute left-3 top-0.5`}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: percent >= value ? 1 : 0.85 }}
        transition={{ duration: 0.3 }}
      >
        {percent}%
      </motion.p>
    </motion.div>
  );
};
