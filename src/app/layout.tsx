import Footer from "@/components/footer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Management Elevi",
  description: "Manageriază elevii simplu și eficient.",
};

// export const viewport: Viewport = {
//   themeColor: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <main className="container flex-1 ">{children}</main>
        <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
