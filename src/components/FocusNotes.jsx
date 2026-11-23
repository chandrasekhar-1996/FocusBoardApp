import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

// TODO: Verify slide copy and styling against Figma frames 15:2, 15:30, and 15:58
const SLIDES = [
  {
    id: 'slide-1',
    badge: 'Focus Notes 1/3',
    title: 'Stay focused on top-priority tasks',
    description:
      'Update task statuses as work progresses so completion metrics and priorities remain accurate.',
  },
  {
    id: 'slide-2',
    badge: 'Focus Notes 2/3',
    title: 'Check responsive spacing at every width',
    description:
      'Review cards, filters, and forms at 390px, 768px, and 1440px to ensure clean alignment and touch targets.',
  },
  {
    id: 'slide-3',
    badge: 'Focus Notes 3/3',
    title: 'Keep state derived and persisted',
    description:
      'All counts, percentages, and filter views compute from state and save automatically in localStorage.',
  },
];

export function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 p-4 sm:p-5"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{currentSlide.badge}</span>
            </span>
          </div>

          <h2 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
            {currentSlide.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {currentSlide.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          {/* Active Slide Indicators */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Select Focus Notes slide"
          >
            {SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to ${slide.badge}: ${slide.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-3 rounded-full transition-all ${
                    isSelected
                      ? 'w-7 bg-indigo-600'
                      : 'w-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous focus note slide"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next focus note slide"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}