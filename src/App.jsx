import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import TodayPage from "./pages/TodayPage"
import UpcomingPage from "./pages/UpcomingPage"
import CompletedPage from "./pages/CompletedPage"
import { useTasks } from "./hooks/useTasks"

function App() {
   // Get task state and task management functions from the custom hook
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTasks()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TodayPage
              tasks={tasks}
              addTask={addTask}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/upcoming"
          element={<UpcomingPage tasks={tasks} />}
        />
        <Route
          path="/completed"
          element={<CompletedPage tasks={tasks} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App