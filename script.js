document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(element => {
        element.classList.add('active');
    });
    
    
    document.querySelectorAll('.properties__image').forEach(element => {
        element.classList.add('reveal', 'active');
    });
    
    document.querySelectorAll('.features-list__item').forEach((element, index) => {
        element.classList.add('reveal', 'active');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    if (document.querySelector('.contact__form-wrapper')) {
        document.querySelector('.contact__form-wrapper').classList.add('reveal-left', 'active');
    }
    
    if (document.querySelector('.contact__image')) {
        document.querySelector('.contact__image').classList.add('reveal-right', 'active');
    }
    
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const privacyCheckbox = document.getElementById('privacy');
            
            let isValid = true;
            
            
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!privacyCheckbox.checked) {
                highlightError(privacyCheckbox.parentElement);
                isValid = false;
            } else {
                removeError(privacyCheckbox.parentElement);
            }
            
            if (isValid) {
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'SENDING...';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = 'SUBMIT FORM';
                    showSuccessMessage();
                }, 1500);
            }
        });
    }
    
    function highlightError(element) {
        element.classList.add('error');
    }
    
    function removeError(element) {
        element.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! Your message has been sent.';
        
        const formWrapper = document.querySelector('.contact__form-wrapper');
        formWrapper.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                formWrapper.removeChild(successMessage);
            }, 300);
        }, 3000);
    }
    
    
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }
        
        .success-message.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border-color: #ff3860 !important;
        }
        
        .form-group--checkbox.error {
            color: #ff3860;
        }
    `;
    document.head.appendChild(style);
}); 
