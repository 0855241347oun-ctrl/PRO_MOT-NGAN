import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Internal Dashboard",
  description: "ระบบ Dashboard ภายในองค์กร สำหรับจัดการและดูข้อมูลสรุป",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background ambient glow */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
          </div>

          {/* Header */}
          <Header />

          {/* Main content — offset for fixed header */}
          <main className="pt-16">
            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
