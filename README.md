# FocusBoard

FocusBoard is a responsive task management dashboard built with **React.js**, **Vite**, **JavaScript (ES6+)**, **CSS3**, **React Hooks**, **Lucide React**, and **`localStorage`** persistence. Designed around the Figma reference and mobile-first breakpoints, it supports full task CRUD operations, live search and filtering, dynamic statistics, and a three-slide Focus Notes carousel.

## Features

- **Task CRUD Operations**: Create, view, edit, and delete tasks (with confirmation) including title, description, status (`To do`, `In progress`, `Completed`), priority, and due date.
- **Search & Filtering**: Case-insensitive title search paired with status tabs and a priority filter.
- **Dynamic Dashboard Statistics**: Real-time task counts and completion percentage calculated directly from task state.
- **Focus Notes Carousel**: Three-slide carousel with previous/next controls and slide indicators.
- **Browser Persistence (`localStorage`)**: Seeds at least 6 sample tasks on initial load and saves/restores data across page reloads.
- **Responsive Design & Accessibility**: Built for **390px** (mobile), **768px** (tablet), and **1440px** (desktop) viewports with accessible controls and semantic HTML.

## Tech Stack

- **HTML5 & CSS3**: Semantic structure, responsive layouts, and styling.
- **JavaScript (ES6+) & React.js**: Modular UI and state management with React Hooks.
- **Vite**: Fast development server and production bundler.
- **Lucide React**: Icons across navigation, tasks, filters, and controls.
- **localStorage**: Client-side browser persistence (no backend, Redux, or external task APIs required).
- **Git & GitHub / Vercel or Netlify**: Version control and deployment.

## Project Structure

```text
focusboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── SearchBar.jsx
│   │   └── FilterTabs.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── screenshots/
├── README.md
├── AI_USAGE.md
├── package.json
└── .gitignore
