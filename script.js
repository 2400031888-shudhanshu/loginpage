// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation (minimum 6 characters)
const validatePassword = (password) => password.length >= 6;

// Show error message
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

// Hide error message
function hideError(element) {
    element.classList.remove('show');
}

// Validate email
function validateEmail(email) {
    if (!email) {
        showError(emailError, 'Email to bharna padega bhai!');
        return false;
    }
    if (!emailRegex.test(email)) {
        showError(emailError, 'Ye kya email hai? Sahi daal!');
        return false;
    }
    hideError(emailError);
    return true;
}

// Validate password
function validatePasswordInput(password) {
    if (!password) {
        showError(passwordError, 'Password to likh bhai!');
        return false;
    }
    if (!validatePassword(password)) {
        showError(passwordError, 'Password kam se kam 6 characters ka hona chahiye!');
        return false;
    }
    hideError(passwordError);
    return true;
}

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle eye icon
    if (type === 'text') {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
    
    // Add animation
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
        this.style.transform = 'translateY(-50%) scale(1)';
    }, 200);
});

// Input validation on typing
emailInput.addEventListener('input', function() {
    if (this.value) {
        validateEmail(this.value);
    } else {
        hideError(emailError);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value) {
        validatePasswordInput(this.value);
    } else {
        hideError(passwordError);
    }
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePasswordInput(password);
    
    if (isEmailValid && isPasswordValid) {
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            loginForm.reset();
            hideError(emailError);
            hideError(passwordError);
            
            // Reset labels
            document.querySelectorAll('.input-label').forEach(label => {
                label.style.top = '50%';
                label.style.left = '50px';
                label.style.fontSize = '16px';
                label.style.background = 'transparent';
                label.style.color = '#999';
            });
            
        }, 2000);
    }
});

// Show success modal
function showSuccessModal() {
    successModal.classList.add('active');
    
    // Add confetti effect
    createConfetti();
}

// Close modal
closeModal.addEventListener('click', function() {
    successModal.classList.remove('active');
});

// Close modal when clicking outside
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Create confetti effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#4CAF50', '#FF9800', '#E91E63'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.opacity = '0.8';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Social button animations
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        setTimeout(() => {
            this.innerHTML = this.classList.contains('google') ? 
                '<i class="fab fa-google"></i> Google se jhoom jhoom' : 
                '<i class="fab fa-facebook-f"></i> Facebook pe bhi hai';
        }, 2000);
    });
});

// Input field animations
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.parentElement.style.transform = 'translateY(0)';
    });
});

// Button hover effects
loginBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

loginBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit
    if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to close modal
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
    }
});

// Form reset animation
function resetForm() {
    document.querySelectorAll('.input-field').forEach(input => {
        input.value = '';
        const label = input.nextElementSibling;
        if (label && label.classList.contains('input-label')) {
            label.style.cssText = '';
        }
    });
}

// Add subtle background animation
function animateBackground() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateBackground();
    
    // Add staggered animation to form elements
    const formElements = document.querySelectorAll('.input-group, .social-login, .form-options, .login-btn');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});

// Add floating label animation
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('input', function() {
        const label = this.nextElementSibling;
        if (label && label.classList.contains('input-label')) {
            if (this.value) {
                label.style.top = '-10px';
                label.style.left = '15px';
                label.style.fontSize = '12px';
                label.style.background = 'white';
                label.style.padding = '0 8px';
                label.style.color = '#667eea';
            } else {
                label.style.cssText = '';
            }
        }
    });
});

// Add wobble effect to error messages
function addWobble(element) {
    element.style.animation = 'wobble 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add wobble animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes wobble {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Enhanced error display
function showErrorEnhanced(element, message) {
    element.textContent = message;
    element.classList.add('show');
    addWobble(element);
}

// Override original showError
showError = showErrorEnhanced;

// Add celebration effect on successful login
function celebrate() {
    // Create celebration particles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 50);
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = ['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)];
    particle.style.position = 'fixed';
    particle.style.fontSize = '20px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0';
    particle.style.transition = 'all 2s ease';
    
    document.body.appendChild(particle);
    
    // Animate particle
    setTimeout(() => {
        particle.style.opacity = '1';
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
    }, 10);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.remove();
    }, 2000);
}

// Override showSuccessModal to include celebration
const originalShowSuccessModal = showSuccessModal;
showSuccessModal = function() {
    originalShowSuccessModal();
    celebrate();
};

// Add fun hover effects to links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});