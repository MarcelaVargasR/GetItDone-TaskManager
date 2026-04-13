
// Get today's date
const today = new Date()
const todayString = today.toISOString().split("T")[0]

// Create a date for tomorrow
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

// Create a date two days later
const twoDaysLater = new Date()
twoDaysLater.setDate(today.getDate() + 2)

// Create a date for yesterday
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

// Initial sample tasks used to populate the app state
const initialTasks = [
  {
    id: 1,
    title: "Buy groceries",
    priority: "High",
    completed: false,
    dueDate: todayString,
    completedAt: null,
  },
  {
    id: 2,
    title: "Reply to emails",
    priority: "Medium",
    completed: false,
    dueDate: todayString,
    completedAt: null,
  },
  {
    id: 3,
    title: "Study React routing",
    priority: "Medium",
    completed: false,
    dueDate: tomorrow.toISOString().split("T")[0],
    completedAt: null,
  },
  {
    id: 4,
    title: "Finish homework",
    priority: "Low",
    completed: true,
    dueDate: tomorrow.toISOString().split("T")[0],
    completedAt: null,
  },
  {
    id: 5,
    title: "Workout session",
    priority: "Low",
    completed: false,
    dueDate: yesterday.toISOString().split("T")[0],
    completedAt: yesterday.toISOString(),
  },
  {
    id: 6,
    title: "Call the dentist",
    priority: "High",
    completed: true,
    dueDate: yesterday.toISOString().split("T")[0],
    completedAt: yesterday.toISOString(),
  },
  {
    id: 7,
    title: "Finish homework",
    priority: "High",
    completed: false,
    dueDate: twoDaysLater.toISOString().split("T")[0],
    completedAt: twoDaysLater.toISOString(),
  },
  {
    id: 8,
    title: "Read 20 pages of a book",
    priority: "Low",
    completed: true,
    dueDate: twoDaysLater.toISOString().split("T")[0],
    completedAt: twoDaysLater.toISOString(),
  },
]

export default initialTasks