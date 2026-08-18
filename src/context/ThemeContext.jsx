import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Lấy theme từ localStorage, nếu chưa có thì mặc định là 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Hàm áp dụng theme thực tế lên DOM
    const applyTheme = () => {
      let isDark = false;

      if (theme === "system") {
        // Kiểm tra cài đặt hệ điều hành
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        isDark = theme === "dark";
      }

      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    // Lưu lựa chọn vào localStorage
    localStorage.setItem("theme", theme);

    // Lắng nghe sự thay đổi của Hệ Thống nếu đang ở chế độ 'system'
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook để các component con dễ dàng sử dụng
export const useTheme = () => useContext(ThemeContext);
