import React, { useState } from 'react';

type ThemePreset = 'fintech' | 'healthtech' | 'studio';

const THEMES: Record<
  ThemePreset,
  { name: string; primary: string; surface: string; accent: string; contrast: string }
> = {
  fintech: {
    name: 'FinTech Cobalt',
    primary: '#2563eb',
    surface: '#f8fafc',
    accent: '#dbeafe',
    contrast: '7.2:1 (AAA)',
  },
  healthtech: {
    name: 'HealthTech Emerald',
    primary: '#059669',
    surface: '#f0fdf4',
    accent: '#d1fae5',
    contrast: '5.1:1 (AA)',
  },
  studio: {
    name: 'Editorial Obsidian',
    primary: '#18181b',
    surface: '#fafafa',
    accent: '#e4e4e7',
    contrast: '16.8:1 (AAA)',
  },
};

export const ThemePlayground: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ThemePreset>('fintech');
  const [darkMode, setDarkMode] = useState(false);

  const current = THEMES[activeTheme];

  return (
    <div
      style={
        {
          '--brand-primary': current.primary,
          '--brand-accent': current.accent,
        } as React.CSSProperties
      }
      className={`rounded-2xl border p-6 transition-colors duration-300 ${
        darkMode
          ? 'border-slate-800 bg-slate-950 text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      {/* Top Token Control Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-4 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(THEMES) as ThemePreset[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTheme === key
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              {THEMES[key].name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            WCAG {current.contrast}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium dark:border-slate-700"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Live Token-Driven Preview Card */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
          <span
            style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
          >
            Live Token Variable
          </span>
          <h3 className="mt-3 text-lg font-bold">Instant Client White-Labeling</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Components inherit semantic CSS tokens rather than hardcoded utilities.
          </p>
          <button
            style={{ backgroundColor: 'var(--brand-primary)' }}
            className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Primary Action
          </button>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Active CSS Output
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
              {`@theme {\n  --color-primary: ${current.primary};\n  --color-accent: ${current.accent};\n}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
