document.addEventListener("DOMContentLoaded", () => {
/* =========================
   PASSWORD SHOW / HIDE
========================= */

const passwordToggleButtons =
    document.querySelectorAll(".password-toggle");


passwordToggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.dataset.target;

        const passwordInput =
            document.getElementById(targetId);

        if (!passwordInput) {
            return;
        }


        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "Hide";

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            button.textContent = "Show";

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});

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

    const totalResultAttempts =
        document.getElementById("totalResultAttempts");

    if (totalResultAttempts) {
        totalResultAttempts.textContent =
            data.totalAttempts ?? 0;
    }
}
/* =========================
   UPDATE ADMIN PROFILE
========================= */

function updateAdminProfile(data) {

    const name = data.name || "";
    const role = data.role || "";
    const email = data.email || "";

    const avatarLetter = name
        ? name.charAt(0).toUpperCase()
        : "";


    /*
     * Profile picture is temporarily stored
     * in localStorage until backend integration
     * is completed.
     */
    const savedProfilePicture =
        localStorage.getItem("adminProfilePicture") || "";


    /* =========================
       PROFILE AVATAR HELPER
    ========================= */

    function setAdminAvatar(element, imageUrl) {

        if (!element) {
            return;
        }


        /*
         * If a profile picture exists,
         * display it.
         */
        if (imageUrl) {

            element.textContent = "";

            element.style.backgroundImage =
                `url("${imageUrl}")`;

            element.style.backgroundSize =
                "cover";

            element.style.backgroundPosition =
                "center";

            element.style.backgroundRepeat =
                "no-repeat";

            return;
        }


        /*
         * No profile picture.
         *
         * Do NOT put "A" here.
         */
        element.style.backgroundImage =
            "none";

        element.textContent = "";

    }


    /* =========================
       SIDEBAR INFORMATION
    ========================= */

    if (sidebarAdminAvatar) {
    sidebarAdminAvatar.textContent = avatarLetter;
}


    if (sidebarAdminRole) {

        sidebarAdminRole.textContent =
            role || "Admin";

    }


    setAdminAvatar(
        sidebarAdminAvatar,
        savedProfilePicture
    );


    /* =========================
       TOP PROFILE INFORMATION
    ========================= */

    if (topAdminName) {

        topAdminName.textContent =
            name || "";

    }


    if (topAdminRole) {

        topAdminRole.textContent =
            role || "Admin";

    }


    setAdminAvatar(
        topAdminAvatar,
        savedProfilePicture
    );


    /* =========================
       WELCOME MESSAGE
    ========================= */

    if (welcomeAdminName) {

        welcomeAdminName.textContent =
            name || "";

    }


    /* =========================
       SETTINGS
    ========================= */

    if (settingsAdminName) {

        settingsAdminName.value =
            name;

    }


    if (settingsAdminEmail) {

        settingsAdminEmail.value =
            email;

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

    /*
     * Quiz data will be loaded from the backend.
     *
     * We intentionally do not use localStorage
     * or create fake quiz data here.
     */

    updateQuizzesTable([]);

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

    /*
     * Backend deletion will be connected later.
     *
     * We intentionally do not delete anything
     * from localStorage or create fake data.
     */

    alert(
        "Quiz deletion is ready. " +
        "Backend integration will be added later."
    );

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
   SIDEBAR NAVIGATION
========================= */

navItems.forEach(item => {

    item.addEventListener("click", event => {

        /*
         * Separate HTML pages such as:
         * account-security.html
         * admin-profile.html
         * admin-access.html
         * quiz-settings.html
         * platform-info.html
         *
         * do not have data-section.
         *
         * Therefore, allow the browser to
         * navigate normally.
         */
        const sectionName = item.dataset.section;

        if (!sectionName) {
            return;
        }


        /*
         * These links belong to admin.html
         * and are handled as dashboard sections.
         */
        event.preventDefault();


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


        const pageMeta = {

            dashboard: {
                title: "Dashboard",
                subtitle: "Overview of your EPS TOPIK platform"
            },

            users: {
                title: "Users",
                subtitle: "Manage platform users"
            },

            quizzes: {
                title: "Quizzes",
                subtitle: "Create and manage quizzes"
            },

            results: {
                title: "Results",
                subtitle: "View quiz results and performance"
            },

            payments: {
                title: "Payments",
                subtitle: "Manage and monitor payment activity"
            },

            settings: {
                title: "Settings",
                subtitle: "Manage admin panel settings"
            }

        };


        if (
            pageMeta[sectionName] &&
            pageTitle &&
            pageSubtitle
        ) {

            pageTitle.textContent =
                pageMeta[sectionName].title;

            pageSubtitle.textContent =
                pageMeta[sectionName].subtitle;

        }


        if (sidebar) {
            sidebar.classList.remove("open");
        }

    });

});
/* =========================
   LOAD SECTION FROM URL HASH
========================= */

function loadSectionFromHash() {

    const hash =
        window.location.hash.replace(
            "#",
            ""
        );


    /*
     * No hash means dashboard.
     */
    if (!hash) {
        return;
    }


    /*
     * Find requested section.
     */

    const targetSection =
        document.getElementById(hash);


    /*
     * If this is a separate HTML page,
     * there will be no matching dashboard
     * section. Simply do nothing.
     */

    if (!targetSection) {
        return;
    }


    /*
     * Find matching sidebar item.
     */

    const targetNav =
        document.querySelector(
            `.nav-item[data-section="${hash}"]`
        );


    /*
     * Remove active state.
     */

    navItems.forEach(nav => {

        nav.classList.remove(
            "active"
        );

    });


    sections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    /*
     * Activate requested section.
     */

    targetSection.classList.add(
        "active"
    );


    if (targetNav) {

        targetNav.classList.add(
            "active"
        );

    }


    /*
     * Page titles.
     */

    const pageMeta = {

        dashboard: {
            title: "Dashboard",
            subtitle:
                "Overview of your EPS TOPIK platform"
        },

        users: {
            title: "Users",
            subtitle:
                "Manage platform users"
        },

        quizzes: {
            title: "Quizzes",
            subtitle:
                "Create and manage quizzes"
        },

        results: {
            title: "Results",
            subtitle:
                "View quiz results and performance"
        },

        payments: {
            title: "Payments",
            subtitle:
                "Manage and monitor payment activity"
        },

        settings: {
            title: "Settings",
            subtitle:
                "Manage admin panel settings"
        }

    };


    if (
        pageMeta[hash] &&
        pageTitle &&
        pageSubtitle
    ) {

        pageTitle.textContent =
            pageMeta[hash].title;

        pageSubtitle.textContent =
            pageMeta[hash].subtitle;

    }

}


/*
 * Load section when admin.html opens.
 */

loadSectionFromHash();


/*
 * React when URL hash changes.
 */

window.addEventListener(
    "hashchange",
    loadSectionFromHash
);

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

        const button = event.target.closest(".table-action");

        if (!button) return;

        const userId = button.dataset.userId;

        if (!userId) return;

        const selectedUser = currentUsers.find(
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

/* =========================
   TERMS & CONDITIONS
========================= */

const termsModal =
    document.getElementById("termsModal");

const viewTermsBtn =
    document.getElementById("viewTermsBtn");

const closeTermsModal =
    document.getElementById("closeTermsModal");

const closeTermsBtn =
    document.getElementById("closeTermsBtn");


function openTermsModal() {

    if (!termsModal) return;

    termsModal.classList.add("active");

}


function closeTermsModalWindow() {

    if (!termsModal) return;

    termsModal.classList.remove("active");

}


/* Open Terms */

if (viewTermsBtn) {

    viewTermsBtn.addEventListener("click", () => {

        openTermsModal();

    });

}


/* Close using X */

if (closeTermsModal) {

    closeTermsModal.addEventListener("click", () => {

        closeTermsModalWindow();

    });

}


/* Close using button */

if (closeTermsBtn) {

    closeTermsBtn.addEventListener("click", () => {

        closeTermsModalWindow();

    });

}


/* Close by clicking outside */

if (termsModal) {

    termsModal.addEventListener("click", event => {

        if (event.target === termsModal) {

            closeTermsModalWindow();

        }

    });

}

/* =========================
   ADMIN SETTINGS
========================= */

const saveAdminSettings =
    document.getElementById("saveAdminSettings");

updateAdminProfile({
    name: "",
    email: "",
    role: ""
});

if (saveAdminSettings) {

    saveAdminSettings.addEventListener("click", () => {

        alert(
            "Admin profile will be connected to the backend."
        );

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
/* =====================================================
   PROFILE PICTURE MANAGEMENT
   ===================================================== */

const profilePictureInput =
    document.getElementById("profilePictureInput");

const profilePicturePreview =
    document.getElementById("profilePicturePreview");

const removeProfilePicture =
    document.getElementById("removeProfilePicture");


/* =====================================================
   APPLY PROFILE PICTURE TO AVATAR
   ===================================================== */

function applyProfilePictureToAvatars(imageData) {

    /*
     * TOP RIGHT AVATAR
     */

    if (topAdminAvatar) {

        if (imageData) {

            topAdminAvatar.textContent = "";

            topAdminAvatar.style.backgroundImage =
                `url("${imageData}")`;

            topAdminAvatar.style.backgroundSize =
                "cover";

            topAdminAvatar.style.backgroundPosition =
                "center";

            topAdminAvatar.style.backgroundRepeat =
                "no-repeat";

        } else {

            topAdminAvatar.style.backgroundImage =
                "none";

            topAdminAvatar.textContent = "";

        }

    }


    /*
     * SIDEBAR AVATAR
     */

    if (sidebarAdminAvatar) {

        if (imageData) {

            sidebarAdminAvatar.textContent = "";

            sidebarAdminAvatar.style.backgroundImage =
                `url("${imageData}")`;

            sidebarAdminAvatar.style.backgroundSize =
                "cover";

            sidebarAdminAvatar.style.backgroundPosition =
                "center";

            sidebarAdminAvatar.style.backgroundRepeat =
                "no-repeat";

        } else {

            sidebarAdminAvatar.style.backgroundImage =
                "none";

            sidebarAdminAvatar.textContent = "";

        }

    }

}


/* =====================================================
   LOAD SAVED PROFILE PICTURE
   ===================================================== */

function loadProfilePicture() {

    const savedPicture =
        localStorage.getItem(
            "adminProfilePicture"
        ) || "";


    /*
     * Update profile page preview
     */

    if (profilePicturePreview) {

        if (savedPicture) {

            profilePicturePreview.textContent =
                "";

            profilePicturePreview.style.backgroundImage =
                `url("${savedPicture}")`;

            profilePicturePreview.style.backgroundSize =
                "cover";

            profilePicturePreview.style.backgroundPosition =
                "center";

            profilePicturePreview.style.backgroundRepeat =
                "no-repeat";

        } else {

            profilePicturePreview.style.backgroundImage =
                "none";

            profilePicturePreview.textContent =
                "";

        }

    }


    /*
     * Update avatars on every page.
     */

    applyProfilePictureToAvatars(
        savedPicture
    );

}


/* =====================================================
   CHANGE PROFILE PICTURE
   ===================================================== */

if (profilePictureInput) {

    profilePictureInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {
                return;
            }


            /* =========================
               VALIDATE FILE TYPE
            ========================= */

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Please select a JPG, PNG or WebP image."
                );

                profilePictureInput.value =
                    "";

                return;
            }


            /* =========================
               VALIDATE FILE SIZE
            ========================= */

            const maxSize =
                2 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "Profile picture must be smaller than 2 MB."
                );

                profilePictureInput.value =
                    "";

                return;
            }


            /* =========================
               READ IMAGE
            ========================= */

            const reader =
                new FileReader();


            reader.onload = function () {

                const imageData =
                    reader.result;


                /*
                 * Temporary frontend storage.
                 *
                 * Later this will be replaced
                 * with backend/cloud storage.
                 */
                localStorage.setItem(
                    "adminProfilePicture",
                    imageData
                );


                /*
                 * Update profile page preview.
                 */

                if (profilePicturePreview) {

                    profilePicturePreview.textContent =
                        "";

                    profilePicturePreview.style.backgroundImage =
                        `url("${imageData}")`;

                    profilePicturePreview.style.backgroundSize =
                        "cover";

                    profilePicturePreview.style.backgroundPosition =
                        "center";

                    profilePicturePreview.style.backgroundRepeat =
                        "no-repeat";

                }


                /*
                 * Update top and sidebar avatars.
                 */

                applyProfilePictureToAvatars(
                    imageData
                );


                alert(
                    "Profile picture updated successfully."
                );

            };


            reader.onerror = function () {

                alert(
                    "Unable to read the selected image."
                );

                profilePictureInput.value =
                    "";

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   REMOVE PROFILE PICTURE
   ===================================================== */

if (removeProfilePicture) {

    removeProfilePicture.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to remove your profile picture?"
                );


            if (!confirmed) {
                return;
            }


            /*
             * Remove stored image.
             */

            localStorage.removeItem(
                "adminProfilePicture"
            );


            /*
             * Reset preview.
             */

            if (profilePicturePreview) {

                profilePicturePreview.style.backgroundImage =
                    "none";

                profilePicturePreview.textContent =
                    "";

            }


            /*
             * Reset both avatars.
             *
             * No hardcoded "A".
             */

            applyProfilePictureToAvatars(
                ""
            );


            /*
             * Clear file input.
             */

            if (profilePictureInput) {

                profilePictureInput.value =
                    "";

            }


            alert(
                "Profile picture removed."
            );

        }
    );

}


/* =====================================================
   LOAD PICTURE WHEN PAGE OPENS
   ===================================================== */

loadProfilePicture();

/* =========================
   ACCOUNT SECURITY
========================= */

const changePasswordForm =
    document.getElementById("changePasswordForm");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const currentPasswordInput =
    document.getElementById("currentPassword");

const newPasswordInput =
    document.getElementById("newPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");


if (changePasswordForm) {

    changePasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================
               GET PASSWORD VALUES
            ========================= */

            const currentPassword =
                currentPasswordInput.value;

            const newPassword =
                newPasswordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            /* =========================
               BASIC FRONTEND VALIDATION
            ========================= */

            if (!currentPassword) {

                alert(
                    "Please enter your current password."
                );

                currentPasswordInput.focus();

                return;
            }


            if (!newPassword) {

                alert(
                    "Please enter your new password."
                );

                newPasswordInput.focus();

                return;
            }


            if (newPassword.length < 8) {

                alert(
                    "New password must contain at least 8 characters."
                );

                newPasswordInput.focus();

                return;
            }


            if (!confirmPassword) {

                alert(
                    "Please confirm your new password."
                );

                confirmPasswordInput.focus();

                return;
            }


            if (newPassword !== confirmPassword) {

                alert(
                    "New passwords do not match."
                );

                confirmPasswordInput.focus();

                return;
            }


            if (currentPassword === newPassword) {

                alert(
                    "New password must be different from your current password."
                );

                newPasswordInput.focus();

                return;
            }


            /* =========================
               GET ACCESS TOKEN
            ========================= */

            const accessToken =
                localStorage.getItem("access_token");


            if (!accessToken) {

                alert(
                    "Your session has expired. Please login again."
                );

                window.location.href =
                    "ad-login.html";

                return;
            }


            /* =========================
               BUTTON LOADING STATE
            ========================= */

            if (changePasswordBtn) {

                changePasswordBtn.disabled = true;

                changePasswordBtn.textContent =
                    "Changing Password...";
            }


            try {

                /* =========================
                   BACKEND API
                ========================= */

                const API_BASE_URL =
                    window.EPS_API?.baseUrl ||
                    "http://127.0.0.1:8000";


                const response =
                    await fetch(
                        `${API_BASE_URL}/auth/admin/change-password`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${accessToken}`
                            },

                            body: JSON.stringify({

                                current_password:
                                    currentPassword,

                                new_password:
                                    newPassword,

                                confirm_password:
                                    confirmPassword

                            })
                        }
                    );


                /* =========================
                   READ RESPONSE
                ========================= */

                let data = {};

                try {

                    data =
                        await response.json();

                } catch {

                    data = {};

                }


                /* =========================
                   BACKEND ERROR
                ========================= */

                if (!response.ok) {

                    /*
                     * Invalid/expired JWT
                     */
                    if (
                        response.status === 401
                    ) {

                        localStorage.removeItem(
                            "access_token"
                        );

                        localStorage.removeItem(
                            "token_type"
                        );

                        alert(
                            "Your session has expired. Please login again."
                        );

                        window.location.href =
                            "ad-login.html";

                        return;
                    }


                    throw new Error(
                        data.detail ||
                        data.message ||
                        "Unable to change password."
                    );
                }


                /* =========================
                   SUCCESS
                ========================= */

                alert(
                    data.message ||
                    "Password changed successfully."
                );


                /*
                 * Clear password fields.
                 */
                changePasswordForm.reset();


            } catch (error) {

                console.error(
                    "Change password error:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to change password. Please try again."
                );


            } finally {

                /* =========================
                   RESTORE BUTTON
                ========================= */

                if (changePasswordBtn) {

                    changePasswordBtn.disabled = false;

                    changePasswordBtn.textContent =
                        "Change Password";
                }

            }

        }
    );

}

});