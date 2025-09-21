import Image from "next/image";

export function TrophyImage() {
  return (
    <Image
      alt="Trophy Image"
      src={"/images/leaderboard/trophy.png"}
      width={231}
      height={346}
      className="aspect-square object-contain absolute right-0 -translate-x-[50%] translate-y-[10%] rotate-12"
    />
  );
}