document.addEventListener("DOMContentLoaded", () => {
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

        if (!usersTable) return;

        usersTable.innerHTML = "";

        if (!users || users.length === 0) {
            usersTable.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-table">
                        No users found.
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
                    <button
                        class="table-action"
                        data-user-id="${user.id}">
                        View
                    </button>
                </td>
            `;

            usersTable.appendChild(row);
        });
    }


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
                    <button
                        class="table-action"
                        data-quiz-id="${quiz.id}">
                        View
                    </button>
                </td>
            `;

            quizzesTable.appendChild(row);
        });
    }


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
                quiz: "quizzes",
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
            window.location.href = "login.html";

        });

    }

});