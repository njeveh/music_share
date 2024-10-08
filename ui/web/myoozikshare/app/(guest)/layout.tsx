import Navbar from '../ui/components/navbar/navbar';
import Footer from '../ui/components/footer/footer';

export default function GuestLayout(
    {
        children,
      }: {
        children: React.ReactNode;
      }
) {

return (
<>
  <Navbar />
  <main className="flex flex-col p-6 pb-[100px]">
    {children}
  </main>
  <Footer />
</>
);
}