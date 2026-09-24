// System State Data
let currentUser = { name: "Jane Doe", role: "Student" };
let currentAuthMode = 'login';

let courses = [
  { id: 1, title: "Web Development Fundamentals", desc: "Learn HTML, CSS, JavaScript, and modern web principles.", enrolled: false, progress: 0 },
  { id: 2, title: "Data Science Essentials", desc: "Master Python, data analysis, and basic machine learning models.", enrolled: true, progress: 100 }
];

let assignments = [
  { id: 101, courseId: 1, title: "Build a Portfolio Page", status: "Pending", submission: "" },
  { id: 102, courseId: 2, title: "Data Cleaning Pipeline", status: "Graded", submission: "import pandas as pd..." }
];

let forumPosts = [
  { id: 1, author: "Alex R.", title: "How does Async/Await work under the hood?", text: "Can someone explain event loop queues in relation to promises?" },
  { id: 2, author: "Jane Doe", title: "Pandas DataFrame merging issue", text: "I keep getting duplicate index errors when outer joining two frames." }
];

let submissions = [
  { id: 201, student: "Alex R.", assignment: "Build a Portfolio Page", content: "github.com/alexr/portfolio", status: "Pending" },
  { id: 202, student: "Jane Doe", assignment: "Data Cleaning Pipeline", content: "colab.research.google.com/...", status: "Graded" }
];

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-date").innerText = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  renderCourses();
  renderAssignments();
  renderForum();
  renderGradingTable();
});

// Navigation Logic
function switchTab(tabId, element) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  
  document.getElementById(tabId).classList.add("active");
  if (element) {
    element.classList.add("active");
  }

  const titles = {
    courses: "Available Courses",
    assignments: "Assignments & Progress",
    forum: "Discussion Forum",
    instructor: "Course Creator",
    grading: "Grading Tools"
  };
  document.getElementById("page-title").innerText = titles[tabId];
}

// Role Switching Logic
function setRole(role) {
  currentUser.role = role;
  document.getElementById("user-role-text").innerText = role;
  
  const isInstructor = role === "Instructor";
  const instructorBtns = document.querySelectorAll(".instructor-only");
  
  instructorBtns.forEach(btn => {
    btn.style.display = isInstructor ? "block" : "none";
  });

  document.getElementById("btn-role-student").classList.toggle("active", !isInstructor);
  document.getElementById("btn-role-instructor").classList.toggle("active", isInstructor);

  // Return to courses view on role change
  const firstNavBtn = document.querySelectorAll(".nav-btn")[0];
  switchTab('courses', firstNavBtn);
}

// Authentication Logic
function openAuthModal(mode) {
  currentAuthMode = mode;
  const title = document.getElementById('auth-modal-title');
  const submitBtn = document.getElementById('auth-submit-btn');
  const registerFields = document.getElementById('register-fields');

  if (mode === 'register') {
    title.innerText = 'Register New Account';
    submitBtn.innerText = 'Register';
    registerFields.style.display = 'block';
  } else {
    title.innerText = 'Login';
    submitBtn.innerText = 'Login';
    registerFields.style.display = 'none';
  }

  document.getElementById('auth-modal').style.display = 'flex';
}

function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
  document.getElementById('auth-form').reset();
}

function handleAuth(event) {
  event.preventDefault();
  const email = document.getElementById('auth-email').value;

  if (currentAuthMode === 'register') {
    const name = document.getElementById('auth-name').value || 'User';
    const role = document.getElementById('auth-role').value;
    
    currentUser.name = name;
    setRole(role);
  } else {
    currentUser.name = email.split('@')[0] || 'User';
  }

  updateUserProfileUI();
  closeAuthModal();
}

function updateUserProfileUI() {
  document.getElementById('user-name').innerText = currentUser.name;
  
  // Create initials for avatar
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  document.getElementById('avatar-icon').innerText = initials || 'U';

  // Update top right header buttons to show logged-in state
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
    <div class="user-welcome">
      <span>Welcome, <strong>${currentUser.name}</strong></span>
      <button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button>
    </div>
  `;
}

function logout() {
  currentUser.name = "Guest User";
  document.getElementById('user-name').innerText = currentUser.name;
  document.getElementById('avatar-icon').innerText = 'GU';

  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
    <button class="btn btn-outline" onclick="openAuthModal('login')">Login</button>
    <button class="btn" onclick="openAuthModal('register')">Register</button>
  `;
}

