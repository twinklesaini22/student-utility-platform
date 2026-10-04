const STORAGE_KEYS = {
  users: "studentUtilityUsers",
  announcements: "studentUtilityAnnouncements",
  events: "studentUtilityEvents",
  resources: "studentUtilityResources",
  assignments: "studentUtilityAssignments",
  discussions: "studentUtilityDiscussions",
  currentUser: "studentUtilityCurrentUser"
};

const defaultUsers = [
  { id: 1, name: "Aisha Sharma", email: "student@college.edu", password: "student123", role: "student" },
  { id: 2, name: "Rahul Mehta", email: "teacher@college.edu", password: "teacher123", role: "teacher" },
  { id: 3, name: "Priya Singh", email: "admin@college.edu", password: "admin123", role: "administrator" }
];

const defaultAnnouncements = [
  { id: 1, title: "Semester Registration Open", text: "Registration for the upcoming semester is now open for all students. Please complete the form by Friday.", date: "2026-10-10" },
  { id: 2, title: "Science Expo", text: "The annual Science Expo is scheduled next week with project demonstrations and guest speakers.", date: "2026-10-12" },
  { id: 3, title: "Library Hours Updated", text: "The central library will extend timings during exam week starting Monday.", date: "2026-10-08" }
];

const defaultEvents = [
  { id: 1, name: "Campus Fest 2026", venue: "Main Auditorium", type: "Festival", date: "2026-10-14" },
  { id: 2, name: "UI/UX Design Workshop", venue: "Innovation Lab", type: "Workshop", date: "2026-10-16" },
  { id: 3, name: "Career Guidance Seminar", venue: "Conference Hall", type: "Seminar", date: "2026-10-19" }
];

const defaultResources = [
  { id: 1, title: "Data Structures Notes", course: "Computer Science", category: "Notes", url: "https://example.com/dsa-notes" },
  { id: 2, title: "Calculus Revision Sheet", course: "Mathematics", category: "Revision", url: "https://example.com/calculus-revision" },
  { id: 3, title: "Lab Manual", course: "Physics", category: "Practical", url: "https://example.com/lab-manual" }
];

const defaultAssignments = [
  { id: 1, title: "Web Development Project", subject: "Computer Science", dueDate: "2026-10-18", status: "pending" },
  { id: 2, title: "Research Summary", subject: "Business", dueDate: "2026-10-11", status: "in-progress" },
  { id: 3, title: "Lab Report", subject: "Physics", dueDate: "2026-10-07", status: "completed" }
];

const defaultDiscussions = [
  { id: 1, topic: "Need help with JavaScript arrays", message: "Can anyone explain the difference between map and forEach with a simple example?", user: "Aisha Sharma" },
  { id: 2, topic: "Project team formation", message: "I am looking for teammates for the final group project. Please reply if interested.", user: "Student" }
];

function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.announcements)) {
    localStorage.setItem(STORAGE_KEYS.announcements, JSON.stringify(defaultAnnouncements));
  }
  if (!localStorage.getItem(STORAGE_KEYS.events)) {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(defaultEvents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.resources)) {
    localStorage.setItem(STORAGE_KEYS.resources, JSON.stringify(defaultResources));
  }
  if (!localStorage.getItem(STORAGE_KEYS.assignments)) {
    localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(defaultAssignments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.discussions)) {
    localStorage.setItem(STORAGE_KEYS.discussions, JSON.stringify(defaultDiscussions));
  }
}

function getData(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCurrentUser() {
  const user = localStorage.getItem(STORAGE_KEYS.currentUser);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

function showDashboardIfAuthenticated() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
    return null;
  }
  return currentUser;
}

function setupDemoLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  ensureSeedData();

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const users = getData(STORAGE_KEYS.users);
    const matchingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password && user.role === role
    );

    if (!matchingUser) {
      alert("Invalid credentials for the selected role. Try one of the demo accounts shown below.");
      return;
    }

    setCurrentUser(matchingUser);
    window.location.href = "dashboard.html";
  });
}

