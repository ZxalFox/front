"use client";

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") ?? null;
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
