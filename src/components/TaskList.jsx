import React from 'react';
import { TaskCard } from './TaskCard';

export function TaskList({
  tasks,
  totalTasksCount,
  onStatusChange,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <section aria-label="Tasks" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Tasks{' '}
          <span className="ml-1.5 text-sm font-normal text-slate-500">
            ({tasks.length} of {totalTasksCount})
          </span>
        </h2>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base font-semibold text-slate-800">
            No matching tasks found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Adjust your search text, status tab, or priority filter, or add a new task.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}