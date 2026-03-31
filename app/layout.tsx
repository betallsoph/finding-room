import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://findingroom.app"),
  title: {
    default: "FindingRoom | Tìm phòng thuê dễ dàng",
    template: "%s | FindingRoom",
  },
  description:
    "FindingRoom kết nối chủ nhà và người thuê trực tiếp. Tìm phòng trọ, căn hộ, nhà riêng, phòng dịch vụ tại TP.HCM dễ dàng, không qua trung gian.",
  openGraph: {
    title: "FindingRoom",
    description:
      "Nền tảng cho thuê phòng trực tiếp. Chủ nhà đăng tin, người thuê tìm kiếm — không môi giới, không phí hoa hồng.",
    url: "/",
    siteName: "FindingRoom",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindingRoom",
    description:
      "Tìm phòng thuê tại TP.HCM dễ dàng. Kết nối trực tiếp chủ nhà và người thuê.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${googleSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-google-sans), "Google Sans", system-ui, sans-serif' }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
