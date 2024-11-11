import Nav from '../ui/dashboard/nav/nav';
import Footer from '../ui/components/footer/footer';

export default async function DashboardLayout(
    {
        children,
      }: {
        children: React.ReactNode;
      }
) {

return (
  <>
    <Nav />
    <main className="flex flex-col pb-[100px]">
      {children}
    </main>
    <Footer />
  </>
);
}