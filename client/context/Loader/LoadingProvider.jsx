"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLoading } from "@/context/Loader/LoadingContext";
import Loader from "@/components/loader/Loader";

function LoadingProvider() {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        previousPathname.current = pathname;
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [pathname, setIsLoading]);

  return isLoading ? <Loader /> : null;
}

export default LoadingProvider;
