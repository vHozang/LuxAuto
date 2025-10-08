// Registration page specific functionality
// Handles multi-step form validation, password strength checking, and form submission

document.addEventListener('DOMContentLoaded', function() {
    initRegistrationPage();
});

let currentStep = 1;
const totalSteps = 5;
let formData = {};

function initRegistrationPage() {
    initStepNavigation();
    initFormValidation();
    initPasswordStrength();
    initProgressIndicator();
    initReviewSection();
}

// Step navigation functionality
function initStepNavigation() {
    // Next step buttons
    document.getElementById('nextStep1')?.addEventListener('click', () => {
        if (validateStep(1)) {
            saveStepData(1);
            goToStep(2);
        }
    });

    document.getElementById('nextStep2')?.addEventListener('click', () => {
        if (validateStep(2)) {
            saveStepData(2);
            goToStep(3);
        }
    });

    document.getElementById('nextStep3')?.addEventListener('click', () => {
        if (validateStep(3)) {
            saveStepData(3);
            goToStep(4);
        }
    });

    document.getElementById('nextStep4')?.addEventListener('click', () => {
        if (validateStep(4)) {
            saveStepData(4);
            goToStep(5);
            populateReviewSection();
        }
    });

    // Previous step buttons
    document.getElementById('prevStep2')?.addEventListener('click', () => goToStep(1));
    document.getElementById('prevStep3')?.addEventListener('click', () => goToStep(2));
    document.getElementById('prevStep4')?.addEventListener('click', () => goToStep(3));
    document.getElementById('prevStep5')?.addEventListener('click', () => goToStep(4));

    // Edit buttons in review section
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            goToStep(step);
        });
    });

    // Form submission
    document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(5)) {
            submitRegistration();
        }
    });
}

function goToStep(stepNumber) {
    // Hide current step
    document.querySelector('.form-step.active')?.classList.remove('active');
    
    // Show target step
    document.getElementById(`step${stepNumber}`)?.classList.add('active');
    
    // Update progress indicator
    updateProgressIndicator(stepNumber);
    
    currentStep = stepNumber;
    
    // Scroll to top of form
    document.querySelector('.form-container')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

function updateProgressIndicator(stepNumber) {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach((step, index) => {
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Form validation
function initFormValidation() {
    const validationRules = {
        // Step 1: Personal Information
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must contain only letters and be 2-50 characters long'
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must contain only letters and be 2-50 characters long'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
            custom: validateEmailUniqueness
        },
        phone: {
            required: true,
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            message: 'Phone number must be in format: 123-456-7890'
        },
        birthDate: {
            required: true,
            custom: validateAge,
            message: 'You must be at least 18 years old'
        },
        
        // Step 2: Address Information
        address: {
            required: true,
            minLength: 5,
            message: 'Please enter a valid street address'
        },
        city: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'City must contain only letters'
        },
        state: {
            required: true,
            message: 'Please select a state'
        },
        zipCode: {
            required: true,
            pattern: /^\d{5}(-\d{4})?$/,
            message: 'ZIP code must be in format: 12345 or 12345-6789'
        },
        
        // Step 4: Security
        password: {
            required: true,
            minLength: 8,
            custom: validatePasswordStrength,
            message: 'Password must meet all requirements'
        },
        confirmPassword: {
            required: true,
            custom: validatePasswordMatch,
            message: 'Passwords do not match'
        },
        securityQuestion: {
            required: true,
            message: 'Please select a security question'
        },
        securityAnswer: {
            required: true,
            minLength: 3,
            message: 'Security answer must be at least 3 characters long'
        },
        
        // Step 5: Terms
        terms: {
            required: true,
            message: 'You must agree to the Terms of Service and Privacy Policy'
        },
        'age-verification': {
            required: true,
            message: 'You must confirm that you are at least 18 years old'
        }
    };

    // Add real-time validation to all form fields
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName, validationRules[fieldName]));
            field.addEventListener('input', () => {
                clearFieldError(fieldName);
                if (fieldName === 'password') {
                    updatePasswordStrength();
                }
                if (fieldName === 'confirmPassword') {
                    validatePasswordMatch();
                }
            });
        }
    });

    // Phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', formatPhoneNumber);
    }

    // Store validation rules for later use
    window.registrationValidationRules = validationRules;
}

