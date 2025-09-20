const navigationItems = [
  { label: "Home", active: true },
  { label: "Leaderboard", active: false },
  { label: "Airdrop", active: false },
  { label: "Referral", active: false },
];

export function HeaderNavigation() {
  return (
    <nav className="inline-flex items-center gap-[34px] relative flex-[0_0_auto]">
      {navigationItems.map((item, index) => (
        <button
          key={index}
          className={`relative w-fit mt-[-1.00px] [font-family:'Orbitron',Helvetica] ${
            item.active
              ? "font-bold text-[#d73602]"
              : "font-normal text-[#e9e9e9]"
          } text-lg text-center tracking-[0] leading-[normal] cursor-pointer hover:text-[#d73602] transition-colors`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
