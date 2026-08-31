document.addEventListener("DOMContentLoaded", () => {
    let currentUsers = [];
        /* =========================
       DYNAMIC DATA ELEMENTS
    ========================= */

    const totalUsers = document.getElementById("totalUsers");
    const usersGrowth = document.getElementById("usersGrowth");

    const totalQuizzes = document.getElementById("totalQuizzes");
    const quizzesGrowth = document.getElementById("quizzesGrowth");

    const totalQuestions = document.getElementById("totalQuestions");
    const questionsGrowth = document.getElementById("questionsGrowth");

    const totalAttempts = document.getElementById("totalAttempts");
    const attemptsGrowth = document.getElementById("attemptsGrowth");

    const activityList = document.getElementById("activityList");

    const usersTable = document.getElementById("usersTable");
    const quizzesTable = document.getElementById("quizzesTable");
    const questionsTable = document.getElementById("questionsTable");

    const averageScore = document.getElementById("averageScore");
    const passRate = document.getElementById("passRate");
    const todayAttempts = document.getElementById("todayAttempts");

    const sidebarAdminName =
        document.getElementById("sidebarAdminName");

    const sidebarAdminRole =
        document.getElementById("sidebarAdminRole");

    const sidebarAdminAvatar =
        document.getElementById("sidebarAdminAvatar");

    const topAdminName =
        document.getElementById("topAdminName");

    const topAdminRole =
        document.getElementById("topAdminRole");

    const topAdminAvatar =
        document.getElementById("topAdminAvatar");

    const welcomeAdminName =
        document.getElementById("welcomeAdminName");

    const settingsAdminName =
        document.getElementById("settingsAdminName");

    const settingsAdminEmail =
        document.getElementById("settingsAdminEmail");

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.querySelector(".sidebar");

            /* =========================
       DYNAMIC DATA FUNCTIONS
    ========================= */

    function updateDashboardStats(data) {

        if (totalUsers) {
            totalUsers.textContent = data.totalUsers ?? 0;
        }

        if (usersGrowth) {
            usersGrowth.textContent =
                `↑ ${data.usersGrowth ?? 0}%`;
        }

        if (totalQuizzes) {
            totalQuizzes.textContent = data.totalQuizzes ?? 0;
        }

        if (quizzesGrowth) {
            quizzesGrowth.textContent =
                `↑ ${data.quizzesGrowth ?? 0}%`;
        }

        if (totalQuestions) {
            totalQuestions.textContent = data.totalQuestions ?? 0;
        }

        if (questionsGrowth) {
            questionsGrowth.textContent =
                `↑ ${data.questionsGrowth ?? 0}%`;
        }

        if (totalAttempts) {
            totalAttempts.textContent = data.totalAttempts ?? 0;
        }

        if (attemptsGrowth) {
            attemptsGrowth.textContent =
                `↑ ${data.attemptsGrowth ?? 0}%`;
        }
    }


    function updateResults(data) {

        if (averageScore) {
            averageScore.textContent =
                `${data.averageScore ?? 0}%`;
        }

        if (passRate) {
            passRate.textContent =
                `${data.passRate ?? 0}%`;
        }

        if (todayAttempts) {
            todayAttempts.textContent =
                data.todayAttempts ?? 0;
        }
    }


    /* =========================
       UPDATE ADMIN PROFILE
    ========================= */

    function updateAdminProfile(data) {

        const name = data.name || "Admin";
        const role = data.role || "Admin";
        const email = data.email || "";

        // Sidebar
        if (sidebarAdminName) {
            sidebarAdminName.textContent = name;
        }

        if (sidebarAdminRole) {
            sidebarAdminRole.textContent = role;
        }

        if (sidebarAdminAvatar) {
            sidebarAdminAvatar.textContent =
                name.charAt(0).toUpperCase();
        }

        // Top profile
        if (topAdminName) {
            topAdminName.textContent = name;
        }

        if (topAdminRole) {
            topAdminRole.textContent = role;
        }

        if (topAdminAvatar) {
            topAdminAvatar.textContent =
                name.charAt(0).toUpperCase();
        }

        // Welcome message
        if (welcomeAdminName) {
            welcomeAdminName.textContent = name;
        }

        // Settings
        if (settingsAdminName) {
            settingsAdminName.value = name;
        }

        if (settingsAdminEmail) {
            settingsAdminEmail.value = email;
        }
    }


    /* =========================
       UPDATE USERS TABLE
    ========================= */

    function updateUsersTable(users) {
        currentUsers = Array.isArray(users) ? users : [];

        if (!usersTable) return;

        usersTable.innerHTML = "";

        if (!users || users.length === 0) {
    usersTable.innerHTML = `
        <tr>
            <td colspan="5">
                <div class="empty-users">
                    <div class="empty-users-icon">
                        👥
                    </div>

                    <h3>No users found</h3>

                    <p>
                        There are currently no registered
                        users on the platform.
                    </p>
                </div>
            </td>
        </tr>
    `;

    return;
}

        users.forEach(user => {

            const row = document.createElement("tr");

            const name = user.name || "Unknown";
            const email = user.email || "-";
            const status = user.status || "Active";

            const joined = user.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "-";

            row.innerHTML = `
                <td>
                    <div class="table-user">
                        <div class="table-avatar">
                            ${name.charAt(0).toUpperCase()}
                        </div>
                        ${name}
                    </div>
                </td>

                <td>${email}</td>

                <td>
                    <span class="status ${status.toLowerCase()}-status">
                        ${status}
                    </span>
                </td>

                <td>${joined}</td>

                <td>
    <div class="table-actions">

        <button
            class="table-action view-user-btn"
            data-user-id="${user.id}">
            View
        </button>

        <button
            class="table-action edit-user-btn"
            data-user-id="${user.id}">
            Edit
        </button>

    </div>
</td>
            `;

            usersTable.appendChild(row);
        });
    }
    // Users will be loaded from the backend later
updateUsersTable([]);


    /* =========================
       UPDATE QUIZZES TABLE
    ========================= */

    function updateQuizzesTable(quizzes) {

        if (!quizzesTable) return;

        quizzesTable.innerHTML = "";

        if (!quizzes || quizzes.length === 0) {
            quizzesTable.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-table">
                        No quizzes found.
                    </td>
                </tr>
            `;
            return;
        }

        quizzes.forEach(quiz => {

            const row = document.createElement("tr");

            const title = quiz.title || "Untitled Quiz";
            const questionsCount = quiz.questions_count ?? 0;
            const status = quiz.status || "Draft";

            const created = quiz.created_at
                ? new Date(quiz.created_at).toLocaleDateString()
                : "-";

            row.innerHTML = `
                <td>${title}</td>

                <td>${questionsCount}</td>

                <td>
                    <span class="status ${status.toLowerCase()}-status">
                        ${status}
                    </span>
                </td>

                <td>${created}</td>

                <td>
    <div class="table-actions">

        <button
            class="table-action view-quiz-btn"
            data-quiz-id="${quiz.id}">
            View
        </button>

        <button
            class="table-action edit-quiz-btn"
            data-quiz-id="${quiz.id}">
            Edit
        </button>

        <button
            class="table-action delete-quiz-btn"
            data-quiz-id="${quiz.id}">
            Delete
        </button>

    </div>
</td>
            `;

            quizzesTable.appendChild(row);
        });
    }
    /* =========================
   LOAD PUBLISHED QUIZZES
========================= */

function loadPublishedQuizzes() {

    const quizzes = JSON.parse(
        localStorage.getItem("admin_quizzes") || "[]"
    );


    updateQuizzesTable(quizzes);


    /* Update dashboard quiz count */

    if (totalQuizzes) {
        totalQuizzes.textContent =
            quizzes.length;
    }


    /* Update dashboard question count */

    if (totalQuestions) {

        const totalQuestionsCount =
            quizzes.reduce(
                (total, quiz) =>
                    total + (
                        quiz.questions_count ??
                        quiz.questions?.length ??
                        0
                    ),
                0
            );

        totalQuestions.textContent =
            totalQuestionsCount;
    }
}
/* =========================
   DELETE QUIZ
========================= */

document.addEventListener("click", function (event) {

    const deleteButton =
        event.target.closest(".delete-quiz-btn");

    if (!deleteButton) return;

    const quizId =
        deleteButton.dataset.quizId;

    if (!quizId) return;


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this quiz?"
        );

    if (!confirmDelete) return;


    let quizzes = JSON.parse(
        localStorage.getItem("admin_quizzes") || "[]"
    );


    quizzes = quizzes.filter(
        quiz => String(quiz.id) !== String(quizId)
    );


    localStorage.setItem(
        "admin_quizzes",
        JSON.stringify(quizzes)
    );


    /* Refresh the table */

    updateQuizzesTable(quizzes);


    /* Update dashboard counts */

    if (totalQuizzes) {
        totalQuizzes.textContent =
            quizzes.length;
    }


    if (totalQuestions) {

        const totalQuestionsCount =
            quizzes.reduce(
                (total, quiz) =>
                    total + (
                        quiz.questions_count ??
                        quiz.questions?.length ??
                        0
                    ),
                0
            );

        totalQuestions.textContent =
            totalQuestionsCount;
    }


    alert("Quiz deleted successfully.");
});

/* =========================
   VIEW QUIZ
========================= */

document.addEventListener("click", function (event) {

    const viewButton =
        event.target.closest(".view-quiz-btn");

    if (!viewButton) return;

    const quizId =
        viewButton.dataset.quizId;

    if (!quizId) return;

    window.location.href =
        `admin-view-quiz.html?id=${encodeURIComponent(quizId)}`;

});
/* =========================
   EDIT QUIZ
========================= */

document.addEventListener("click", function (event) {

    const editButton =
        event.target.closest(".edit-quiz-btn");

    if (!editButton) return;

    const quizId =
        editButton.dataset.quizId;

    if (!quizId) return;

    window.location.href =
        `admin-create-quiz.html?edit=${encodeURIComponent(quizId)}`;
});

loadPublishedQuizzes();


    /* =========================
       UPDATE QUESTIONS TABLE
    ========================= */

    function updateQuestionsTable(questions) {

    }
    const titles = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Overview of your EPS TOPIK platform"
        },

        users: {
            title: "Users",
            subtitle: "Manage registered users"
        },

        quizzes: {
            title: "Quizzes",
            subtitle: "Create and manage quizzes"
        },

        questions: {
            title: "Questions",
            subtitle: "Manage exam questions"
        },

        results: {
            title: "Results",
            subtitle: "Monitor user performance"
        },

        settings: {
            title: "Settings",
            subtitle: "Manage administrator settings"
        }
    };


    /* =========================
       SIDEBAR NAVIGATION
    ========================= */

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const sectionName = item.dataset.section;

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            sections.forEach(section => {
                section.classList.remove("active");
            });

            const selectedSection =
                document.getElementById(sectionName);

            if (selectedSection) {
                selectedSection.classList.add("active");
            }

            if (titles[sectionName]) {
                pageTitle.textContent = titles[sectionName].title;
                pageSubtitle.textContent = titles[sectionName].subtitle;
            }

            sidebar.classList.remove("open");
        });

    });


    /* =========================
       MOBILE MENU
    ========================= */

    if (mobileMenu) {

        mobileMenu.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

    }


    /* =========================
       QUICK ACTIONS
    ========================= */

    const quickActions =
        document.querySelectorAll(".quick-action");

    quickActions.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            const mapping = {
               
                question: "questions",
                user: "users",
                results: "results"
            };

            const target = mapping[action];

            if (!target) return;

            const targetNav =
                document.querySelector(
                    `.nav-item[data-section="${target}"]`
                );

            if (targetNav) {
                targetNav.click();
            }

        });

    });


    /* =========================
       USER SEARCH
    ========================= */

    const userSearch =
        document.getElementById("userSearch");

    if (userSearch) {

        userSearch.addEventListener("input", () => {

            const search =
                userSearch.value.toLowerCase();

            const rows =
                document.querySelectorAll("#usersTable tr");

            rows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(search) ? "" : "none";

            });

        });

    }

    /* =========================
   VIEW USER MODAL
========================= */

const viewUserModal =
    document.getElementById("viewUserModal");

const closeViewUserModal =
    document.getElementById("closeViewUserModal");

const closeViewUser =
    document.getElementById("closeViewUser");

const viewUserAvatar =
    document.getElementById("viewUserAvatar");

const viewUserName =
    document.getElementById("viewUserName");

const viewUserEmail =
    document.getElementById("viewUserEmail");

const viewUserStatus =
    document.getElementById("viewUserStatus");

const viewUserJoined =
    document.getElementById("viewUserJoined");


function openViewUserModal(user) {

    if (!viewUserModal || !user) return;

    const name = user.name || "Unknown User";

    viewUserAvatar.textContent =
        name.charAt(0).toUpperCase();

    viewUserName.textContent =
        name;

    viewUserEmail.textContent =
        user.email || "-";

    viewUserStatus.textContent =
        user.status || "Active";

    viewUserJoined.textContent =
        user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "-";

    viewUserModal.classList.add("active");
}


function closeViewUserModalWindow() {

    if (!viewUserModal) return;

    viewUserModal.classList.remove("active");
}


if (closeViewUserModal) {
    closeViewUserModal.addEventListener(
        "click",
        closeViewUserModalWindow
    );
}


if (closeViewUser) {
    closeViewUser.addEventListener(
        "click",
        closeViewUserModalWindow
    );
}


if (viewUserModal) {

    viewUserModal.addEventListener("click", event => {

        if (event.target === viewUserModal) {
            closeViewUserModalWindow();
        }

    });

}

/* =========================
   EDIT USER MODAL
========================= */

const editUserModal =
    document.getElementById("editUserModal");

const closeEditUserModal =
    document.getElementById("closeEditUserModal");

const cancelEditUser =
    document.getElementById("cancelEditUser");

const editUserForm =
    document.getElementById("editUserForm");

const editUserId =
    document.getElementById("editUserId");

const editUserName =
    document.getElementById("editUserName");

const editUserEmail =
    document.getElementById("editUserEmail");

const editUserStatus =
    document.getElementById("editUserStatus");


function openEditUserModal(user) {

    if (!editUserModal || !user) return;

    editUserId.value =
        user.id || "";

    editUserName.value =
        user.name || "";

    editUserEmail.value =
        user.email || "";

    editUserStatus.value =
        user.status || "Active";

    editUserModal.classList.add("active");
}


function closeEditUserModalWindow() {

    if (!editUserModal) return;

    editUserModal.classList.remove("active");

    if (editUserForm) {
        editUserForm.reset();
    }
}


if (closeEditUserModal) {

    closeEditUserModal.addEventListener(
        "click",
        closeEditUserModalWindow
    );

}


if (cancelEditUser) {

    cancelEditUser.addEventListener(
        "click",
        closeEditUserModalWindow
    );

}


/* Close when clicking outside */

if (editUserModal) {

    editUserModal.addEventListener("click", event => {

        if (event.target === editUserModal) {
            closeEditUserModalWindow();
        }

    });

}


/* Save edited user */

if (editUserForm) {

    editUserForm.addEventListener("submit", event => {

        event.preventDefault();

        /*
         * Backend update will be connected later.
         *
         * We intentionally do not save anything
         * to the database at this stage.
         */

        alert(
            "User editing is ready. " +
            "Backend integration will be added later."
        );

        closeEditUserModalWindow();

    });

}
/* =========================
   USER TABLE ACTION HANDLER
========================= */

if (usersTable) {

    usersTable.addEventListener("click", event => {

        const button =
            event.target.closest(".table-action");

        if (!button) return;

        const userId =
            button.dataset.userId;

        if (!userId) return;

        /*
         * The actual user object will come
         * from the backend later.
         *
         * For now, there is no user data,
         * so we do not create fake data here.
         */

        if (usersTable) {

    usersTable.addEventListener("click", event => {

        const button =
            event.target.closest(".table-action");

        if (!button) return;

        const userId =
            button.dataset.userId;

        if (!userId) return;

        const selectedUser =
            currentUsers.find(
                user => String(user.id) === String(userId)
            );

        if (!selectedUser) {
            console.error("User not found:", userId);
            return;
        }

        if (button.classList.contains("view-user-btn")) {

            openViewUserModal(selectedUser);

        }

        if (button.classList.contains("edit-user-btn")) {

            openEditUserModal(selectedUser);

        }

    });

}

    });

}
/* =========================
   ADMIN SETTINGS
========================= */

const saveAdminSettings =
    document.getElementById("saveAdminSettings");


// Load saved admin details when page opens
const savedAdminName =
    localStorage.getItem("adminName") || "Admin";

const savedAdminEmail =
    localStorage.getItem("adminEmail") || "";

updateAdminProfile({
    name: savedAdminName,
    email: savedAdminEmail,
    role: "Admin"
});


// Save settings
if (saveAdminSettings) {

    saveAdminSettings.addEventListener("click", () => {

        const newName = settingsAdminName.value.trim();
        const newEmail = settingsAdminEmail.value.trim();

        if (!newName) {
            alert("Please enter admin name.");
            return;
        }

        localStorage.setItem("adminName", newName);
        localStorage.setItem("adminEmail", newEmail);

        updateAdminProfile({
            name: newName,
            email: newEmail,
            role: "Admin"
        });

        alert("Settings saved successfully!");

    });

}

    /* =========================
       LOGOUT
    ========================= */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmed =
                confirm("Are you sure you want to logout?");

            if (!confirmed) return;

            // Change this to your actual login page
            window.location.href = "ad-login.html";

        });

    }

    /* =========================
   ADD USER MODAL
========================= */

const addUserBtn =
    document.getElementById("addUserBtn");

const addUserModal =
    document.getElementById("addUserModal");

const closeAddUserModal =
    document.getElementById("closeAddUserModal");

const cancelAddUser =
    document.getElementById("cancelAddUser");

const addUserForm =
    document.getElementById("addUserForm");


function openAddUserModal() {
    if (!addUserModal) return;

    addUserModal.classList.add("active");
}


function closeAddUserModalWindow() {
    if (!addUserModal) return;

    addUserModal.classList.remove("active");

    if (addUserForm) {
        addUserForm.reset();
    }
}


if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
        openAddUserModal();
    });
}


if (closeAddUserModal) {
    closeAddUserModal.addEventListener("click", () => {
        closeAddUserModalWindow();
    });
}


if (cancelAddUser) {
    cancelAddUser.addEventListener("click", () => {
        closeAddUserModalWindow();
    });
}


/* Close when clicking outside the modal */

if (addUserModal) {
    addUserModal.addEventListener("click", event => {

        if (event.target === addUserModal) {
            closeAddUserModalWindow();
        }

    });
}


/* Add User form */

if (addUserForm) {
    addUserForm.addEventListener("submit", event => {

        event.preventDefault();

        /*
         * Backend connection will be added later.
         * We intentionally do not save or create
         * any user here yet.
         */

        alert(
            "The Add User form is ready. " +
            "Backend integration will be added later."
        );

        closeAddUserModalWindow();

    });
}

});