function validateStep(stepNumber) {
    const rules = window.registrationValidationRules;
    let isValid = true;
    
    const stepFields = {
        1: ['firstName', 'lastName', 'email', 'phone', 'birthDate'],
        2: ['address', 'city', 'state', 'zipCode'],
        3: [], // Preferences step - no required fields
        4: ['password', 'confirmPassword', 'securityQuestion', 'securityAnswer'],
        5: ['terms', 'age-verification']
    };

    const fieldsToValidate = stepFields[stepNumber] || [];
    
    fieldsToValidate.forEach(fieldName => {
        if (rules[fieldName] && !validateField(fieldName, rules[fieldName])) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(fieldName, rules) {
    const field = document.getElementById(fieldName);
    if (!field) return true;

    const value = field.type === 'checkbox' ? field.checked : field.value.trim();

    // Required validation
    if (rules.required && (!value || value === '')) {
        showFieldError(fieldName, `${formatFieldName(fieldName)} is required`);
        return false;
    }

    // Skip other validations if field is empty and not required
    if (!rules.required && (!value || value === '')) {
        clearFieldError(fieldName);
        return true;
    }

    // Pattern validation
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    // Length validation
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    // Custom validation
    if (rules.custom && !rules.custom(value, field)) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    // Checkbox validation
    if (field.type === 'checkbox' && rules.required && !value) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    clearFieldError(fieldName);
    return true;
}

// Custom validation functions
function validateEmailUniqueness(email) {
    // Check against localStorage for existing registrations
    const existingUsers = JSON.parse(localStorage.getItem('luxauto_users') || '[]');
    return !existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
}

function validateAge(birthDate) {
    if (!birthDate) return false;
    
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 18;
    }
    
    return age >= 18;
}

function validatePasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    return Object.values(requirements).every(req => req);
}

function validatePasswordMatch() {
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!password || !confirmPassword) return false;
    
    const isMatch = password === confirmPassword;
    
    if (confirmPassword && !isMatch) {
        showFieldError('confirmPassword', 'Passwords do not match');
        return false;
    } else if (confirmPassword && isMatch) {
        clearFieldError('confirmPassword');
        return true;
    }
    
    return isMatch;
}

// Password strength indicator
function initPasswordStrength() {
    const passwordField = document.getElementById('password');
    if (!passwordField) return;

    passwordField.addEventListener('input', updatePasswordStrength);
}

function updatePasswordStrength() {
    const password = document.getElementById('password')?.value || '';
    const requirements = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Update requirement indicators
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`${req}-req`);
        if (element) {
            if (requirements[req]) {
                element.style.color = '#28a745';
                element.style.textDecoration = 'line-through';
            } else {
                element.style.color = '#dc3545';
                element.style.textDecoration = 'none';
            }
        }
    });
}

// Progress indicator
function initProgressIndicator() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const targetStep = index + 1;
            if (targetStep < currentStep || (targetStep === currentStep + 1 && validateStep(currentStep))) {
                if (targetStep !== currentStep) {
                    saveStepData(currentStep);
                    goToStep(targetStep);
                }
            }
        });
    });
}

