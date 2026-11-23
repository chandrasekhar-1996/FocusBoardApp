# FocusBoard

FocusBoard is a responsive React task management dashboard built with **React.js**, **Vite**, **JavaScript (ES6+)**, **CSS3**, **React Hooks**, **Lucide React**, and **`localStorage`** persistence. Designed with a mobile-first mindset and aligned to the assignment's Figma reference, it combines full task CRUD operations, live search and filtering, dynamic statistics, and a three-slide Focus Notes carousel.

## Features

- **Task CRUD Operations**: Create, view, edit, and delete tasks (with confirmation) including title, description, status (`To do`, `In progress`, `Completed`), priority, and due date.
- **Search & Filtering**: Case-insensitive title search alongside status tabs and priority filters.
- **Dynamic Dashboard Statistics**: Real-time task counts and completion percentage calculated directly from current task state.
- **Focus Notes Carousel**: Three-slide carousel with previous/next navigation and slide indicators.
- **Browser Persistence (`localStorage`)**: Seeds a minimum of 6 sample tasks on initial load and saves/restores tasks and notes across browser reloads.
- **Responsive Design & Accessibility**: Built to adapt across **390px** (mobile), **768px** (tablet), and **1440px** (desktop) viewports with accessible controls and semantic markup.

## Tech Stack

- **HTML5 & CSS3**: Semantic page structure, responsive layouts, and styling.
- **JavaScript (ES6+) & React.js**: Component-based architecture and state/lifecycle management via React Hooks.
- **Vite**: Development server and production build tool.
- **Lucide React**: Icons across navigation, tasks, filters, and controls.
- **localStorage**: Client-side browser persistence (no backend, Redux, or external APIs required).
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
