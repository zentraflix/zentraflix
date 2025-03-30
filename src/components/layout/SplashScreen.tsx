import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";

export function SplashScreen() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Prevent scrolling when splash screen is visible
    document.body.style.overflow = "hidden";

    // Start fade out after 2 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
      // Remove from DOM after animation completes
      setTimeout(() => {
        setIsVisible(false);
        // Restore scrolling after splash screen is removed
        document.body.style.overflow = "";
      }, 300);
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Restore scrolling if component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background-main overflow-hidden ${isFading ? "animate-fade-out" : ""}`}
    >
      <div className="flex flex-col items-center space-y-6">
        <Icon className="text-8xl text-type-logo" icon={Icons.LOGO} />
      </div>
    </div>
  );
}