// Render Courses
function renderCourses() {
  const grid = document.getElementById("courses-grid");
  grid.innerHTML = courses.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      ${c.enrolled ? `
        <div>
          <div class="progress-container">
            <span>Progress</span>
            <span>${c.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${c.progress}%"></div>
          </div>
        </div>
        ${c.progress === 100 
          ? `<button class="btn btn-cert" onclick="viewCertificate('${c.title}')">📜 View Certificate</button>` 
          : `<button class="btn btn-secondary" disabled>Enrolled</button>`
        }
      ` : `
        <button class="btn" onclick="enrollCourse(${c.id})">Enroll Now</button>
      `}
    </div>
  `).join("");
}

function enrollCourse(id) {
  const course = courses.find(c => c.id === id);
  if (course) {
    course.enrolled = true;
    renderCourses();
  }
}

// Render Assignments
function renderAssignments() {
  const grid = document.getElementById("assignments-grid");
  grid.innerHTML = assignments.map(a => `
    <div class="card">
      <h3>${a.title}</h3>
      <p>Status: <span class="badge ${a.status === 'Graded' ? 'badge-success' : 'badge-pending'}">${a.status}</span></p>
      ${a.status === 'Pending' ? `
        <textarea id="sub-input-${a.id}" placeholder="Paste URL or response..." rows="2"></textarea>
        <button class="btn" onclick="submitAssignment(${a.id})">Submit Assignment</button>
      ` : `
        <p class="cert-subtext">Submission: ${a.submission}</p>
      `}
    </div>
  `).join("");
}

function submitAssignment(id) {
  const val = document.getElementById(`sub-input-${id}`).value;
  if (!val) return alert("Please enter submission content.");
  
  const assign = assignments.find(a => a.id === id);
  assign.status = "Submitted";
  assign.submission = val;

  submissions.push({
    id: Date.now(),
    student: currentUser.name,
    assignment: assign.title,
    content: val,
    status: "Pending"
  });

  renderAssignments();
  renderGradingTable();
}

// Render Discussion Forum
function renderForum() {
  const list = document.getElementById("forum-list");
  list.innerHTML = forumPosts.map(p => `
    <div class="forum-post">
      <h4>${p.title}</h4>
      <p>${p.text}</p>
      <div class="forum-meta">Posted by ${p.author}</div>
    </div>
  `).join("");
}

function addForumPost(e) {
  e.preventDefault();
  const title = document.getElementById("forum-title").value;
  const text = document.getElementById("forum-body").value;
  
  forumPosts.unshift({ id: Date.now(), author: currentUser.name, title, text });
  document.getElementById("forum-form").reset();
  renderForum();
}

// Instructor: Course Creation
function createCourse(e) {
  e.preventDefault();
  const title = document.getElementById("new-course-title").value;
  const desc = document.getElementById("new-course-desc").value;

  courses.push({ id: Date.now(), title, desc, enrolled: false, progress: 0 });
  alert("Course published successfully!");
  e.target.reset();
  renderCourses();
  
  const firstNavBtn = document.querySelectorAll(".nav-btn")[0];
  switchTab('courses', firstNavBtn);
}

// Instructor: Grading Tools
function renderGradingTable() {
  const tbody = document.getElementById("grading-table-body");
  tbody.innerHTML = submissions.map(s => `
    <tr>
      <td>${s.student}</td>
      <td>${s.assignment}</td>
      <td><code>${s.content}</code></td>
      <td><span class="badge ${s.status === 'Graded' ? 'badge-success' : 'badge-pending'}">${s.status}</span></td>
      <td>
        ${s.status === 'Pending' 
          ? `<button class="btn btn-sm" onclick="gradeSubmission(${s.id})">Mark Graded</button>` 
          : 'Completed'
        }
      </td>
    </tr>
  `).join("");
}

function gradeSubmission(id) {
  const sub = submissions.find(s => s.id === id);
  if (sub) {
    sub.status = "Graded";
    renderGradingTable();
  }
}

// Certificate Generator Modal
function viewCertificate(courseTitle) {
  document.getElementById("cert-student-name").innerText = currentUser.name;
  document.getElementById("cert-course-name").innerText = courseTitle;
  document.getElementById("cert-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("cert-modal").style.display = "none";
}

