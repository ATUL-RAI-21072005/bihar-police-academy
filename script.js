/**
 * =========================================
 * GOVERNMENT TRAINING ACADEMY - SCRIPT LOGIC
 * =========================================
 * Features:
 * 1. SPA Hash Routing
 * 2. Mobile Menu Toggling
 * 3. Text Size Accessibility Controls
 * 4. Downloads Directory Filtering
 * 5. Student Result Portal Verification
 * 6. Contact Form Verification & Success Toast
 * 7. Auxiliary Actions (Mock Downloads, Map link)
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. CLIENT-SIDE ROUTER (HASH ROUTING)
       =========================================
       ADMIN NOTE: You can add new tabs by:
       a) Adding a section in index.html with id="[yourname]-section" and class="page-section"
       b) Adding a nav-link in the menu with href="#[yourname]" and data-target="[yourname]"
    */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    function handleRouting() {
        // Retrieve hash, defaults to 'home' if empty or not matching a valid section
        let rawHash = window.location.hash.toLowerCase();
        let targetPage = rawHash.replace('#', '') || 'home';

        // DEMO LOCK: Academy section restriction
        if (targetPage === 'academy') {
            alert("Academy Information will be updated after official approval and data verification.");
            window.location.hash = '#home';
            return;
        }

        // Allowed page list to validate routes
        const validPages = ['home', 'academy', 'training', 'academic', 'results', 'downloads', 'contact'];

        if (!validPages.includes(targetPage)) {
            // Default back to home if hash is invalid
            window.location.hash = '#home';
            return;
        }

        // 1. Toggle Active Link highlight in Navbar
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 2. Toggle active visibility of Section content
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            if (sectionId === `${targetPage}-section`) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // 3. Scroll page to top when transition completes
        window.scrollTo({ top: 0, behavior: 'instant' });

        // 4. Force mobile drawer to collapse if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }

        // 5. If we route specifically to Results, make sure login error is cleared
        if (targetPage === 'results') {
            const errorAlert = document.getElementById('loginErrorAlert');
            if (errorAlert) errorAlert.classList.add('hide');
        }
    }

    // Bind hash change listener and initial render
    window.addEventListener('hashchange', handleRouting);
    handleRouting(); // Executed once initially

    // DEMO LOCK: Academy section restriction click listener
    const academyLink = document.querySelector('.nav-link[data-target="academy"]');
    if (academyLink) {
        academyLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            alert("Academy Information will be updated after official approval and data verification.");
        });
    }

    /* =========================================
       2. MOBILE HAMBURGER MENU DRAWER
       =========================================
    */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });

        // Collapse menu when click is caught anywhere outside navbar
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }


    /* =========================================
       3. TEXT SIZE ACCESSIBILITY CONTROLS
       =========================================
    */
    const accessibilityButtons = document.querySelectorAll('.access-btn');
    const bodyEl = document.body;

    accessibilityButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove highlighting active state from buttons
            accessibilityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle body classes based on click
            if (index === 0) { // A- (Decrease Font Size)
                bodyEl.classList.remove('font-large');
                bodyEl.classList.add('font-small');
            } else if (index === 1) { // A (Normal Font Size)
                bodyEl.classList.remove('font-small', 'font-large');
            } else if (index === 2) { // A+ (Increase Font Size)
                bodyEl.classList.remove('font-small');
                bodyEl.classList.add('font-large');
            }
        });
    });


    /* =========================================
       4. ACADEMY PAGE SUBSECTION SMOOTH SCROLLING
       =========================================
    */
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Highlight active sidebar item
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Retrieve target subsection element
            const targetId = link.getAttribute('href').replace('#', '') + '-sub';
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                // Scroll page down to specific sub section nicely offset below navbar
                const navbarHeight = document.getElementById('mainNavbar').offsetHeight || 60;
                const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* =========================================
       5. STUDENT RESULT PORTAL LOGIC
       =========================================
       ADMIN NOTE: To map additional credentials and transcripts in the portal,
       add records into the studentRegistry object list below.
    */
    const studentRegistry = {
        "3456940012": {
            password: "26.09.2006",
            profile: {
                name: "Vinay Kumar",
                roll: "3456940012",
                post: "Clerk",
                advt: "ADVT-01/2025",
                totalMarks: "200",
                obtainedMarks: "152",
                status: "PASS"
            },
            marks: [
                { subject: "Written Test", max: 100, obtained: 72 },
                { subject: "Typing Test", max: 100, obtained: 80 }
            ]
        },
        // Add new candidate records below
        "3456940027": {
            password: "10.03.2004",
            profile: {
                name: "Soni Yadav",
                roll: "3456940027",
                post: "Clerk",
                advt: "ADVT-01/2025",
                totalMarks: "200",
                obtainedMarks: "141",
                status: "PASS"
            },
            marks: [
                { subject: "Written Test", max: 100, obtained: 65 },
                { subject: "Typing Test", max: 100, obtained: 76 }
            ]
        },
        // Add new candidate records below
        "2350914255": {
            password: "09.09.2001",
            profile: {
                name: "Vashisht Muni",
                roll: "2350914255",
                post: "Havildar",
                advt: "ADVT-01/2024",
                totalMarks: "100",
                obtainedMarks: "75",
                status: "PASS"
            },
            marks: [
                { subject: "Written Test", max: 100, obtained: 75 },

            ]
        }
    };

    const loginForm = document.getElementById('resultLoginForm');
    const resultLoginCard = document.getElementById('resultLoginCard');
    const resultTranscriptCard = document.getElementById('resultTranscriptCard');
    const loginErrorAlert = document.getElementById('loginErrorAlert');
    const logoutResultBtn = document.getElementById('logoutResultBtn');
    const printTranscriptBtn = document.getElementById('printTranscriptBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve input values, ensuring proper trimming
            const studentIdInput = document.getElementById('studentId') ? document.getElementById('studentId').value.trim() : '';
            const passwordInput = document.getElementById('studentPassword') ? document.getElementById('studentPassword').value : '';

            console.log(`[DEBUG] Attempting login. Student ID Input: "${studentIdInput}"`);

            // Clear previous errors safely
            if (loginErrorAlert) {
                loginErrorAlert.classList.add('hide');
            } else {
                console.warn("[DEBUG] loginErrorAlert element not found in DOM.");
            }

            // Case-insensitive lookup in studentRegistry
            const studentKey = Object.keys(studentRegistry).find(key => key.toLowerCase() === studentIdInput.toLowerCase());
            const verifiedStudent = studentKey ? studentRegistry[studentKey] : null;

            if (verifiedStudent) {
                console.log(`[DEBUG] Student found in registry. Matching passwords...`);
            } else {
                console.warn(`[DEBUG] Student ID "${studentIdInput}" not found in student registry.`);
            }

            if (verifiedStudent && verifiedStudent.password === passwordInput) {
                console.log(`[DEBUG] Authentication successful for Student ID: "${studentIdInput}"`);

                // Populate Profile fields in HTML transcript safely
                const profileFields = [
                    { id: 'resStudentName', val: verifiedStudent.profile.name, label: 'Candidate Name' },
                    { id: 'resRollNumber', val: verifiedStudent.profile.roll, label: 'Roll Number' },
                    { id: 'resCourse', val: verifiedStudent.profile.post, label: 'Post' },
                    { id: 'resSession', val: verifiedStudent.profile.advt, label: 'ADVT No' },
                    { id: 'resTotalMarks', val: verifiedStudent.profile.totalMarks, label: 'Total Marks' },
                    { id: 'resObtainedMarks', val: verifiedStudent.profile.obtainedMarks, label: 'Obtained Marks' }
                ];

                profileFields.forEach(field => {
                    const el = document.getElementById(field.id);
                    if (el) {
                        el.textContent = field.val;
                    } else {
                        console.error(`[DOM ERROR] Profile element with ID "${field.id}" (${field.label}) is missing.`);
                    }
                });

                const statusEl = document.getElementById('resStatus');
                if (statusEl) {
                    statusEl.textContent = verifiedStudent.profile.status;
                    if (verifiedStudent.profile.status === 'PASS') {
                        statusEl.className = "summary-val badge badge-success-custom";
                    } else {
                        statusEl.className = "summary-val badge badge-error-custom";
                    }
                } else {
                    console.error(`[DOM ERROR] Element "resStatus" is missing.`);
                }

                // Render Subject marks rows dynamically
                const tbody = resultTranscriptCard ? resultTranscriptCard.querySelector('.transcript-table tbody') : null;
                if (tbody) {
                    tbody.innerHTML = ''; // Clear defaults

                    verifiedStudent.marks.forEach(item => {
                        const row = document.createElement('tr');
                        const resultStatus = item.status || (item.obtained >= (item.max * 0.5) ? 'PASS' : 'FAIL');
                        row.innerHTML = `
                            <td>${item.subject}</td>
                            <td>${item.max}</td>
                            <td>${item.obtained}</td>
                            <td class="${resultStatus === 'PASS' ? 'text-success' : 'text-error'} font-bold">${resultStatus}</td>
                        `;
                        tbody.appendChild(row);
                    });
                } else {
                    console.error(`[DOM ERROR] Cannot populate marks. Transcript table tbody not found under "resultTranscriptCard".`);
                }

                // Transition UI view
                if (resultLoginCard) {
                    resultLoginCard.classList.add('hide');
                } else {
                    console.error(`[DOM ERROR] Element "resultLoginCard" is missing. Cannot hide login view.`);
                }

                if (resultTranscriptCard) {
                    resultTranscriptCard.classList.remove('hide');
                } else {
                    console.error(`[DOM ERROR] Element "resultTranscriptCard" is missing. Cannot show transcript view.`);
                }

                // Clear input password for security
                const passwordInputEl = document.getElementById('studentPassword');
                if (passwordInputEl) {
                    passwordInputEl.value = '';
                }
            } else {
                console.warn(`[DEBUG] Authentication failed for student: "${studentIdInput}"`);
                if (loginErrorAlert) {
                    loginErrorAlert.classList.remove('hide');
                }
            }
        });
    }

    // Logout from Result portal
    if (logoutResultBtn) {
        logoutResultBtn.addEventListener('click', () => {
            resultTranscriptCard.classList.add('hide');
            resultLoginCard.classList.remove('hide');
            loginForm.reset();
        });
    }

    // Call browser local printing utility
    if (printTranscriptBtn) {
        printTranscriptBtn.addEventListener('click', () => {
            window.print();
        });
    }


    /* =========================================
       6. DOWNLOADS DIRECTORY FILTERING
       =========================================
    */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const docCards = document.querySelectorAll('.document-download-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCat = btn.getAttribute('data-category');

            docCards.forEach(card => {
                const cardCat = card.getAttribute('data-cat');
                if (selectedCat === 'all' || cardCat === selectedCat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* =========================================
       7. CONTACT FORM LOGIC & MOCK SUCCESS TOAST
       =========================================
    */
    const contactForm = document.getElementById('academyContactForm');
    const formSuccessToast = document.getElementById('formSuccessToast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Inputs
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();

            // Validation check
            if (!name || !email || !subject || !message) {
                alert('Please complete all mandated fields marked with red asterisks (*).');
                return;
            }

            // Mock submission success trigger
            formSuccessToast.classList.remove('hide');
            contactForm.reset();

            // Smooth scroll toast context into view inside contact container
            formSuccessToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Automatically dissolve toast notification after 10 seconds
            setTimeout(() => {
                formSuccessToast.classList.add('hide');
            }, 10000);
        });
    }


    /* =========================================
       8. AUXILIARY / INTERACTIVE ACTIONS
       =========================================
    */

    // Dynamic Mock Download alert message
    /*const downloadTriggers = document.querySelectorAll('.download-trigger');
    downloadTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const filename = trigger.getAttribute('data-filename');
            
            // Visual simulation of downloading a file
            trigger.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Downloading...`;
            trigger.disabled = true;

            setTimeout(() => {
                alert(`Official Portal Request Received!\nDocument: ${filename}\nStatus: Simulating Secure PDF Download (100% Successful)`);
                trigger.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Download`;
                trigger.disabled = false;
            }, 800);
        });
    });*/

    // Google Maps Redirect action
    const mapDirectionsBtn = document.getElementById('openExternalMap');
    if (mapDirectionsBtn) {
        mapDirectionsBtn.addEventListener('click', () => {
            // Pointing directly to standard official landmark mapping Nalanda/Rajgir
            window.open('https://maps.google.com/?q=Bihar+Police+Academy+Rajgir', '_blank');
        });
    }

    // Password visibility toggle action
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const studentPasswordInput = document.getElementById('studentPassword');
    const togglePasswordIcon = document.getElementById('togglePasswordIcon');

    if (togglePasswordBtn && studentPasswordInput && togglePasswordIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = studentPasswordInput.getAttribute('type') === 'password';
            studentPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            if (isPassword) {
                togglePasswordIcon.classList.remove('fa-eye');
                togglePasswordIcon.classList.add('fa-eye-slash');
            } else {
                togglePasswordIcon.classList.remove('fa-eye-slash');
                togglePasswordIcon.classList.add('fa-eye');
            }
        });
    }

});
