// ===== GLOBAL CONFIGURATION - UPDATE FROM ONE PLACE =====
        const CONFIG = {
            PHONE: "+44 7756589048",
            PHONE_LINK: "+44 7756589048",
            EMAIL: "Naveencreations4@gmail.com",
            EMAIL_CONTACT: "Naveencreations4@gmail.com",
            ADDRESS: "13 The Roundway, Watford, WD18 6LB",
            BUSINESS_HOURS: "Mon-Fri: 9am - 6pm",
            PROPERTIES_MANAGED: "500+",
            HAPPY_TENANTS: "1200+",
            YEARS_EXPERIENCE: "15+"
        };

        // Update all contact info dynamically
        function updateContactInfo() {
            document.querySelectorAll('[data-contact="phone"]').forEach(el => el.textContent = CONFIG.PHONE);
            document.querySelectorAll('[data-contact="email"]').forEach(el => el.textContent = CONFIG.EMAIL);
            document.querySelectorAll('[data-contact="email-contact"]').forEach(el => el.textContent = CONFIG.EMAIL_CONTACT);
            document.querySelectorAll('[data-contact="address"]').forEach(el => el.textContent = CONFIG.ADDRESS);
            document.querySelectorAll('[data-contact="hours"]').forEach(el => el.textContent = CONFIG.BUSINESS_HOURS);
            document.querySelectorAll('[data-stat="properties"]').forEach(el => el.textContent = CONFIG.PROPERTIES_MANAGED);
            document.querySelectorAll('[data-stat="tenants"]').forEach(el => el.textContent = CONFIG.HAPPY_TENANTS);
            document.querySelectorAll('[data-stat="years"]').forEach(el => el.textContent = CONFIG.YEARS_EXPERIENCE);
        }

        // Property Data
        const propertiesList = [
            { name: "Modern Family Home", area: "2,500 sqm", price: "£1.5M", oldPrice: "£1.0M", img: "./images/Modern-Family-Home.jpg", featured: true },
            { name: "Luxury Apartment", area: "400 sqm", price: "£1.0M", oldPrice: "£800k", img: "./images/luxury-apartment.avif", featured: true },
            { name: "City View Condo", area: "300 sqm", price: "£1.0M", oldPrice: "£1.0M", img: "./images/city-view.avif", featured: true },
            { name: "Elegant Villa", area: "200 sqm", price: "£1.0M", oldPrice: "£1.0M", img: "./images/hero.jpg", featured: true },
            { name: "Riverside Manor", area: "780 sqm", price: "£2.4M", oldPrice: "£2.7M", img: "./images/riverside-manor.avif", featured: false },
            { name: "Parkview Penthouse", area: "320 sqm", price: "£1.2M", oldPrice: "£1.35M", img: "./images/parkview-penthouse.avif", featured: false }
        ];

        const servicesData = [
            { icon: "fas fa-chart-line", title: "Property Marketing", desc: "Premium exposure", stat: `${CONFIG.PROPERTIES_MANAGED} Managed` },
            { icon: "fas fa-user-check", title: "Smart Screening", desc: "Verified tenants", stat: `${CONFIG.HAPPY_TENANTS} Tenants` },
            { icon: "fas fa-gavel", title: "Real Estate Advisory", desc: "Expert guidance", stat: `${CONFIG.YEARS_EXPERIENCE} Years` },
            { icon: "fas fa-file-invoice", title: "Legal & Tax", desc: "Financial statements, Tax returns", stat: "100% Compliant" }
        ];

        function buildCard(p) {
            return `<div class="property-card"><div class="card-img" style="background-image: url('${p.img}');"></div><div class="card-content"><h3>${p.name}</h3><div class="area"><i class="fas fa-ruler-combined"></i> ${p.area}</div><div class="price-row"><div>${p.oldPrice !== p.price ? `<span class="old-price">${p.oldPrice}</span>` : ''}<span class="price">${p.price}</span></div></div></div></div>`;
        }

        // Render all grids
        document.getElementById('featuredGrid').innerHTML = propertiesList.filter(p => p.featured).map(buildCard).join('');
        document.getElementById('allPropertiesGrid').innerHTML = propertiesList.map(buildCard).join('');
        document.getElementById('homeServicesGrid').innerHTML = servicesData.map(s => `<div class="service-card"><i class="${s.icon}"></i><h4>${s.title}</h4><p>${s.desc}</p><div class="stat-number" style="font-size:1rem; margin-top:0.5rem;">${s.stat}</div></div>`).join('');
        document.getElementById('fullServicesGrid').innerHTML = servicesData.map(s => `<div class="service-card"><i class="${s.icon}"></i><h4>${s.title}</h4><p>${s.desc}</p><div class="stat-number" style="font-size:1rem; margin-top:0.5rem;">${s.stat}</div></div>`).join('');

        // Update contact info from config
        updateContactInfo();

        // SPA Navigation
        const sections = {
            home: document.getElementById('home'),
            properties: document.getElementById('properties'),
            services: document.getElementById('services'),
            about: document.getElementById('about'),
            contact: document.getElementById('contact')
        };

        function showPage(pageId) {
            Object.keys(sections).forEach(k => { if (sections[k]) sections[k].style.display = 'none'; });
            if (sections[pageId]) sections[pageId].style.display = 'block';
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('data-page') === pageId) link.classList.add('active');
                else link.classList.remove('active');
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pg = link.getAttribute('data-page');
                if (pg) showPage(pg);
                document.getElementById('navLinks')?.classList.remove('active');
            });
        });

        document.getElementById('menuToggle')?.addEventListener('click', () => {
            document.getElementById('navLinks')?.classList.toggle('active');
        });

        document.getElementById('explorePropertiesBtn')?.addEventListener('click', (e) => { e.preventDefault(); showPage('properties'); });
        document.getElementById('getQuoteBtn')?.addEventListener('click', (e) => { e.preventDefault(); showPage('contact'); });

        // Contact form handler
        const contactForm = document.getElementById('contactFormMain');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('cName')?.value.trim();
                const email = document.getElementById('cEmail')?.value.trim();
                const msg = document.getElementById('cMsg')?.value.trim();
                if (name && email && msg) {
                    document.getElementById('formFeedbackMsg').innerHTML = '<span style="color: #1a7a62; background:#e0f2ed; padding:6px 14px; border-radius:40px; display:inline-block;">✅ Thank you! Our property experts will reach out shortly.</span>';
                    contactForm.reset();
                    setTimeout(() => { document.getElementById('formFeedbackMsg').innerHTML = ''; }, 5000);
                } else {
                    document.getElementById('formFeedbackMsg').innerHTML = '<span style="color:#b91c1c; background:#ffe6e5; padding:6px 14px; border-radius:40px;">⚠️ Please fill required fields (Name, Email, Message).</span>';
                }
            });
        }

        showPage('home');