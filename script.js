/* =====================================================
   EDU PORTAL LMS
   Main JavaScript
===================================================== */


/* =====================================================
   DEFAULT DATA
===================================================== */

const defaultData = {

    courses: [

        {
            id: 1,
            title: "Web Development Fundamentals",
            desc: "Learn HTML, CSS, JavaScript, and modern web principles.",
            enrolled: false,
            progress: 0
        },

        {
            id: 2,
            title: "Data Science Essentials",
            desc: "Master Python, data analysis, and basic machine learning models.",
            enrolled: true,
            progress: 100
        },

        {
            id: 3,
            title: "Java Programming",
            desc: "Learn object-oriented programming, inheritance, polymorphism and exceptions.",
            enrolled: false,
            progress: 0
        }

    ],


    assignments: [

        {
            id: 101,
            courseId: 1,
            title: "Build a Portfolio Page",
            status: "Pending",
            submission: ""
        },

        {
            id: 102,
            courseId: 2,
            title: "Data Cleaning Pipeline",
            status: "Graded",
            submission: "import pandas as pd..."
        }

    ],


    forumPosts: [

        {
            id: 1,
            author: "Alex R.",
            title: "How does Async/Await work?",
            text: "Can someone explain event loop queues in relation to promises?"
        },

        {
            id: 2,
            author: "Jane Doe",
            title: "Pandas DataFrame merging issue",
            text: "I keep getting duplicate index errors when outer joining two frames."
        }

    ],


    submissions: [

        {
            id: 201,
            student: "Alex R.",
            assignment: "Build a Portfolio Page",
            content: "github.com/alexr/portfolio",
            status: "Pending"
        },

        {
            id: 202,
            student: "Jane Doe",
            assignment: "Data Cleaning Pipeline",
            content: "colab.research.google.com/...",
            status: "Graded"
        }

    ]

};


/* =====================================================
   LOCAL STORAGE
===================================================== */

function loadData() {

    let data =
        JSON.parse(
            localStorage.getItem(
                "eduportalData"
            )
        );


    if (!data) {

        data = defaultData;

        saveData(data);

    }


    return data;
}


function saveData(data) {

    localStorage.setItem(
        "eduportalData",
        JSON.stringify(data)
    );

}


/* =====================================================
   CURRENT USER
===================================================== */

function currentUser() {

    return JSON.parse(
        localStorage.getItem(
            "eduportalUser"
        ) || "null"
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (toast) {

        toast.textContent = message;

        toast.classList.add("show");


        setTimeout(
            () => {

                toast.classList.remove("show");

            },
            2500
        );

    }

    else {

        alert(message);

    }

}


/* =====================================================
   INITIALS
===================================================== */

function initials(name) {

    return (

        name || "User"

    )
        .split(" ")
        .map(
            word => word[0]
        )
        .join("")
        .slice(0, 2)
        .toUpperCase();

}


/* =====================================================
   PAGE LOADING
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const page =
            location.pathname
                .split("/")
                .pop()
            || "index.html";


        if (page === "login.html") {

            setupLogin();

        }


        if (page === "register.html") {

            setupRegister();

        }


        if (page === "user.html") {

            setupUser();

        }


        if (page === "admin.html") {

            setupAdmin();

        }

    }
);


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    document
        .getElementById("login-form")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document
                        .getElementById(
                            "login-email"
                        )
                        .value
                        .trim();


                let role = "Student";


                if (
                    email
                        .toLowerCase()
                        .includes(
                            "instructor"
                        )
                ) {

                    role = "Instructor";

                }


                const name =
                    email
                        .split("@")[0]
                        .replace(
                            /[._-]/g,
                            " "
                        );


                const user = {

                    name:
                        name.replace(
                            /\b\w/g,
                            c =>
                                c.toUpperCase()
                        ),

                    email: email,

                    role: role

                };


                localStorage.setItem(
                    "eduportalUser",
                    JSON.stringify(user)
                );


                if (
                    role ===
                    "Instructor"
                ) {

                    location.href =
                        "admin.html";

                }

                else {

                    location.href =
                        "user.html";

                }

            }
        );

}


/* =====================================================
   REGISTER
===================================================== */

function setupRegister() {

    document
        .getElementById(
            "register-form"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "reg-name"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "reg-email"
                        )
                        .value
                        .trim();


                const role =
                    document
                        .getElementById(
                            "reg-role"
                        )
                        .value;


                const user = {

                    name: name,

                    email: email,

                    role: role

                };


                localStorage.setItem(
                    "eduportalUser",
                    JSON.stringify(user)
                );


                showToast(
                    "Account created successfully!"
                );


                setTimeout(
                    () => {

                        if (
                            role ===
                            "Instructor"
                        ) {

                            location.href =
                                "admin.html";

                        }

                        else {

                            location.href =
                                "user.html";

                        }

                    },
                    500
                );

            }
        );

}


