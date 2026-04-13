import { useState } from "react";
import initialTasks from "../data/initialTasks";

export function useTasks() {
  // Initialize state with predefined tasks from initialTasks.js
  const [tasks, setTasks] = useState(initialTasks);

  // Adds a new task to the beginning of the task list
  function addTask(newTask) {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  // Toggles completion status of a task by its id
  function toggleTaskCompletion(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task,
      ),
    );
  }

  // Removes a task from the list by filtering it out using its id
  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  };
}
