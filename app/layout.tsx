import "./globals.css";
import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import BackgroundLayer from "@/components/BackgroundLayer";

export const metadata: Metadata = {
  title: "Huzaif Ferooz | BCA Student & Developer",
  description:
    "Portfolio of Huzaif Ferooz, a BCA student at Govt. Degree College Pulwama, learning and building software.",
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Unbounded:wght@400;600;800;900&display=swap"
        />
      </head>
      <body>
        {/* Gooey filter used by the liquid button */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <SmoothScroll />
        <Cursor />
        <BackgroundLayer />
        <Nav />
        {children}
      </body>
    </html>
  );
}
