import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Jasper School of Data | Admin LMS",
  description: "Enterprise administration platform for Jasper School of Data - Course enrollment, live classes, assessments, payments, and certificates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAF8F5] text-[#1C1917] min-h-screen antialiased selection:bg-[#A70727] selection:text-white">
        <div className="flex min-h-screen">
          {/* Light Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#FAF8F5] min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
