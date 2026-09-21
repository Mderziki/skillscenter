// SkillsCenter JavaScript with Language Support & Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navCta = document.querySelector('.nav-cta');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle with animation
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Touch-friendly tap highlight removal
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        el.addEventListener('touchend', function() {
            this.classList.remove('touched');
        });
    });
    
    // Language switching
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';
    
    function setLanguage(lang) {
        currentLang = lang;
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                if (el.innerHTML !== el.textContent || el.querySelector('.gradient-text')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });
        
        // Update language button states
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Set document direction for Arabic
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = lang;
        }
        
        localStorage.setItem('skillscenter-lang', lang);
    }
    
    // Add click handlers to language buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('skillscenter-lang');
    if (savedLang) {
        setLanguage(savedLang);
    }
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle window resize - close mobile menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});