// Data management
function saveStepData(stepNumber) {
    const stepFields = {
        1: ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'gender'],
        2: ['address', 'city', 'state', 'zipCode', 'country'],
        3: ['vehicleInterests', 'budgetRange', 'timeframe', 'communications'],
        4: ['securityQuestion', 'securityAnswer']
    };

    const fieldsToSave = stepFields[stepNumber] || [];
    
    fieldsToSave.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            if (fieldName === 'vehicleInterests' || fieldName === 'communications') {
                // Handle checkboxes
                const checkboxes = document.querySelectorAll(`input[name="${fieldName}"]:checked`);
                formData[fieldName] = Array.from(checkboxes).map(cb => cb.value);
            } else {
                formData[fieldName] = field.value;
            }
        }
    });

    // Save to localStorage
    localStorage.setItem('luxauto_registration_temp', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('luxauto_registration_temp');
    if (savedData) {
        formData = JSON.parse(savedData);
        
        // Populate form fields
        Object.keys(formData).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                if (Array.isArray(formData[fieldName])) {
                    // Handle checkbox arrays
                    formData[fieldName].forEach(value => {
                        const checkbox = document.querySelector(`input[name="${fieldName}"][value="${value}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                } else {
                    field.value = formData[fieldName];
                }
            }
        });
    }
}

// Review section
function initReviewSection() {
    // Load any saved data on page load
    loadFormData();
}

function populateReviewSection() {
    saveStepData(4); // Save current step data first
    
    // Personal Information
    const reviewPersonal = document.getElementById('reviewPersonal');
    if (reviewPersonal) {
        reviewPersonal.innerHTML = `
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Date of Birth:</strong> ${formatDate(formData.birthDate)}</p>
            ${formData.gender ? `<p><strong>Gender:</strong> ${formatFieldValue(formData.gender)}</p>` : ''}
        `;
    }

    // Address
    const reviewAddress = document.getElementById('reviewAddress');
    if (reviewAddress) {
        reviewAddress.innerHTML = `
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>City:</strong> ${formData.city}</p>
            <p><strong>State:</strong> ${formData.state}</p>
            <p><strong>ZIP Code:</strong> ${formData.zipCode}</p>
            <p><strong>Country:</strong> ${formData.country || 'United States'}</p>
        `;
    }

    // Preferences
    const reviewPreferences = document.getElementById('reviewPreferences');
    if (reviewPreferences) {
        const vehicleInterests = formData.vehicleInterests || [];
        const communications = formData.communications || [];
        
        reviewPreferences.innerHTML = `
            ${vehicleInterests.length > 0 ? `<p><strong>Vehicle Interests:</strong> ${vehicleInterests.map(formatFieldValue).join(', ')}</p>` : ''}
            ${formData.budgetRange ? `<p><strong>Budget Range:</strong> ${formatFieldValue(formData.budgetRange)}</p>` : ''}
            ${formData.timeframe ? `<p><strong>Purchase Timeframe:</strong> ${formatFieldValue(formData.timeframe)}</p>` : ''}
            ${communications.length > 0 ? `<p><strong>Communication Preferences:</strong> ${communications.map(formatFieldValue).join(', ')}</p>` : ''}
        `;
    }
}

// Form submission
function submitRegistration() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;

    // Collect all form data
    saveStepData(5);
    
    // Add password (don't store plain text in real applications)
    const password = document.getElementById('password').value;
    const hashedPassword = btoa(password); // Simple encoding for demo
    
    const registrationData = {
        ...formData,
        password: hashedPassword,
        registrationDate: new Date().toISOString(),
        id: Date.now().toString()
    };

    // Remove temporary data
    localStorage.removeItem('luxauto_registration_temp');

    // Store user data
    const existingUsers = JSON.parse(localStorage.getItem('luxauto_users') || '[]');
    existingUsers.push(registrationData);
    localStorage.setItem('luxauto_users', JSON.stringify(existingUsers));

    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        document.getElementById('registrationForm').style.display = 'none';
        document.querySelector('.progress-indicator').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Reset loading state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;

        showNotification('Registration successful! Welcome to LuxAuto!', 'success');

        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Send welcome email simulation
        sendWelcomeEmail(registrationData.email, registrationData.firstName);

    }, 3000);
}

function sendWelcomeEmail(email, firstName) {
    // Simulate sending welcome email
    console.log(`Welcome email sent to ${email} for ${firstName}`);
    
    // Store email log
    const emailLog = JSON.parse(localStorage.getItem('luxauto_email_log') || '[]');
    emailLog.push({
        type: 'welcome',
        email: email,
        name: firstName,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('luxauto_email_log', JSON.stringify(emailLog));
}

// Utility functions
function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
    }
    
    event.target.value = value;
}

function formatFieldName(fieldName) {
    return fieldName.replace(/([A-Z])/g, ' $1')
                   .replace(/^./, str => str.toUpperCase())
                   .replace('Email', 'Email Address')
                   .replace('Phone', 'Phone Number')
                   .replace('BirthDate', 'Date of Birth')
                   .replace('ZipCode', 'ZIP Code');
}

function formatFieldValue(value) {
    return value.replace(/([A-Z])/g, ' $1')
               .replace(/^./, str => str.toUpperCase())
               .replace(/-/g, ' ')
               .replace(/\b\w/g, l => l.toUpperCase());
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Global notification function (if not already defined)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Add registration page specific styles
const registrationStyles = document.createElement('style');
registrationStyles.textContent = `
    .registration-form-section {
        padding: 6rem 0;
        background: #f8f9fa;
    }

    .form-wrapper {
        position: relative;
    }

    .form-step {
        display: none;
        animation: fadeInUp 0.3s ease;
    }

    .form-step.active {
        display: block;
    }

    .step-header {
        margin-bottom: 2rem;
        text-align: center;
    }

    .step-header h3 {
        color: #2c5aa0;
        margin-bottom: 0.5rem;
    }

    .step-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        gap: 1rem;
    }

    .progress-indicator {
        display: flex;
        justify-content: center;
        margin-bottom: 3rem;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .progress-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 1rem;
        border-radius: 8px;
    }

    .progress-step:hover {
        background: rgba(44, 90, 160, 0.1);
    }

    .step-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #e9ecef;
        color: #6c757d;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .progress-step.active .step-number {
        background: #2c5aa0;
        color: white;
    }

    .step-label {
        font-size: 0.875rem;
        color: #6c757d;
        text-align: center;
    }

    .progress-step.active .step-label {
        color: #2c5aa0;
        font-weight: 600;
    }

    .registration-benefits {
        padding: 5rem 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
        max-width: 900px;
        margin: 0 auto;
    }

    .benefit-item {
        display: flex;
        align-items: center;
        padding: 2rem;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 1px solid rgba(44, 90, 160, 0.1);
    }

    .benefit-item:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        border-color: rgba(44, 90, 160, 0.2);
    }

    .benefit-icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #2c5aa0 0%, #4a90d9 100%);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;
        color: white;
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .benefit-content {
        flex: 1;
    }

    .benefit-content h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        color: #2c5aa0;
        font-weight: 600;
    }

    .benefit-content p {
        margin: 0;
        color: #6c757d;
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .password-requirements {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        font-size: 0.875rem;
    }

    .password-requirements ul {
        list-style: none;
        padding: 0;
        margin: 0.5rem 0 0 0;
    }

    .password-requirements li {
        padding: 0.25rem 0;
        transition: all 0.3s ease;
    }

    .checkbox-group {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .checkbox-group input[type="checkbox"] {
        width: auto;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }

    .checkbox-group label {
        margin-bottom: 0;
        line-height: 1.5;
        flex: 1;
    }

    .radio-group {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .radio-group input[type="radio"] {
        width: auto;
        margin-right: 0.5rem;
    }

    .review-section {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 2rem;
        margin-bottom: 2rem;
    }

    .review-item {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        position: relative;
    }

    .review-item h4 {
        color: #2c5aa0;
        margin-bottom: 1rem;
        border-bottom: 1px solid #e9ecef;
        padding-bottom: 0.5rem;
    }

    .review-item p {
        margin-bottom: 0.5rem;
        color: #666;
    }

    .btn-edit {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: 1px solid #2c5aa0;
        color: #2c5aa0;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-edit:hover {
        background: #2c5aa0;
        color: white;
    }

    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
    }

    .btn-loading {
        display: none;
        align-items: center;
        gap: 0.5rem;
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
`;
document.head.appendChild(registrationStyles);
