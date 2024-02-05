import Content_1 from '@/components/homePage/Content_1';
import Content_2 from '@/components/homePage/Content_2';
import Hero from '@/components/homePage/Hero';
import Navbar from '@/components/homePage/Navbar';
import Footer from '@/components/homePage/Footer';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between font-body'>
      <Navbar />
      <Hero />
      <Content_1 />
      <Content_2 />
      <Footer />
    </main>
  );
}
