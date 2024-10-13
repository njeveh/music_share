import Nav from '../ui/dashboard/nav/nav';
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
  <Nav />
  <main className="flex flex-col p-6 pb-[100px]">
    {children}
  </main>
  <Footer />
</>
);
}