import Image from "next/image";

export function RightFireImage(){
    return (
        <Image
          alt="Right Fire Image"
          src={"/images/background/dashboard/bg-03.png"}
          width={581}
          height={1334}
          className="absolute right-0 translate-x-[80%] rotate-z-40"
        />
      );
}