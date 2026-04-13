function CompletedPage({ tasks = [], deleteTask = () => {} }) {
  // Keep only tasks marked as completed
  const completedTasks = tasks.filter((task) => task.completed);

  // Count total completed tasks
  const totalCompleted = completedTasks.length;

  // Estimate total time invested based on task priority
  const timeInvestedHours = completedTasks.reduce((total, task) => {
    if (task.priority === "High") return total + 3;
    if (task.priority === "Medium") return total + 2;
    return total + 1;
  }, 0);

  // Create date range for "completed this week" calculation
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Count tasks completed within the last 7 days
  const completedThisWeek = completedTasks.filter((task) => {
    if (!task.completedAt) return false;

    const completedDate = new Date(task.completedAt);
    return completedDate >= sevenDaysAgo && completedDate <= now;
  }).length;

  // Group completed tasks by completion date
  const groupedCompletedTasks = completedTasks.reduce((groups, task) => {
    const dateKey = task.completedAt
      ? task.completedAt.split("T")[0]
      : task.dueDate;

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(task);
    return groups;
  }, {});

  // Sort grouped tasks so the most recent completion date appears first
  const sortedGroupedCompletedTasks = Object.entries(
    groupedCompletedTasks,
  ).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));

  // Format date for section headers
  function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  function getCompletionLabel(priority) {
    if (priority === "High") return "Completed in 3h";
    if (priority === "Medium") return "Completed in 2h";
    return "Completed in 1h";
  }

  return (
    <main className="max-w-5xl mx-auto px-8 py-10">
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl text-orange-500">🏆</span>
          <h1 className="text-4xl font-bold text-slate-950">Completed Tasks</h1>
        </div>

        <p className="text-xl text-slate-600">
          View your achievements and progress
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl border border-green-300 bg-green-50 px-8 py-8 shadow-sm">
          <p className="text-4xl font-bold text-green-600 mb-4 text-center">
            {totalCompleted}
          </p>
          <p className="text-2xl text-green-700 text-center">Tasks Completed</p>
        </div>

        <div className="rounded-2xl border border-blue-300 bg-blue-100 px-8 py-8 shadow-sm">
          <p className="text-4xl font-bold text-blue-600 mb-4 text-center">
            {completedThisWeek}
          </p>
          <p className="text-2xl text-blue-700 text-center">This Week</p>
        </div>

        <div className="rounded-2xl border border-orange-300 bg-orange-50 px-8 py-8 shadow-sm">
          <p className="text-4xl font-bold text-orange-600 mb-4 text-center">
            {timeInvestedHours}h
          </p>
          <p className="text-2xl text-orange-700 text-center">Time Invested</p>
        </div>
      </section>

      {totalCompleted > 0 && (
        <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-950 px-8 py-8 shadow-sm">
          <div className="flex items-start gap-5">
            <span className="text-4xl">🎉</span>

            <div>
              <h2 className="text-3xl font-semibold text-green-100 mb-2">
                Great job!
              </h2>
              <p className="text-2xl text-green-200">
                You’ve completed {totalCompleted} tasks. Keep up the good work!
              </p>
            </div>
          </div>
        </section>
      )}

      {sortedGroupedCompletedTasks.length === 0 ? (
        <p className="text-lg text-slate-400">No completed tasks yet.</p>
      ) : (
        sortedGroupedCompletedTasks.map(([date, tasksForDate]) => (
          <section key={date} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl text-green-600">🗓️</span>

              <h2 className="text-2xl font-semibold text-slate-950">
                {formatDate(date)}
              </h2>

              <span className="text-2xl text-slate-500">
                ({tasksForDate.length})
              </span>
            </div>

            <div className="grid gap-4">
              {tasksForDate.map((task) => (
                <article
                  key={task.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-green-600">✅</span>

                    <div>
                      <p className="text-xl text-slate-700 line-through">
                        {task.title}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {getCompletionLabel(task.priority)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="text-2xl text-slate-500 hover:text-red-500"
                    aria-label={`Delete ${task.title}`}
                  >
                    ✕
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

export default CompletedPage;
