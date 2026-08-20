document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.querySelector(".sidebar");

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