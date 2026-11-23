import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Layers, TrendingUp } from 'lucide-react';
import { FilterTabs } from './components/FilterTabs';
import { FocusNotes } from './components/FocusNotes';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { SAMPLE_TASKS } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

const STORAGE_KEY = 'focusboard.tasks.v1';

export function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, SAMPLE_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const notesRef = useRef(null);
  const tasksRef = useRef(null);

  useEffect(() => {
    if (!taskToDelete) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setTaskToDelete(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [taskToDelete]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((task) => task.status === 'In progress').length;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, inProgress, completed, completionRate };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesTitle =
        !query || (task.title || '').toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesTitle && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const handleSaveTask = (payload, editingId) => {
    if (editingId) {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...payload } : item
        )
      );
    } else {
      const createdTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...payload,
      };
      setTasks((prev) => [createdTask, ...prev]);
    }
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, status: nextStatus } : item
      )
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    const targetId = taskToDelete.id;
    setTasks((prev) => prev.filter((item) => item.id !== targetId));
    setTaskToDelete(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'notes') {
      notesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (sectionId === 'tasks') {
      tasksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          totalTasks={stats.total}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            onOpenNewTask={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
          />

          <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <section
              aria-label="Statistics overview"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <StatCard
                label="Total Tasks"
                value={stats.total}
                icon={Layers}
                accentClass="bg-indigo-50 text-indigo-600"
              />
              <StatCard
                label="In Progress"
                value={stats.inProgress}
                icon={Clock}
                accentClass="bg-amber-50 text-amber-600"
              />
              <StatCard
                label="Completed"
                value={stats.completed}
                icon={CheckCircle2}
                accentClass="bg-emerald-50 text-emerald-600"
              />
              <StatCard
                label="Completion"
                value={`${stats.completionRate}%`}
                icon={TrendingUp}
                accentClass="bg-sky-50 text-sky-600"
                progress={stats.completionRate}
              />
            </section>

            <div ref={notesRef}>
              <FocusNotes />
            </div>

            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onResetFilters={handleResetFilters}
            />

            <div ref={tasksRef}>
              <TaskList
                tasks={filteredTasks}
                totalTasksCount={tasks.length}
                onStatusChange={handleStatusChange}
                onEditTask={(task) => {
                  setEditingTask(task);
                  setFormOpen(true);
                }}
                onDeleteTask={(task) => setTaskToDelete(task)}
              />
            </div>
          </main>
        </div>
      </div>

      <TaskForm
        isOpen={formOpen}
        initialTask={editingTask}
        onClose={() => {
          setFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />

      {taskToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-heading"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="confirm-delete-heading"
                  className="text-base font-bold text-slate-900 sm:text-lg"
                >
                  Confirm task deletion
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Delete “{taskToDelete.title}”? This cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setTaskToDelete(null)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;