import { useState } from "react";

function TodayPage({
  tasks = [],
  addTask = () => {},
  toggleTaskCompletion = () => {},
  deleteTask = () => {},
}) {
  // Get today's date for header display
  const date = new Date();

  // Local state for new task form inputs
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  
  // Default due date is today
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Separate tasks into active and completed lists
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Calculate completion percentage
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  function handleSubmit(e) {
    e.preventDefault();

    // Prevent adding empty task titles
    if (!title.trim()) return;

    // Create new task object
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      dueDate,
      completedAt: null,
    };

    addTask(newTask);

    
    setTitle("");
    setPriority("Low");
    setDueDate(new Date().toISOString().split("T")[0]);
  }

  function priorityColor(level) {
    if (level === "High") return "bg-red-100 text-red-600";
    if (level === "Medium") return "bg-orange-100 text-orange-600";
    if (level === "Low") return "bg-green-100 text-green-600";

    // fallback if something unexpected happens
    return "bg-gray-100 text-gray-500";
  }
  return (
    <main className="flex flex-col items-center px-6 py-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Today's Tasks</h1>
        <h2 className="text-gray-500 capitalize">
          {date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-blue-600">
            {pendingTasks.length}
          </p>
          <p className="text-gray-500">Active Tasks</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-green-600">
            {completedTasks.length}
          </p>
          <p className="text-gray-500">Completed</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-orange-500">{progress}%</p>
          <p className="text-gray-500">Progress</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 w-full mb-6"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 bg-white"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Due date selector */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg px-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>

      <section className="w-full mb-6">
        <h2 className="text-xl font-semibold mb-3">Active Tasks</h2>

        {pendingTasks.length === 0 ? (
          <p className="text-gray-400">No active tasks</p>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-white shadow rounded-xl p-4 mb-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span>{task.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${priorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="w-full">
        <h2 className="text-xl font-semibold mb-3">Completed</h2>

        {completedTasks.length === 0 ? (
          <p className="text-gray-400">No completed tasks</p>
        ) : (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-white shadow rounded-xl p-4 mb-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className="line-through text-gray-400">{task.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${priorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default TodayPage;
