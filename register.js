document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrengthBar = document.querySelector('.strength-bar');
    const passwordStrengthText = document.querySelector('.strength-text');
    const passwordMatchText = document.getElementById('password-match');
    const passwordRequirements = {
        length: document.querySelector('.req-length'),
        uppercase: document.querySelector('.req-uppercase'),
        number: document.querySelector('.req-number'),
        special: document.querySelector('.req-special')
    };

    // Password Strength Checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) {
            strength += 1;
            passwordRequirements.length.classList.add('valid');
        } else {
            passwordRequirements.length.classList.remove('valid');
        }
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 1;
            passwordRequirements.uppercase.classList.add('valid');
        } else {
            passwordRequirements.uppercase.classList.remove('valid');
        }
        
        // Check for numbers
        if (/\d/.test(password)) {
            strength += 1;
            passwordRequirements.number.classList.add('valid');
        } else {
            passwordRequirements.number.classList.remove('valid');
        }
        
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
            passwordRequirements.special.classList.add('valid');
        } else {
            passwordRequirements.special.classList.remove('valid');
        }
        
        // Update strength bar and text
        const width = (strength / 4) * 100;
        passwordStrengthBar.style.width = width + '%';
        
        if (strength <= 1) {
            passwordStrengthBar.style.backgroundColor = '#e74c3c';
            passwordStrengthText.textContent = 'Weak';
        } else if (strength <= 3) {
            passwordStrengthBar.style.backgroundColor = '#f39c12';
            passwordStrengthText.textContent = 'Medium';
        } else {
            passwordStrengthBar.style.backgroundColor = '#2ecc71';
            passwordStrengthText.textContent = 'Strong';
        }
    });

    // Password Match Checker
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            passwordMatchText.textContent = 'Passwords do not match';
            passwordMatchText.classList.remove('valid');
        } else {
            passwordMatchText.textContent = 'Passwords match';
            passwordMatchText.classList.add('valid');
        }
        
        if (this.value === '' && passwordInput.value === '') {
            passwordMatchText.textContent = '';
        }
    });

    // Form Submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const accountType = document.querySelector('input[name="account-type"]:checked').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const agreedToTerms = document.getElementById('terms').checked;
        const newsletter = document.getElementById('newsletter').checked;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Validate password strength
        const strength = calculatePasswordStrength(password);
        if (strength <= 1) {
            alert('Please choose a stronger password');
            return;
        }
        
        // Validate terms agreement
        if (!agreedToTerms) {
            alert('You must agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        // In a real app, you would send this data to your server
        console.log('Registration submitted:', {
            fullName,
            email,
            phone,
            accountType,
            password,
            agreedToTerms,
            newsletter
        });
        
        // Show success message
        alert('Registration successful! Welcome to our community.');
        registrationForm.reset();
    });

    // Helper function to calculate password strength
    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    }

    // Show password requirements on focus
    passwordInput.addEventListener('focus', function() {
        document.querySelector('.password-requirements').style.display = 'block';
    });

    passwordInput.addEventListener('blur', function() {
        document.querySelector('.password-requirements').style.display = 'none';
    });
});
