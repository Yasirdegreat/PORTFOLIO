// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Skill cards animation on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const techItems = document.querySelectorAll('.tech-item');

    // Intersection Observer for skill cards
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each skill card
    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Observe each tech item
    techItems.forEach(item => {
        observer.observe(item);
    });

    // Add hover effect for skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.learn-more i').style.transform = 'translateX(10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.learn-more i').style.transform = 'translateX(0)';
        });
    });

    // Add typing effect to profile subtitle
    const subtitle = document.querySelector('.profile-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect when the element is in view
        const subtitleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                subtitleObserver.unobserve(subtitle);
            }
        });

        subtitleObserver.observe(subtitle);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Resume Section Functionality
    // Tab switching functionality
    const tabs = document.querySelectorAll('.resume-tab');
    const contents = document.querySelectorAll('.resume-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.progress');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.dataset.percent;
                entry.target.style.width = `${percent}%`;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillBarObserver.observe(bar));

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Download CV functionality
    const downloadBtn = document.getElementById('downloadCV');
    
    downloadBtn.addEventListener('click', function(e) {
        // Check if file exists
        fetch(this.href)
            .then(response => {
                if (response.ok) {
                    // File exists, proceed with download
                    downloadBtn.classList.add('downloading');
                    
                    setTimeout(() => {
                        downloadBtn.classList.add('downloaded');
                        downloadBtn.querySelector('span').textContent = 'Downloaded!';
                        
                        // Reset button state
                        setTimeout(() => {
                            downloadBtn.classList.remove('downloading', 'downloaded');
                            downloadBtn.querySelector('span').textContent = 'Download CV';
                        }, 2000);
                    }, 1000);
                } else {
                    // File doesn't exist
                    alert('CV file is currently unavailable. Please try again later.');
                    e.preventDefault();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error downloading the CV. Please try again later.');
                e.preventDefault();
            });
    });

    // Navigation functionality
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smart Navigation functionality
    const smartNav = document.getElementById('smartNav');
    const menuTrigger = document.getElementById('menuTrigger');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    let lastScroll = 0;
    
    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    // Handle scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            smartNav.classList.remove('nav-hidden');
            return;
        }
        
        if (currentScroll > lastScroll && !smartNav.classList.contains('nav-hidden')) {
            // Scroll down
            smartNav.classList.add('nav-hidden');
            closeMenu();
        } else if (currentScroll < lastScroll && smartNav.classList.contains('nav-hidden')) {
            // Scroll up
            smartNav.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Toggle menu
    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.toggle('active');
        navMenu.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu function
    function closeMenu() {
        menuTrigger.classList.remove('active');
        navMenu.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu when clicking backdrop
    backdrop.addEventListener('click', closeMenu);

    // Close menu when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Smooth scroll to sections
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - smartNav.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add this CSS to your styles.css file
const styles = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #3498db, #2ecc71);
        z-index: 9999;
        transition: width 0.2s ease;
    }

    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .loaded .skill-card,
    .loaded .tech-item {
        opacity: 0;
    }

    .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .resume-content {
        display: none;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }

    .resume-content.active {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 