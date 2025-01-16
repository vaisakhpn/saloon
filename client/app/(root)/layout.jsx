import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function RootLayout({ children }) {
  return (
    <main className="flex-col w-full  font-inter">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
