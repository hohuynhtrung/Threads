import { useState, useEffect } from "react";

export function useCountdown(createdAt) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!createdAt) return;

    const calculateTime = () => {
      const createdTime = new Date(createdAt).getTime();
      const expirationTime = createdTime + 15 * 60 * 1000; // 15 phút
      const now = new Date().getTime();
      const difference = expirationTime - now;

      if (difference <= 0) {
        setTimeLeft("00:00");
        setIsExpired(true);
        return true; // Đã hết hạn
      } else {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Định dạng luôn có 2 chữ số (VD: 04:09)
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        setTimeLeft(`${formattedMinutes}:${formattedSeconds}`);
        setIsExpired(false);
        return false;
      }
    };

    // Chạy ngay lần đầu
    const expired = calculateTime();
    if (expired) return;

    // Cập nhật mỗi giây
    const interval = setInterval(() => {
      const isExp = calculateTime();
      if (isExp) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return { timeLeft, isExpired };
}
