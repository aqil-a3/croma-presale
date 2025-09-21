import Image from "next/image";

export function LeftFireImage(){
    return (
        <Image
          alt="Left Fire Image"
          src={"/images/background/dashboard/bg-03.png"}
          width={581}
          height={1334}
          className="absolute left-0 -translate-x-[10%]"
        />
      );
}