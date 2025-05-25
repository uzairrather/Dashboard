import '../styles/globals.css';
import { Providers } from '../store/provider';
import Navbar from '../components/Navbar'; // ✅ NEW

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Providers>
          <Navbar /> {/* ✅ Moved to client component */}
          <main className="p-8 max-w-4xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
