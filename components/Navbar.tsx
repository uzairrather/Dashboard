'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDarkMode } from '../hooks/useDarkMode';

const navItems = [
  { href: '/', label: 'Task List' },
  { href: '/time-tracking', label: 'Time Tracking' },
  { href: '/statistics', label: 'Statistics' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-center gap-10 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              pathname === item.href
                ? 'bg-white text-blue-700'
                : 'hover:bg-blue-500'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={toggleDarkMode}
          className="ml-auto mr-2 text-xl"
          title="Toggle Dark Mode"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
