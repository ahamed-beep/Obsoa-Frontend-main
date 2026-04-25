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
  title: "Obsoa | Property Investment Dublin",
  description: "Obsoa helps real estate investors find high-potential property deals in Dublin, Ireland. Deal sourcing, analysis, and closing services.",
  keywords: [
    "property investment Dublin",
    "real estate Ireland",
    "deal sourcing Dublin",
    "property deals Ireland",
    "investment property Dublin",
    "off-market properties Ireland",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230A72AD'/><text x='50' y='70' font-size='55' text-anchor='middle' fill='white' font-family='Arial'>O</text></svg>",
  },
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