/* =====================================================
   TABS
===================================================== */

function tabs(
    selector,
    sections,
    titleElement
) {

    document
        .querySelectorAll(
            selector
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {


                        document
                            .querySelectorAll(
                                selector
                            )
                            .forEach(
                                item =>
                                    item.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        document
                            .querySelectorAll(
                                sections
                            )
                            .forEach(
                                section =>
                                    section.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        button.classList.add(
                            "active"
                        );


                        const tab =
                            button.dataset.tab;


                        const section =
                            document.getElementById(
                                tab
                            );


                        if (section) {

                            section.classList.add(
                                "active"
                            );

                        }


                        if (
                            titleElement
                        ) {

                            titleElement.textContent =
                                button
                                    .querySelector(
                                        "span"
                                    )
                                    ?.textContent
                                ||
                                "Dashboard";

                        }

                    }
                );

            }
        );

}


/* =====================================================
   STUDENT DASHBOARD
===================================================== */

function setupUser() {

    const user =
        currentUser()
        ||
        {
            name: "Jane Doe",
            role: "Student"
        };


    document.getElementById(
        "side-name"
    ).textContent =
        user.name;


    document.getElementById(
        "header-name"
    ).textContent =
        user.name;


    document.getElementById(
        "avatar"
    ).textContent =
        initials(user.name);


    document.getElementById(
        "date"
    ).textContent =
        new Date().toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );


    tabs(
        ".side-btn",
        ".dash-section",
        document.getElementById(
            "page-title"
        )
    );


    document
        .getElementById(
            "logout-btn"
        )
        .onclick =
        () => logout();


    renderStudent();


    document
        .getElementById(
            "forum-form"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const data =
                    loadData();


                data.forumPosts.unshift({

                    id: Date.now(),

                    author:
                        user.name,

                    title:
                        document
                            .getElementById(
                                "forum-title"
                            )
                            .value,

                    text:
                        document
                            .getElementById(
                                "forum-body"
                            )
                            .value

                });


                saveData(data);


                event.target.reset();


                renderForum();


                showToast(
                    "Question posted!"
                );

            }
        );

}


/* =====================================================
   RENDER STUDENT
===================================================== */

function renderStudent() {

    const data =
        loadData();


    document.getElementById(
        "course-count"
    ).textContent =
        data.courses.length;


    document.getElementById(
        "assignment-count"
    ).textContent =
        data.assignments.length;


    const enrolled =
        data.courses.filter(
            course =>
                course.enrolled
        );


    const average =
        enrolled.length
        ?
        Math.round(
            enrolled.reduce(
                (sum, course) =>
                    sum +
                    course.progress,
                0
            ) /
            enrolled.length
        )
        :
        0;


    document.getElementById(
        "completed-count"
    ).textContent =
        average + "%";


    document.getElementById(
        "course-grid"
    ).innerHTML =

        data.courses
            .map(
                course => `

                <article class="course-card">

                    <div class="course-top">

                        <span class="course-icon">
                            📘
                        </span>

                        <span class="pill">
                            ${
                                course.enrolled
                                ?
                                "Enrolled"
                                :
                                "Available"
                            }
                        </span>

                    </div>


                    <h3>
                        ${course.title}
                    </h3>


                    <p>
                        ${course.desc}
                    </p>


                    ${
                        course.enrolled

                        ?

                        `

                        <div class="progress-label">

                            <span>
                                Progress
                            </span>

                            <b>
                                ${course.progress}%
                            </b>

                        </div>


                        <div class="progress">

                            <i
                                style="
                                width:${course.progress}%
                                "
                            ></i>

                        </div>


                        ${
                            course.progress === 100

                            ?

                            `

                            <button
                                class="btn certificate-btn"
                                onclick="viewCertificate('${escapeHtml(course.title)}')"
                            >

                                📜
                                View Certificate

                            </button>

                            `

                            :

                            `

                            <button
                                class="btn btn-muted"
                                disabled
                            >

                                Enrolled

                            </button>

                            `
                        }

                        `

                        :

                        `

                        <button
                            class="btn"
                            onclick="enroll(${course.id})"
                        >

                            Enroll Now

                        </button>

                        `
                    }

                </article>

                `
            )
            .join("");


    renderAssignments();

    renderForum();

    renderCertificates();

}


/* =====================================================
   ENROLL COURSE
===================================================== */

function enroll(id) {

    const data =
        loadData();


    const course =
        data.courses.find(
            item =>
                item.id === id
        );


    if (course) {

        course.enrolled = true;

        course.progress = 0;


        saveData(data);


        renderStudent();


        showToast(
            "Course enrolled successfully!"
        );

    }

}


/* =====================================================
   ASSIGNMENTS
===================================================== */

