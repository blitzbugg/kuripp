import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import TodayPage from "./pages/TodayPage";
import TodoPage from "./pages/TodoPage";
import NotesPage from "./pages/NotesPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Fallback for routes in development */}
          <Route path="*" element={<TodayPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
