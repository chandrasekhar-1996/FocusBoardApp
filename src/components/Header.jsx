import React from 'react';
import { Menu, Plus } from 'lucide-react';

export function Header({ onOpenMobileMenu, onOpenNewTask }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              FocusBoard
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Track tasks, priorities, and completion progress
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenNewTask}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}