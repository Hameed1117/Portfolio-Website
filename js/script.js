// ===========================================
// THEME SWITCHING FUNCTIONALITY
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all theme option buttons (both desktop and mobile)
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
    
    // Add click event listeners to theme buttons
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            // Get the selected theme from data attribute
            const selectedTheme = this.getAttribute('data-theme');
            
            // Remove any existing theme classes
            document.body.classList.remove('light-theme', 'dark-theme');
            
            // Apply the selected theme
            if (selectedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                localStorage.setItem('selectedTheme', 'dark-theme');
            } else {
                // Light theme is default, no class needed
                localStorage.setItem('selectedTheme', '');
            }
            
            // Close desktop dropdown after selection (if exists)
            const dropdown = document.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.display = 'none';
                
                // Show dropdown again after a brief delay for better UX
                setTimeout(() => {
                    dropdown.style.display = '';
                }, 300);
            }
            
            // Close mobile menu after theme selection
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            const mobileThemeMenu = document.querySelector('.mobile-theme-menu');
            
            if (mobileMenuBtn && navMenu && mobileThemeMenu) {
                setTimeout(() => {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileThemeMenu.classList.remove('active');
                }, 300);
            }
            
            // Optional: Add visual feedback for theme change
            showThemeChangeNotification(selectedTheme);
        });
    });
    
    // ===========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ===========================================
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===========================================
    // ENHANCED BUTTON INTERACTIONS
    // ===========================================
    
    // Add ripple effect to buttons on click
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Apply ripple effect to navigation buttons
    const buttons = document.querySelectorAll('.nav-menu a, .dropdown-menu a, .mobile-theme-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // ===========================================
    // MOBILE MENU FUNCTIONALITY
    // ===========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const mobileThemeMenu = document.querySelector('.mobile-theme-menu');

    // Toggle main mobile menu and theme menu
    if (mobileMenuBtn && navMenu && mobileThemeMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle active class on menu button
            this.classList.toggle('active');
            
            // Toggle active class on nav menu
            navMenu.classList.toggle('active');
            
            // Toggle active class on mobile theme menu
            mobileThemeMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on regular nav links
    const mobileNavLinks = document.querySelectorAll('.nav-menu a:not(.theme-option)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuBtn && navMenu && mobileThemeMenu) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileThemeMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuBtn && navMenu && mobileThemeMenu) {
            if (!navMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target) && 
                !mobileThemeMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileThemeMenu.classList.remove('active');
            }
        }
    });

    // Reset mobile menu state when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileMenuBtn && navMenu && mobileThemeMenu) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileThemeMenu.classList.remove('active');
            }
        }
    });
});

// ===========================================
// THEME CHANGE NOTIFICATION FUNCTION
// ===========================================
function showThemeChangeNotification(theme) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = `Switched to ${theme} theme`;
    notification.style.cssText = `
        position: fixed;
        top: 2%;
        left: 43%;
        transform: translate(-50%, -50%);
        background-color: ${theme === 'dark' ? '#333' : '#fff'};
        color: ${theme === 'dark' ? '#fff' : '#333'};
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 10000;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// ===========================================
// RIPPLE EFFECT CSS (Dynamically added)
// ===========================================
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS into document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);