function renderAssignments() {

    const data =
        loadData();


    document.getElementById(
        "assignment-grid"
    ).innerHTML =

        data.assignments
            .map(
                assignment => `

                <article class="assignment-card">

                    <div class="course-top">

                        <span class="course-icon">
                            📝
                        </span>

                        <span
                            class="
                            badge
                            ${
                                assignment.status ===
                                "Graded"
                                ?
                                "success"
                                :
                                "pending"
                            }
                            "
                        >

                            ${assignment.status}

                        </span>

                    </div>


                    <h3>
                        ${assignment.title}
                    </h3>


                    ${
                        assignment.status ===
                        "Pending"

                        ?

                        `

                        <textarea
                            id="sub-${assignment.id}"
                            rows="3"
                            placeholder="
                            Paste URL or response...
                            "
                        ></textarea>


                        <button
                            class="btn"
                            onclick="
                            submitAssignment(
                                ${assignment.id}
                            )
                            "
                        >

                            Submit Assignment

                        </button>

                        `

                        :

                        `

                        <p class="muted">

                            Submission:
                            ${assignment.submission}

                        </p>

                        `
                    }

                </article>

                `
            )
            .join("");

}


/* =====================================================
   SUBMIT ASSIGNMENT
===================================================== */

function submitAssignment(id) {

    const data =
        loadData();


    const input =
        document.getElementById(
            "sub-" + id
        );


    if (
        !input.value.trim()
    ) {

        showToast(
            "Please enter your submission."
        );

        return;

    }


    const assignment =
        data.assignments.find(
            item =>
                item.id === id
        );


    assignment.status =
        "Submitted";


    assignment.submission =
        input.value.trim();


    const user =
        currentUser()
        ||
        {
            name: "Student"
        };


    data.submissions.push({

        id: Date.now(),

        student:
            user.name,

        assignment:
            assignment.title,

        content:
            assignment.submission,

        status:
            "Pending"

    });


    saveData(data);


    renderStudent();


    showToast(
        "Assignment submitted!"
    );

}


/* =====================================================
   FORUM
===================================================== */

function renderForum() {

    const data =
        loadData();


    const element =
        document.getElementById(
            "forum-list"
        );


    if (!element)
        return;


    element.innerHTML =

        data.forumPosts
            .map(
                post => `

                <div class="forum-post">

                    <h3>
                        ${escapeHtml(post.title)}
                    </h3>

                    <p>
                        ${escapeHtml(post.text)}
                    </p>

                    <small>
                        Posted by
                        ${escapeHtml(post.author)}
                    </small>

                </div>

                `
            )
            .join("");

}


/* =====================================================
   CERTIFICATES
===================================================== */

function renderCertificates() {

    const data =
        loadData();


    const user =
        currentUser()
        ||
        {
            name: "Student"
        };


    const completed =
        data.courses.filter(
            course =>
                course.enrolled &&
                course.progress === 100
        );


    const element =
        document.getElementById(
            "certificate-list"
        );


    if (!element)
        return;


    if (
        completed.length === 0
    ) {

        element.innerHTML = `

            <div class="empty">

                <div>
                    📜
                </div>

                <h2>
                    No certificates yet
                </h2>

                <p>
                    Complete an enrolled course
                    to receive your certificate.
                </p>

            </div>

        `;

        return;

    }


    element.innerHTML =

        completed
            .map(
                course => `

                <div class="certificate">

                    <span>
                        🏆
                    </span>


                    <div>

                        <small>
                            CERTIFICATE OF COMPLETION
                        </small>

                        <h2>
                            ${escapeHtml(
                                course.title
                            )}
                        </h2>

                        <p>

                            This certifies that

                            <b>
                                ${escapeHtml(
                                    user.name
                                )}
                            </b>

                            successfully completed
                            this course.

                        </p>

                    </div>


                    <button
                        class="btn"
                        onclick="
                        viewCertificate(
                            '${escapeHtml(
                                course.title
                            )}'
                        )
                        "
                    >

                        View

                    </button>

                </div>

                `
            )
            .join("");

}


/* =====================================================
   CERTIFICATE WINDOW
===================================================== */

