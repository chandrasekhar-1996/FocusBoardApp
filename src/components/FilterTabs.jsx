import React from 'react';
import { RotateCcw } from 'lucide-react';
import { SearchBar } from './SearchBar';

const STATUS_TABS = ['All', 'To do', 'In progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

export function FilterTabs({
  statusFilter = 'All',
  onStatusChange,
  priorityFilter = 'All',
  onPriorityChange,
  searchQuery = '',
  onSearchChange,
  onResetFilters,
}) {
  const normalizedQuery = (searchQuery ?? '').trim();
  const hasFilters =
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    normalizedQuery !== '';

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % STATUS_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + STATUS_TABS.length) % STATUS_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = STATUS_TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      onStatusChange?.(STATUS_TABS[nextIndex]);
      const tablist = e.currentTarget.parentElement;
      const buttons = tablist?.querySelectorAll('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <section
      aria-label="Search and filter controls"
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Tabs */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex flex-wrap gap-2"
        >
          {STATUS_TABS.map((tab, index) => {
            const active = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onStatusChange?.(tab)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`min-h-[40px] rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {tab === 'All' ? 'All Tasks' : tab}
              </button>
            );
          })}
        </div>

        {/* Search + Priority Filter + Clear */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={searchQuery ?? ''}
            onChange={onSearchChange}
          />

          <div className="flex items-center gap-2">
            <label htmlFor="priority-filter" className="sr-only">
              Filter tasks by priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => onPriorityChange?.(e.target.value)}
              className="min-h-[42px] flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none sm:flex-initial"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority === 'All' ? 'All Priorities' : `${priority} Priority`}
                </option>
              ))}
            </select>

            {hasFilters && (
              <button
                type="button"
                onClick={() => onResetFilters?.()}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}