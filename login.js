document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailLoginForm = document.getElementById('email-login-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const otpLoginForm = document.getElementById('otp-login-form');
    const showForgotPassword = document.getElementById('show-forgot-password');
    const showOtpLogin = document.getElementById('show-otp-login');
    const backToLoginFromForgot = document.getElementById('back-to-login-from-forgot');
    const backToLoginFromOtp = document.getElementById('back-to-login-from-otp');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const otpInputGroup = document.getElementById('otp-input-group');
    const otpTimer = document.getElementById('otp-timer');
    const countdownElement = document.getElementById('countdown');
    const otpDigits = document.querySelectorAll('.otp-digit');

    // Toggle between forms
    showForgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        emailLoginForm.style.display = 'none';
        otpLoginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    });

    showOtpLogin.addEventListener('click', function(e) {
        e.preventDefault();
        emailLoginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        otpLoginForm.style.display = 'block';
    });

    backToLoginFromForgot.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordForm.style.display = 'none';
        otpLoginForm.style.display = 'none';
        emailLoginForm.style.display = 'block';
    });

    backToLoginFromOtp.addEventListener('click', function(e) {
        e.preventDefault();
        otpLoginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        emailLoginForm.style.display = 'block';
    });

    // OTP Digit Input Handling
    otpDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpDigits.length - 1) {
                    otpDigits[index + 1].focus();
                } else {
                    this.blur();
                }
            }
        });

        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpDigits[index - 1].focus();
            }
        });
    });

    // Send OTP Button
    sendOtpBtn.addEventListener('click', function() {
        const phoneInput = document.getElementById('phone');
        
        // Simple validation
        if (!phoneInput.value.trim()) {
            alert('Please enter your phone number');
            return;
        }
        
        // Simulate sending OTP
        console.log('OTP sent to:', phoneInput.value);
        
        // Show OTP input fields
        otpInputGroup.style.display = 'block';
        sendOtpBtn.style.display = 'none';
        
        // Start countdown timer
        startOtpCountdown();
    });

    // OTP Countdown Timer
    function startOtpCountdown() {
        let timeLeft = 60;
        otpTimer.style.display = 'block';
        
        const countdown = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                otpTimer.innerHTML = '<a href="#" id="resend-otp">Resend OTP</a>';
                
                document.getElementById('resend-otp').addEventListener('click', function(e) {
                    e.preventDefault();
                    startOtpCountdown();
                });
            }
        }, 1000);
    }

    // Form Submissions
    emailLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // In a real app, you would validate and send to server
        console.log('Email login submitted:', { email, password, rememberMe });
        alert('Login successful! (This is a demo)');
    });

    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        
        // In a real app, you would send to server
        console.log('Password reset requested for:', email);
        alert('Password reset link sent! (This is a demo)');
        
        // Go back to login form
        forgotPasswordForm.style.display = 'none';
        emailLoginForm.style.display = 'block';
    });

    otpLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let otp = '';
        otpDigits.forEach(digit => {
            otp += digit.value;
        });
        
        // In a real app, you would validate OTP with server
        console.log('OTP submitted:', otp);
        alert('OTP verified! Login successful. (This is a demo)');
    });

    // Social Login Buttons (demo functionality)
    document.querySelector('.google-btn').addEventListener('click', function() {
        // In a real app, this would integrate with Google OAuth
        console.log('Google login clicked');
        alert('This would redirect to Google OAuth in a real app');
    });

    document.querySelector('.facebook-btn').addEventListener('click', function() {
        // In a real app, this would integrate with Facebook OAuth
        console.log('Facebook login clicked');
        alert('This would redirect to Facebook OAuth in a real app');
    });
});