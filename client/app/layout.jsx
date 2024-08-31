import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/Providers";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata = {
  title: "Saloon",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
