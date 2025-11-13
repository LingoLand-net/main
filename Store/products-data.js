(function () {
    const AUTO_DETECT_TEACHER_RESOURCES = true;
    // auto-detect by top-level domain (override by setting window.TEACHER_RESOURCES_AVAILABLE_OVERRIDE = true/false)
    let TEACHER_RESOURCES_AVAILABLE = false;
    if (typeof window !== 'undefined') {
        if (typeof window.TEACHER_RESOURCES_AVAILABLE_OVERRIDE === 'boolean') {
            TEACHER_RESOURCES_AVAILABLE = window.TEACHER_RESOURCES_AVAILABLE_OVERRIDE;
        } else if (AUTO_DETECT_TEACHER_RESOURCES && window.location && typeof window.location.hostname === 'string') {
            // assume teacher resources are available in Tunisia (.tn) — adjust detection logic as needed
            TEACHER_RESOURCES_AVAILABLE = window.location.hostname.endsWith('.com');
        }
    }

    const products = [
        {
            id: "grade4-student-book",
            sku: "LL-G4-SB",
            name: "Grade 4 Student Book",
            grade: "4",
            gradeLabel: "4th",
            type: "core",
            price: 35,
            summary: "Student textbook with interactive tasks and audio QR codes.",
            description: "A complete grade 4 student book aligned with the Tunisian curriculum. Includes skills practice, storytelling units, and speaking games.",
            highlights: [
                "12 thematic units with culture notes",
                "Audio support via QR codes and Google Drive",
                "End-of-term projects and evaluation rubrics"
            ],
            includes: ["Student book (96 pages)", "Downloadable audio", "Digital worksheets pack"],
            shippingNote: "Ready to ship within 48 hours.",
            bestseller: true,
            tags: ["grade 4", "student book", "audio"],
            resources: [
                { label: "Audio playlist", url: "https://youtube.com/playlist?list=PLNCxjpGjFhX12Y6TAWceUKZR70fijOQxW&si=WTv_WGlQdjo3c0WL" },
                { label: "4th grade key", url: "/assets/img/4th Grade - Key.pdf" },
                { label: "4th grade | Listening scripts", url: "/assets/img/4th grade - Listening scripts.pdf" }
            ],
            images: [
                "../assets/img/5.png",
                "https://i.postimg.cc/QNgKnJYc/4th-grade-book-final-merge-34.png",
                "https://i.postimg.cc/28zLpLgM/4th-grade-book-final-merge-65.png"
            ]
        },
        {
            id: "grade5-student-book",
            sku: "LL-G5-SB",
            name: "Grade 5 Student Book",
            grade: "5",
            gradeLabel: "5th",
            type: "core",
            price: 35,
            summary: "Student textbook with interactive tasks and audio QR codes.",
            description: "Engaging grammar, vocabulary, and communication tasks for grade 5 learners. Co-created with Tunisian teachers to ensure curriculum alignment and classroom relevance.",
            highlights: [
                "7 lingolander's learning profiles",
                "Differentiated reading passages",
                "Project-based learning tasks each term"
            ],
            includes: ["Student book", "Teacher-ready answer key", "Listening scripts"],
            shippingNote: "Delivery in Sfax within 24h.",
            tags: ["grade 5", "textbook", "teacher support"],
            resources: [
                { label: "Audio playlist", url: "https://youtube.com/playlist?list=PLNCxjpGjFhX2f6FVCH9gpteycqvPv5a0t&si=cPXBfM1e5TdTn3iq" },
                { label: "5th grade key", url: "/assets/img/5th grade key new.pdf" },
                { label: "5th grade | Listening scripts", url: "/assets/img/5th grade - Listening scripts.pdf" }
            ],
            images: [
                "../assets/img/1.png",
                "https://i.postimg.cc/SND2mNhs/5th-grade-final-book-merge-16.png",
                "https://i.postimg.cc/6pq7qJWh/5th-grade-final-book-merge-26.png"
            ]
        },
        {
            id: "grade6-student-book",
            sku: "LL-G6-SB",
            name: "Grade 6 Student Book",
            grade: "6",
            gradeLabel: "6th",
            type: "core",
            price: 35,
            summary: "Comprehensive language journey Student interactive tasks, projects and assessments and audio QR codes.",
            description: "In-depth grammar tutorials, vocabulary maps, and CLIL exploration for grade 6 students. Co-created with classroom teachers across Tunisia.",
            highlights: [
                "Step-by-step assessment preparation",
                "Integrated listening transcripts",
                "Grade 6 progress check"
            ],
            includes: ["Student book", "Project pack", "Listening scripts"],
            shippingNote: "Ships nationwide within 72h.",
            bestseller: true,
            tags: ["grade 6", "project based", "assessment"],
            resources: [
                { label: "Audio playlist", url: "https://www.youtube.com/playlist?list=PLNCxjpGjFhX1vK0-aMdMJobcvabMR8hRb" },
                { label: "6th grade key", url: "/assets/img/6th grade Key new.pdf" },
                { label: "6th grade | Listening scripts", url: "/assets/img/6th grade - Listening scripts.pdf" },
                { label: "6th grade progress check", url: "/assets/img/6th grade - progress check.pdf" }
            ],
            images: [
                "../assets/img/14.png",
                "https://i.postimg.cc/5yfyMDKL/6th-grade-final-book-merge-103.png",
                "https://i.postimg.cc/85QsZ7hy/6th-grade-final-book-merge-124.png"
            ]
        },
        {
            id: "grade6-writing-guide",
            sku: "LL-G6-WG",
            name: "Grade 6 Writing Guide",
            grade: "6",
            gradeLabel: "6th",
            type: "support",
            price: 30,
            summary: "Writing handbook with sentence frames, rubrics, and mentor texts.",
            description: "Model compositions, grammar tips, and editable planners to improve writing outcomes. Perfect companion for exam prep.",
            highlights: [
                "Diffrent writing genres with exemplars",
                "Peer review checklists",
                "QR codes linking to mini-lessons"
            ],
            includes: ["Writing handbook", "Editable planners", "Rubric templates"],
            shippingNote: "Ships within 48h.",
            tags: ["grade 6", "writing", "handbook"],
            resources: [
                { label: "Mini-lesson playlist", url: "https://youtube.com/playlist?list=PLNCxjpGjFhX2IkpZBtnY7shyuCWcv651Y&si=ZA9ghJOhs27QsI3U" },
                { label: "6th Grade Writing guide - Key", url: "/assets/img/6th Grade Writing guide - Key.pdf" },
                { label: "Coming Soon !", url: "" }
            ],
            images: [
                "../assets/img/6thwritingguidcover.png",
                "../assets/img/6th grade writing guide_6.png",
                "../assets/img/6th grade writing guide_3.png"
            ]
        },
        {
            id: "grade6-premium-bundle",
            sku: "LL-G6-BUNDLE",
            name: "Grade 6 Premium Bundle",
            grade: "6",
            gradeLabel: "6th",
            type: "bundle",
            price: 60,
            summary: "Complete classroom pack with student book, notebooks, and project tools.",
            description: "All-in-one kit for grade 6 classrooms. notebooks, storyboard sets, and sticker packs for gamified projects.",
            highlights: [
                "Teacher dashboard access",
                "Project storyboard collection",
                "Achievement sticker pack"
            ],
            includes: ["Student book", "Fun & Focus notebook", "Words & Wonders notebook", "Storyboard kit", "Sticker pack"],
            shippingNote: "Bundle ships on Tuesdays and Thursdays.",
            bestseller: false,
            tags: ["bundle", "grade 6", "classroom kit"],
            resources: [
                { label: "Teacher dashboard login", url: "https://teacher.lingo-land.net" },
                { label: "Bundle orientation playlist", url: "https://youtube.com/playlist?list=PLNCxjpGjFhX0AIvOy1ufbN-MIbmUVaLdx&si=ygrr9Rum2zWp6t3x" },
            ],
            images: [
                "../assets/img/box.png",
                "../assets/img/boxbox.png",
                "../assets/img/pp.png",
                "../assets/img/ww.png",
                "../assets/img/ff.png"
            ]
        },
        {
            id: "grade6-words-wonders",
            sku: "LL-G6-WW",
            name: "Words & Wonders Notebook",
            grade: "6",
            gradeLabel: "6th",
            type: "support",
            price: 20,
            summary: "Vocabulary and creative writing notebook for daily practice.",
            description: "Guided vocabulary building with illustrated mind maps, sticker prompts, and QR-linked pronunciation support.",
            highlights: [
                "Daily vocabulary tracker",
                "Creative writing prompts",
                "Audio pronunciation support"
            ],
            includes: ["Vocabulary notebook", "Audio QR stickers"],
            shippingNote: "Available for bulk orders.",
            tags: ["notebook", "vocabulary", "grade 6"],
            resources: [
                { label: "Grammar Explainer playlist", url: "https://www.youtube.com/playlist?list=PLNCxjpGjFhX2IkpZBtnY7shyuCWcv651Y" },
            ],
            images: [
                "https://i.postimg.cc/Qt3xpR3w/Words-and-wonders-cover-1.png",
                "../assets/img/wordsandwonder.png",
                "../assets/img/ww.png"
            ]
        },
        {
            id: "grade6-fun-focus",
            sku: "LL-G6-FF",
            name: "Fun & Focus Notebook",
            grade: "6",
            gradeLabel: "6th",
            type: "support",
            price: 20,
            summary: "Grammar drills and listening tasks in an engaging workbook.",
            description: "Spiral review notebook covering listening, grammar, and pronunciation. Ideal for homework and support sessions.",
            highlights: [
                "Weekly listening labs",
                "Teacher grading tracker",
                "Game-based grammar drills"
            ],
            includes: ["Notebook", "Audio QR pack", "Teacher tracker"],
            shippingNote: "Ships in 48h.",
            tags: ["notebook", "grammar", "listening"],
            // resources: [
            //     { label: "Listening lab playlist", url: "" },
            //     { label: "Homework tracker sheets", url: "" },
            //     { label: "Grammar game templates", url: "" }
            // ],
            images: [
                "https://i.postimg.cc/6p83wrcj/Fun-and-focus-cover-1.png",
                "../assets/img/funandfoucus.png",
                "../assets/img/ff.png"
            ]
        },
        {
            id: "grade9-student-book",
            sku: "LL-G9-SB",
            name: "Grade 9 Student Book",
            grade: "9",
            gradeLabel: "9th",
            type: "core",
            price: 40,
            summary: "Advanced communicative units preparing students for national exams and audio QR codes.",
            description: "Integrated skills book for grade 9 with in class coursebook activities, grammar labs, and test practice aligned with national exam specifications.",
            highlights: [
                "Exam-style practice papers",
                "Listening labs with QR codes",
                "In class coursebook activities"
            ],
            includes: ["Student book", "Exam practice pack", "Listening scripts"],
            shippingNote: "Delivery nationwide within 72h.",
            bestseller: true,
            tags: ["grade 9", "exam prep", "student book"],
            resources: [
                { label: "Listening labs playlist", url: "https://www.youtube.com/playlist?list=PLNCxjpGjFhX11yT-knprkmziGjl-fljK0" },
                { label: "9th grade key", url: "/assets/img/9th grade - Key.pdf" },
                { label: "9th grade | Listening scripts", url: "/assets/img/9th grade - Listening scripts.pdf" },
                { label: "9th grade progress check", url: "/assets/img/9th grade - progress check.pdf" }
            ],
            images: [
                "../assets/img/16.png",
                "../assets/img/9-1.png",
                "../assets/img/9-2.png"
            ]
        },
        {
            id: "grade9-writing-guide",
            sku: "LL-G9-WG",
            name: "Grade 9 Writing Guide",
            grade: "9",
            gradeLabel: "9th",
            type: "support",
            price: 35,
            summary: "Structured writing support for exam excellence.",
            description: "Genre-based writing guide with annotated samples, phrase banks, and evaluation rubrics tailored for grade 9 assessments.",
            highlights: [
                "Annotated model compositions",
                "Rubrics for self and peer assessment",
                "Writing workshops and mini lessons"
            ],
            includes: ["Writing guide", "Rubric pack", "Editable planners"],
            shippingNote: "Ships same week.",
            tags: ["writing", "grade 9", "exam"],
            resources: [
                // { label: "Writing workshop playlist", url: "" },
                { label: "9th Grade Writing guide - Key", url: "/assets/img/9th Grade Writing guide - Key.pdf" },
                { label: "Coming Soon !", url: "" }
            ],
            images: [
                "../assets/img/9thwritingguidcover.png",
                "../assets/img/9th grade writing guide_6.png",
                "../assets/img/9th grade writing guide_3.png"
            ]
        },
        {
            id: "4th-form-student-book",
            sku: "LL-4F-SB",
            name: "4th Form Student Book",
            grade: "4th-form",
            gradeLabel: "bac",
            type: "core",
            price: 40,
            summary: "Complete BAC prep course with authentic reading and oral tasks.",
            description: "High-impact student book covering all BAC competencies with authentic texts, case studies, and oral presentation scaffolds.",
            highlights: [
                "BAC-style comprehension passages",
                "Advanced grammar workshops",
                "Presentation and debate scaffolds"
            ],
            includes: ["Student book", "Practice exams", "Audio pack"],
            shippingNote: "Ships within 72h nationwide.",
            tags: ["4th form", "BAC", "student book"],
            resources: [
                { label: "BAC playlist", url: "https://www.youtube.com/playlist?list=PLNCxjpGjFhX1r4EEWwyi4vZJXu6ixq-C9" },
                { label: "4th form (Bac) Key", url: "/assets/img/4th form - Key.pdf" },
                { label: "4th form | Listening scripts", url: "/assets/img/4th form - Listening scripts.pdf" }
            ],
            images: [
                "../assets/img/cover.png",
                "../assets/img/Bac Class Book FINAL with numbers_4.png",
                "../assets/img/Bac Class Book FINAL with numbers_10.png"
            ]
        },
        {
            id: "4th-form-writing-guide",
            sku: "LL-4F-WG",
            name: "4th Form Writing Guide",
            grade: "4th-form",
            gradeLabel: "bac",
            type: "support",
            price: 35,
            summary: "Masterclasses for BAC writing tasks with annotated samples.",
            description: "Advanced writing strategies, sample essays, and speaking prompts that align with BAC evaluation grids.",
            highlights: [
                "Argumentative & opinion essay frameworks",
                "Annotated BAC scripts",
                "Speaking and mediation prompts"
            ],
            includes: ["Writing guide", "Essay planner pack", "Speaking prompt cards"],
            shippingNote: "Ready to dispatch within 48h.",
            tags: ["4th form", "writing", "BAC"],
            resources: [
                // { label: "Essay workshop playlist", url: "" },
                // { label: "Planner templates", url: "" },
                { label: "Coming Soon !", url: "" }
            ],
            images: [
                "../assets/img/4thformwritingcover.png",
                "../assets/img/4th form writing guide_3.png",
                "../assets/img/4th form writing guide_4.png"
            ]
        }
    ];

    // sanitize teacher-related entries when teacher resources are not available
    if (!TEACHER_RESOURCES_AVAILABLE) {
        const teacherRegex = /teacher/i;
        products.forEach(p => {
            // includes: replace teacher-related entries with "Coming Soon !" or remove empty placeholders
            if (Array.isArray(p.includes)) {
                p.includes = p.includes.map(item => {
                    return teacherRegex.test(item) ? "Coming Soon !" : item;
                }).filter(Boolean);
            }

            // resources: mark teacher-related resources as Coming Soon !
            if (Array.isArray(p.resources)) {
                p.resources = p.resources.map(r => {
                    const label = (r && r.label) || '';
                    const url = (r && r.url) || '';
                    if (teacherRegex.test(label) || teacherRegex.test(url)) {
                        return { label: "Coming Soon !", url: "" };
                    }
                    return r;
                });
            }

            // tags: remove explicit teacher-related tags if any
            if (Array.isArray(p.tags)) {
                p.tags = p.tags.filter(t => !teacherRegex.test(t));
            }

            // highlights/descriptions: optionally remove explicit teacher mentions
            if (Array.isArray(p.highlights)) {
                p.highlights = p.highlights.map(h => teacherRegex.test(h) ? "Coming Soon !" : h);
            }
            if (typeof p.description === 'string' && teacherRegex.test(p.description)) {
                p.description = p.description.replace(teacherRegex, "Instructor").replace(/\s+Instructor/i, ""); // minimal adjustment
            }
        });
    }

    window.STORE_PRODUCTS = products;
})();