function renderUserSummary() {
  const user = getCurrentUser();
  if (!user) return;

  const userRoleBadge = document.getElementById("userRoleBadge");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const dashboardTitle = document.getElementById("dashboardTitle");

  if (userRoleBadge) userRoleBadge.textContent = user.role;
  if (userName) userName.textContent = user.name;
  if (userEmail) userEmail.textContent = user.email;
  if (dashboardTitle) dashboardTitle.textContent = `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
}

function getDaysUntil(dateString) {
  const today = new Date();
  const targetDate = new Date(dateString + "T00:00:00");
  const difference = targetDate - today;
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function renderAnnouncements() {
  const list = document.getElementById("announcementList");
  if (!list) return;
  const items = getData(STORAGE_KEYS.announcements);

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No announcements yet.</div>';
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
        <div class="item-box">
          <h4>${item.title}</h4>
          <div class="meta-row">
            <span>${new Date(item.date).toLocaleDateString()}</span>
          </div>
          <p>${item.text}</p>
        </div>
      `
    )
    .join("");
}

function renderEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;
  const items = getData(STORAGE_KEYS.events);

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No upcoming events found.</div>';
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
        <div class="item-box">
          <h4>${item.name}</h4>
          <div class="meta-row">
            <span>${new Date(item.date).toLocaleDateString()}</span>
            <span>${item.venue}</span>
            <span class="tag">${item.type}</span>
          </div>
        </div>
      `
    )
    .join("");
}

function renderResources() {
  const list = document.getElementById("resourceList");
  if (!list) return;
  const searchTerm = document.getElementById("resourceSearch")?.value.toLowerCase() || "";
  const filter = document.getElementById("resourceFilter")?.value || "all";
  const items = getData(STORAGE_KEYS.resources).filter((resource) => {
    const matchesText =
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.course.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm);
    const matchesFilter = filter === "all" || resource.course === filter;
    return matchesText && matchesFilter;
  });

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No matching resources found.</div>';
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
        <div class="resource-card">
          <span class="tag">${item.category}</span>
          <h4>${item.title}</h4>
          <div class="meta-row">
            <span>${item.course}</span>
          </div>
          <a href="${item.url}" target="_blank" rel="noreferrer">Open resource</a>
        </div>
      `
    )
    .join("");
}

function renderAssignments() {
  const list = document.getElementById("assignmentList");
  if (!list) return;
  const items = getData(STORAGE_KEYS.assignments);

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No assignments added yet.</div>';
    return;
  }

  list.innerHTML = items
    .map((item) => {
      const dueDays = getDaysUntil(item.dueDate);
      let statusClass = "pending";
      if (item.status === "completed") statusClass = "completed";
      if (item.status === "in-progress") statusClass = "in-progress";
      if (dueDays < 0 && item.status !== "completed") statusClass = "overdue";

      return `
        <div class="item-box assignment-item">
          <div>
            <h4>${item.title}</h4>
            <div class="meta-row">
              <span>${item.subject}</span>
              <span>Due: ${new Date(item.dueDate).toLocaleDateString()}</span>
              <span>${dueDays < 0 ? "Overdue by " + Math.abs(dueDays) + " days" : dueDays + " days left"}</span>
            </div>
            <span class="tag ${statusClass}">${item.status}</span>
          </div>
          <div class="assignment-actions">
            <button class="status-btn" data-action="toggle-status" data-id="${item.id}">Mark done</button>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll('[data-action="toggle-status"]').forEach((button) => {
    button.addEventListener("click", function () {
      const assignmentId = Number(this.dataset.id);
      const assignments = getData(STORAGE_KEYS.assignments);
      const updatedAssignments = assignments.map((item) =>
        item.id === assignmentId ? { ...item, status: item.status === "completed" ? "pending" : "completed" } : item
      );
      saveData(STORAGE_KEYS.assignments, updatedAssignments);
      renderDashboard();
    });
  });
}

function renderDiscussions() {
  const list = document.getElementById("discussionList");
  if (!list) return;
  const items = getData(STORAGE_KEYS.discussions);

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No discussion posts yet. Start the conversation.</div>';
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
        <div class="discussion-item">
          <span class="tag">${item.user}</span>
          <h4>${item.topic}</h4>
          <p>${item.message}</p>
        </div>
      `
    )
    .join("");
}

function renderStats() {
  const announcementCount = document.getElementById("announcementCount");
  const eventCount = document.getElementById("eventCount");
  const resourceCount = document.getElementById("resourceCount");
  const pendingTasks = document.getElementById("pendingTasks");

  if (announcementCount) announcementCount.textContent = getData(STORAGE_KEYS.announcements).length;
  if (eventCount) eventCount.textContent = getData(STORAGE_KEYS.events).length;
  if (resourceCount) resourceCount.textContent = getData(STORAGE_KEYS.resources).length;
  if (pendingTasks) {
    const pending = getData(STORAGE_KEYS.assignments).filter((item) => item.status !== "completed").length;
    pendingTasks.textContent = pending;
  }
}

