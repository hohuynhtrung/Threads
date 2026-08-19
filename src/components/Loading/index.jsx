import { motion } from "motion/react";
import Icons from "@/assets/icons";

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-zinc-900">
      <motion.img
        src={Icons.iconThread}
        alt="Loading"
        className="w-20 h-20 dark:invert"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    </div>
  );
}

export default Loading;
