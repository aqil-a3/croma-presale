import { SidebarItem } from "./Navigation";
import TransactionIcon from "./icons/sidebar-my-transaction.svg";
import DashboardIcon from "./icons/dashboard.svg";
import ReferralIcon from "./icons/referral.svg";
import ProfitCalculatorIcon from "./icons/profit-calculator.svg";

export const navigationItems = [
  { label: "Dashboard", Icon: DashboardIcon, href: "/dashboard" },
  { label: "My Transactions", Icon: TransactionIcon, href: "/my-transactions" },
  { label: "Referral", Icon: ReferralIcon, href: "/my-referral" },
  {
    label: "Profit Calculator",
    Icon: ProfitCalculatorIcon,
    href: "/profit-calculator",
  },
];

export function DashboardNavigationItem({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {navigationItems.map((item, i) => (
        <SidebarItem
          key={i}
          Icon={item.Icon}
          href={item.href}
          label={item.label}
          open={open}
        />
      ))}
    </div>
  );
}
