import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="ro" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className}, h-full flex flex-col justify-between`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="container">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
