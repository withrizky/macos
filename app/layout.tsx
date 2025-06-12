import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./components/AppThemeProvider";
import { metadata as metadataConstants } from "@/Constants/metadata";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = metadataConstants;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppThemeProvider className={`${poppins.variable} antialiased`}>
        <svg style={{ display: "none" }}>

          <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </AppThemeProvider>
    </html>
  );
}
