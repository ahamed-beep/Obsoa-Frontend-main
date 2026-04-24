import "./globals.css";
import localFont from "next/font/local";

const jomhuria = localFont({
  src: "../../public/Font/Jomhuria-Regular.ttf",
  variable: "--font-jomhuria",
});

const manrope = localFont({
  src: "../../public/Font/Manrope-Regular.ttf",
  variable: "--font-manrope",
});

const poppins = localFont({
  src: "../../public/Font/Poppins-Regular.ttf",
  variable: "--font-poppins",
});

export const metadata = {
  title: "My App",
  description: "My App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jomhuria.variable} ${manrope.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}