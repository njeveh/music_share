import { ThemeProvider } from "@/app/ui/components/theme-provider";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SessionProvider from './ui/components/session-provider';
import { auth } from '@/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen relative`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider> 
      </body>
    </html>
  );
}
