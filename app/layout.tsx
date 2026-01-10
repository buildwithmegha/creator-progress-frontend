import "./globals.css";

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
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
