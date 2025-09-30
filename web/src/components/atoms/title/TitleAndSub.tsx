import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { motion, type Variants } from "framer-motion";

interface Props {
  title: string;
  sub: string;
}

const titleBlockVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const subVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

export function TitleAndSub({ sub, title }: Props) {
  return (
    <motion.div className="space-y-4" variants={titleBlockVariants}>
      <motion.h3
        variants={titleVariants}
        className={`${fontOrbitron.className} text-white font-semibold text-xl lg:text-3xl`}
      >
        {title}
      </motion.h3>

      <motion.p
        variants={subVariants}
        className={`${fontPoppins.className} text-[#E9E9E9CC] font-medium text-base lg:text-xl`}
      >
        {sub}
      </motion.p>
    </motion.div>
  );
}
