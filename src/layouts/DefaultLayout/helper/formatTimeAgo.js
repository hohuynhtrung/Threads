import { formatDistanceToNowStrict } from "date-fns";

// Custom locale rút gọn: chỉ lấy số + chữ cái đầu
const shortEnLocale = {
  formatDistance: (token, count) => {
    const formats = {
      lessThanXSeconds: "now",
      xSeconds: "now",
      halfAMinute: "now",
      lessThanXMinutes: `${count}m`,
      xMinutes: `${count}m`,
      aboutXHours: `${count}h`,
      xHours: `${count}h`,
      xDays: `${count}d`,
      aboutXWeeks: `${count}w`,
      xWeeks: `${count}w`,
      aboutXMonths: `${count}mo`,
      xMonths: `${count}mo`,
      aboutXYears: `${count}y`,
      xYears: `${count}y`,
      overXYears: `${count}y`,
      almostXYears: `${count}y`,
    };
    return formats[token] || "";
  },
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return "";

  try {
    return formatDistanceToNowStrict(new Date(dateString), {
      addSuffix: false,
      locale: shortEnLocale,
    });
  } catch (error) {
    return "";
  }
};
