function UpcomingPage({ tasks = [] }) {
  // Get today's date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Filter tasks that are not completed and scheduled after today
  const upcomingTasks = tasks.filter(
    (task) => !task.completed && task.dueDate && task.dueDate > todayString,
  );

  // Count tasks by priority level
  const highPriorityCount = upcomingTasks.filter(
    (task) => task.priority === "High",
  ).length;

  const mediumPriorityCount = upcomingTasks.filter(
    (task) => task.priority === "Medium",
  ).length;

  const lowPriorityCount = upcomingTasks.filter(
    (task) => task.priority === "Low",
  ).length;

  // Group upcoming tasks by due date
  const groupedTasks = upcomingTasks.reduce((groups, task) => {
    if (!groups[task.dueDate]) {
      groups[task.dueDate] = [];
    }

    groups[task.dueDate].push(task);
    return groups;
  }, {});

  // Sort grouped tasks chronologically by date
  const sortedGroupedTasks = Object.entries(groupedTasks).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB),
  );

  // Format date for display in section headers
  function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }

  function priorityColor(level) {
    if (level === "High") return "bg-red-100 text-red-600";
    if (level === "Medium") return "bg-orange-100 text-orange-600";
    return "bg-green-100 text-green-600";
  }

  return (
    <main className="max-w-5xl mx-auto px-8 py-10">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-950 mb-3">
          Upcoming Tasks
        </h1>

        <p className="text-xl text-slate-600">
          {upcomingTasks.length} tasks scheduled for the next week
        </p>
      </section>

      {highPriorityCount > 0 && (
        <section className="mb-10 rounded-2xl border border-orange-200 bg-orange-50 px-8 py-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-2xl">⚡</div>

            <div>
              <h2 className="text-2xl font-semibold text-orange-900 mb-2">
                You have {highPriorityCount} high-priority tasks
              </h2>
              <p className="text-xl text-orange-700">
                Make sure to schedule time for these important items
              </p>
            </div>
          </div>
        </section>
      )}

      {sortedGroupedTasks.length === 0 ? (
        <p className="text-lg text-slate-400">No upcoming tasks found.</p>
      ) : (
        <>
          {sortedGroupedTasks.map(([date, tasksForDate]) => (
            <section key={date} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl text-blue-600">📅</span>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {formatDate(date)}
                </h2>
              </div>

              <div className="grid gap-4">
                {tasksForDate.map((task) => (
                  <article
                    key={task.id}
                    className="flex items-center justify-between rounded-2xl bg-white px-5 py-5 shadow-sm border border-slate-200"
                  >
                    <span className="text-xl text-slate-950">{task.title}</span>

                    <div className="flex items-center gap-7">
                      <span
                        className={`rounded-full px-6 py-2 text-sm font-semibold ${priorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12 border-t border-slate-300 pt-6 bg-blue-200 py-5 rounded-2xl">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-slate-950">
                  {highPriorityCount}
                </p>
                <p className="mt-2 text-xl text-slate-600">High Priority</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-slate-950">
                  {mediumPriorityCount}
                </p>
                <p className="mt-2 text-xl text-slate-600">Medium Priority</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-slate-950">
                  {lowPriorityCount}
                </p>
                <p className="mt-2 text-xl text-slate-600">Low Priority</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default UpcomingPage;
