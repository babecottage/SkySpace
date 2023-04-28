// These styles apply to every route in the application
import "../styles/globals.css";

export const metadata = {
  title: "SkySpace",
  description: "A place for besties",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
