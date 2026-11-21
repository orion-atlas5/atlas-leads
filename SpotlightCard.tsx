import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  title: string;
  description: string;
  tag?: string;
  ctaLabel?: string;
  onAction?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  description,
  tag = '60fps GPU',
  ctaLabel = 'Inspect Component',
  onAction,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-transform duration-300 ease-out hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Cursor-Tracking Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.15), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {tag}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400"
        >
          {ctaLabel} →
        </button>
      </div>
    </div>
  );
};
