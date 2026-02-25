import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseShowcase from "@/components/CourseShowcase";
import CertificateSearch from "@/components/CertificateSearch";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CourseShowcase />
      <CertificateSearch />
      <Footer />
    </main>
  );
}
