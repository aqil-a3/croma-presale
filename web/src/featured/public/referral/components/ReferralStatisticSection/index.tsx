import { Referral } from "./Referral";
import { Statistic } from "./Statistic";

export function ReferralStatisticSection() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 backdrop-blur-3xl">
      <Referral />
      <Statistic />
    </section>
  );
}
