// Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = this.name.value;
            const email = this.email.value;
            const subject = this.subject.value;
            const message = this.message.value;
            
            const statusEl = document.getElementById('formStatus');
            
            try {
                const res = await fetch('https://formspree.io/f/xwprqlzd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });
                
                if (res.ok) {
                    statusEl.textContent = `Thank you ${name}! for your message! I will get back to you soon.`;
                    statusEl.style.color = 'green';
                    this.reset();
                } else{
                    statusEl.textContent = "Oops! Something went wrong.";
                    statusEl.style.color = 'red';
                }
            } catch (err) {
                alert("Error sending message. Please try again.");
            }
        });
        
        // Active navigation link
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.about-img, .skill, .project-card, .contact-item, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // Animate skills with staggered delay
        document.querySelectorAll('.skill').forEach((skill, index) => {
            skill.style.transitionDelay = `${index * 0.1}s`;
        });

        // Animate contact items with staggered delay
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.2}s`;
        });