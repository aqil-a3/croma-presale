import { RecentReferral } from "./RecentReferral";
import { ReferralTier } from "./Tier";

export function ReferralTierSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ReferralTier />
      <RecentReferral />
    </section>
  );
}
