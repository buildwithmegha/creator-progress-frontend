import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Creator Progress Tracker",
  description: "Track your daily progress. Build consistency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