function viewCertificate(title) {

    const user =
        currentUser()
        ||
        {
            name: "Student"
        };


    const certificate =
        window.open(
            "",
            "_blank",
            "width=900,height=650"
        );


    certificate.document.write(`

        <html>

        <head>

            <title>
                Certificate
            </title>


            <style>

                body {

                    font-family:
                        Arial;

                    background:
                        #f4f7fb;

                    padding:
                        50px;

                    text-align:
                        center;

                }


                .cert {

                    background:
                        white;

                    border:
                        12px double
                        #1e63ee;

                    padding:
                        70px;

                }


                .gold {

                    font-size:
                        48px;

                }


                h1 {

                    font-size:
                        42px;

                    color:
                        #1e63ee;

                }


                h2 {

                    font-size:
                        30px;

                    margin:
                        30px;

                }

            </style>

        </head>


        <body>


            <div class="cert">

                <div class="gold">
                    🏆
                </div>


                <h1>
                    Certificate of Completion
                </h1>


                <p>
                    This certifies that
                </p>


                <h2>
                    ${escapeHtml(user.name)}
                </h2>


                <p>
                    has successfully completed
                    the course
                </p>


                <h2>
                    ${escapeHtml(title)}
                </h2>


                <p>
                    EduPortal •
                    ${new Date().getFullYear()}
                </p>


                <button
                    onclick="window.print()"
                >

                    Print / Save PDF

                </button>

            </div>


        </body>

        </html>

    `);


    certificate.document.close();

}


/* =====================================================
   INSTRUCTOR DASHBOARD
===================================================== */

function setupAdmin() {

    const user =
        currentUser()
        ||
        {
            name: "Instructor",
            role: "Instructor"
        };


    document.getElementById(
        "admin-name"
    ).textContent =
        user.name;


    tabs(
        ".side-btn",
        ".dash-section",
        document.getElementById(
            "admin-title"
        )
    );


    document
        .querySelectorAll(
            ".jump"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelector(
                                `.side-btn[data-tab="${button.dataset.tab}"]`
                            )
                            .click();

                    }
                );

            }
        );


    document
        .getElementById(
            "admin-logout"
        )
        .onclick =
        () => logout();


    document
        .getElementById(
            "course-form"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const data =
                    loadData();


                data.courses.push({

                    id:
                        Date.now(),

                    title:
                        document
                            .getElementById(
                                "new-title"
                            )
                            .value,

                    desc:
                        document
                            .getElementById(
                                "new-desc"
                            )
                            .value,

                    enrolled:
                        false,

                    progress:
                        0

                });


                saveData(data);


                event.target.reset();


                renderAdmin();


                showToast(
                    "Course published successfully!"
                );

            }
        );


    renderAdmin();

}


/* =====================================================
   ADMIN RENDER
===================================================== */

function renderAdmin() {

    const data =
        loadData();


    document.getElementById(
        "admin-courses"
    ).textContent =
        data.courses.length;


    document.getElementById(
        "admin-submissions"
    ).textContent =
        data.submissions.length;


    document.getElementById(
        "admin-pending"
    ).textContent =

        data.submissions.filter(
            submission =>
                submission.status ===
                "Pending"
        ).length;


    document.getElementById(
        "admin-course-list"
    ).innerHTML =

        data.courses
            .map(
                course => `

                <article
                    class="course-card"
                >

                    <div class="course-top">

                        <span
                            class="course-icon"
                        >
                            📘
                        </span>

                        <span class="pill">

                            ${
                                course.enrolled
                                ?
                                "Enrolled"
                                :
                                "Available"
                            }

                        </span>

                    </div>


                    <h3>
                        ${escapeHtml(
                            course.title
                        )}
                    </h3>


                    <p>
                        ${escapeHtml(
                            course.desc
                        )}
                    </p>

                </article>

                `
            )
            .join("");


    document.getElementById(
        "grading-body"
    ).innerHTML =

        data.submissions
            .map(
                submission => `

                <tr>

                    <td>
                        ${escapeHtml(
                            submission.student
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            submission.assignment
                        )}
                    </td>


                    <td>

                        <code>
                            ${escapeHtml(
                                submission.content
                            )}
                        </code>

                    </td>


                    <td>

                        <span
                            class="
                            badge
                            ${
                                submission.status ===
                                "Graded"
                                ?
                                "success"
                                :
                                "pending"
                            }
                            "
                        >

                            ${submission.status}

                        </span>

                    </td>


                    <td>

                        ${
                            submission.status ===
                            "Pending"

                            ?

                            `

                            <button
                                class="btn btn-small"
                                onclick="
                                grade(
                                    ${submission.id}
                                )
                                "
                            >

                                Mark Graded

                            </button>

                            `

                            :

                            "Completed"
                        }

                    </td>

                </tr>

                `
            )
            .join("");

}


/* =====================================================
   GRADE ASSIGNMENT
===================================================== */

function grade(id) {

    const data =
        loadData();


    const submission =
        data.submissions.find(
            item =>
                item.id === id
        );


    if (submission) {

        submission.status =
            "Graded";


        const assignment =
            data.assignments.find(
                item =>
                    item.title ===
                    submission.assignment
            );


        if (assignment) {

            assignment.status =
                "Graded";

        }


        saveData(data);


        renderAdmin();


        showToast(
            "Submission marked as graded."
        );

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "eduportalUser"
    );


    location.href =
        "index.html";

}


/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHtml(value) {

    return String(value).replace(
        /[&<>"']/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        })[character]

    );

}