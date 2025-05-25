'use client';
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark';
    setEnabled(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const isDark = !enabled;
    setEnabled(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return [enabled, toggle] as const;
}
