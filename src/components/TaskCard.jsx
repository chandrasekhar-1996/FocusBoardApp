import React from 'react';
import { Calendar, Pencil, Tag, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];

const PRIORITY_BADGES = {
  High: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  Low: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
};

const STATUS_BADGES = {
  'To do': 'bg-slate-100 text-slate-700',
  'In progress': 'bg-indigo-50 text-indigo-700',
  Completed: 'bg-emerald-50 text-emerald-700',
};

export function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const isCompleted = task.status === 'Completed';

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.Medium
              }`}
            >
              {task.priority}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                STATUS_BADGES[task.status] || STATUS_BADGES['To do']
              }`}
            >
              {task.status}
            </span>

            {task.category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                <Tag className="h-3 w-3" aria-hidden="true" />
                <span>{task.category}</span>
              </span>
            )}

            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Due {task.dueDate}</span>
              </span>
            )}
          </div>

          <h3
            className={`text-base font-semibold text-slate-900 ${
              isCompleted ? 'line-through text-slate-500' : ''
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm leading-relaxed text-slate-600">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 md:shrink-0 md:border-t-0 md:pt-0">
          <label htmlFor={`task-status-${task.id}`} className="sr-only">
            Change status for {task.title}
          </label>
          <select
            id={`task-status-${task.id}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="min-h-[40px] flex-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none sm:flex-initial"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}