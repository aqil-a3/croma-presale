import { Variants } from "framer-motion";

export const cardContainerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
