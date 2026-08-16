import { motion } from "motion/react";
import Icons from "@/assets/icons";

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <motion.img
        src={Icons.iconThread}
        alt="Loading"
        className="w-20 h-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    </div>
  );
}

export default Loading;
