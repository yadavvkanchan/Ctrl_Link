// ✅ Fix name conflict by renaming the layout function
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "./providers/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CtrlLink",
  description: "Trim your links",
};

// ✅ Rename layout function to "RootLayout"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-black`}>
          <Navbar />
          <SessionWrapper>
          {children}
          </SessionWrapper>
          <Footer />
        </body>
    </html>
  );
}
