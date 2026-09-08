'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ProgressAnimation() {
  const [coverage, setCoverage] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let start: number;
    let id: number;
    const duration = 6000;

    const animate = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const raw = (elapsed % duration) / duration;

      const eased = Math.min(raw * 1.05, 1);
      setCoverage(eased * 100);

      id = requestAnimationFrame(animate);
    };

    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const filled = Math.floor(coverage / 5);

  const terminalLines = [
    { text: '▶ npm run test', status: 'running' },
    { text: '  ✓ 12 passed', status: 'pass' },
    { text: '  ✓ 3 failed', status: 'fail' },
    { text: '▶ coverage: ' + Math.round(coverage) + '%', status: 'info' },
  ];

  if (!mounted) {
    return (
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#0a0a0f]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
            🧪 code coverage
          </span>
          <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">0%</span>
        </div>
        <div className="mt-3 grid grid-cols-20 gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" />
            running
          </span>
          <span>⚡ 0%</span>
          <span>✅ passed</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border-2 p-6 transition-colors duration-700 ${
        isDark ? 'border-gray-700 bg-[#0a0a0f]' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
          🧪 code coverage
        </span>
        <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
          {Math.round(coverage)}%
        </span>
      </div>

      <div className="mt-3 grid grid-cols-20 gap-0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`h-4 w-full transition-colors ${
              i < filled
                ? coverage > 80
                  ? 'bg-lime-500 dark:bg-lime-400'
                  : coverage > 50
                    ? 'bg-yellow-500 dark:bg-yellow-400'
                    : 'bg-red-500 dark:bg-red-400'
                : isDark
                  ? 'bg-gray-800'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/50">
        <div className="space-y-0.5 font-mono text-[10px]">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className={`flex items-center gap-2 ${
                line.status === 'pass'
                  ? 'text-green-500'
                  : line.status === 'fail'
                    ? 'text-red-500'
                    : line.status === 'info'
                      ? 'text-lime-500'
                      : 'text-gray-500'
              }`}
            >
              {line.status === 'running' && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  ●
                </motion.span>
              )}
              {line.status === 'pass' && <span>✓</span>}
              {line.status === 'fail' && <span>✗</span>}
              {line.status === 'info' && <span>▶</span>}
              <span>{line.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" />
          running
        </span>
        <span>⚡ {Math.round(coverage)}%</span>
        <span>✅ passed</span>
      </div>
    </div>
  );
}
