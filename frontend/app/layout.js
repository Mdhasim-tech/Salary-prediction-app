import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";  // adjust path as needed
import Navbar from "./components/Navbar/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salary Predictor",
  description: "AI-driven salary prediction app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} page`}>

<Navbar/>
        {/* This main will expand to push the footer down */}
        <main className="main">{children}</main>

        {/* Footer appears on every page */}
        <Footer />
      </body>
    </html>
  );
}