function renderDashboard() {
  ensureSeedData();
  renderUserSummary();
  renderStats();
  renderAnnouncements();
  renderEvents();
  renderResources();
  renderAssignments();
  renderDiscussions();
}

function setupDashboard() {
  const user = showDashboardIfAuthenticated();
  if (!user) return;

  ensureSeedData();
  renderDashboard();

  document.getElementById("refreshDataBtn")?.addEventListener("click", renderDashboard);
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearCurrentUser();
    window.location.href = "login.html";
  });

  document.getElementById("resourceSearch")?.addEventListener("input", renderResources);
  document.getElementById("resourceFilter")?.addEventListener("change", renderResources);

  document.getElementById("addAnnouncementBtn")?.addEventListener("click", () => {
    document.getElementById("announcementFormContainer").classList.toggle("hidden");
  });

  document.getElementById("addEventBtn")?.addEventListener("click", () => {
    document.getElementById("eventFormContainer").classList.toggle("hidden");
  });

  document.getElementById("addResourceBtn")?.addEventListener("click", () => {
    document.getElementById("resourceFormContainer").classList.toggle("hidden");
  });

  document.getElementById("addAssignmentBtn")?.addEventListener("click", () => {
    document.getElementById("assignmentFormContainer").classList.toggle("hidden");
  });

  document.getElementById("announcementForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("announcementTitle").value.trim();
    const text = document.getElementById("announcementText").value.trim();
    const date = document.getElementById("announcementDate").value;

    if (!title || !text || !date) return;

    const announcements = getData(STORAGE_KEYS.announcements);
    announcements.unshift({ id: Date.now(), title, text, date });
    saveData(STORAGE_KEYS.announcements, announcements);
    event.target.reset();
    renderDashboard();
    document.getElementById("announcementFormContainer").classList.add("hidden");
  });

  document.getElementById("eventForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("eventName").value.trim();
    const venue = document.getElementById("eventVenue").value.trim();
    const type = document.getElementById("eventType").value.trim();
    const date = document.getElementById("eventDate").value;

    if (!name || !venue || !type || !date) return;

    const events = getData(STORAGE_KEYS.events);
    events.unshift({ id: Date.now(), name, venue, type, date });
    saveData(STORAGE_KEYS.events, events);
    event.target.reset();
    renderDashboard();
    document.getElementById("eventFormContainer").classList.add("hidden");
  });

  document.getElementById("resourceForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("resourceTitle").value.trim();
    const course = document.getElementById("resourceCourse").value.trim();
    const category = document.getElementById("resourceCategory").value.trim();
    const url = document.getElementById("resourceUrl").value.trim();

    if (!title || !course || !category || !url) return;

    const resources = getData(STORAGE_KEYS.resources);
    resources.unshift({ id: Date.now(), title, course, category, url });
    saveData(STORAGE_KEYS.resources, resources);
    event.target.reset();
    renderDashboard();
    document.getElementById("resourceFormContainer").classList.add("hidden");
  });

  document.getElementById("assignmentForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("assignmentTitle").value.trim();
    const subject = document.getElementById("assignmentSubject").value.trim();
    const dueDate = document.getElementById("assignmentDate").value;
    const status = document.getElementById("assignmentStatus").value;

    if (!title || !subject || !dueDate) return;

    const assignments = getData(STORAGE_KEYS.assignments);
    assignments.unshift({ id: Date.now(), title, subject, dueDate, status });
    saveData(STORAGE_KEYS.assignments, assignments);
    event.target.reset();
    renderDashboard();
    document.getElementById("assignmentFormContainer").classList.add("hidden");
  });

  document.getElementById("discussionForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const topic = document.getElementById("discussionTopic").value.trim();
    const message = document.getElementById("discussionMessage").value.trim();

    if (!topic || !message) return;

    const discussions = getData(STORAGE_KEYS.discussions);
    discussions.unshift({ id: Date.now(), topic, message, user: user.name });
    saveData(STORAGE_KEYS.discussions, discussions);
    event.target.reset();
    renderDashboard();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  ensureSeedData();
  setupDemoLogin();
  setupDashboard();
});
