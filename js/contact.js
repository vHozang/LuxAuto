// Contact page specific functionality
// Handles form validation, geolocation API, and contact form submission

document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    initContactForm();
    initGeolocation();
    initFAQToggles();
    initMapFeatures();
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must contain only letters and be at least 2 characters long'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must contain only letters and be at least 2 characters long'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\(\)\+]+$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            message: 'Please select a subject'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be between 10 and 1000 characters'
        },
        privacy: {
            required: true,
            message: 'You must agree to the Privacy Policy and Terms of Service'
        }
    };

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName, validationRules[fieldName]));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(validationRules)) {
            submitContactForm();
        }
    });

    // Form reset
    contactForm.addEventListener('reset', function() {
        clearAllErrors();
        hideSuccessMessage();
    });
}

function validateField(fieldName, rules) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (!field || !errorElement) return true;

    const value = field.type === 'checkbox' ? field.checked : field.value.trim();

    // Required validation
    if (rules.required && (!value || value === '')) {
        showFieldError(fieldName, rules.message || `${fieldName} is required`);
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

    // Special validation for checkbox fields
    if (field.type === 'checkbox' && rules.required && !value) {
        showFieldError(fieldName, rules.message);
        return false;
    }

    clearFieldError(fieldName);
    return true;
}

function validateForm(rules) {
    let isValid = true;
    
    Object.keys(rules).forEach(fieldName => {
        if (!validateField(fieldName, rules[fieldName])) {
            isValid = false;
        }
    });

    return isValid;
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

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const fields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    fields.forEach(field => {
        field.classList.remove('error');
    });
}

function submitContactForm() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const contactForm = document.getElementById('contactForm');

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(contactForm);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        vehicleInterest: formData.get('vehicleInterest'),
        message: formData.get('message'),
        contactPreference: formData.get('contactPreference'),
        newsletter: formData.get('newsletter') === 'on',
        timestamp: new Date().toISOString()
    };

    // Store in localStorage for demonstration
    storeContactSubmission(contactData);

    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;

        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        showNotification('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');

        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
            clearAllErrors();
        }, 5000);

    }, 2000);
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

function storeContactSubmission(data) {
    const submissions = JSON.parse(localStorage.getItem('luxauto_contact_submissions') || '[]');
    submissions.push(data);
    localStorage.setItem('luxauto_contact_submissions', JSON.stringify(submissions));
}

// Map features initialization
function initMapFeatures() {
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    const fullscreenMapBtn = document.getElementById('fullscreenMapBtn');
    
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', function() {
            // Open Google Maps directions
            const address = "123 Luxury Avenue, Auto City, AC 12345, United States";
            const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
            window.open(url, '_blank');
        });
    }
    
    if (fullscreenMapBtn) {
        fullscreenMapBtn.addEventListener('click', function() {
            // Open Google Maps in new tab
            const coordinates = "40.7128,-74.0059"; // LuxAuto dealership coordinates
            const url = `https://www.google.com/maps/@${coordinates},15z`;
            window.open(url, '_blank');
        });
    }
}

// Geolocation API functionality
function initGeolocation() {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationResult = document.getElementById('locationResult');

    if (!getLocationBtn || !locationResult) return;

    getLocationBtn.addEventListener('click', function() {
        if (!navigator.geolocation) {
            showLocationError('Trình duyệt không hỗ trợ định vị.');
            return;
        }

        // Enhanced loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang định vị...';
        this.disabled = true;
        this.classList.add('loading');

        const options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 300000 // 5 minutes
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                showLocationSuccess(position);
                resetLocationButton();
            },
            (error) => {
                showLocationError(getGeolocationErrorMessage(error));
                resetLocationButton();
            },
            options
        );
    });

    function resetLocationButton() {
        getLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
        getLocationBtn.disabled = false;
        getLocationBtn.classList.remove('loading');
    }
}

function showLocationSuccess(position) {
    const { latitude, longitude } = position.coords;
    const locationResult = document.getElementById('locationResult');
    
    // LuxAuto dealership coordinates
    const dealershipLat = 40.7128;
    const dealershipLng = -74.0059;
    
    const distance = calculateDistance(latitude, longitude, dealershipLat, dealershipLng);
    const travelTime = Math.round(distance * 2.5); // Estimate: ~2.5 minutes per mile in city
    
    // Update the embedded map to show user's location
    updateMapWithUserLocation(latitude, longitude);
    
    locationResult.innerHTML = `
        <div class="location-success">
            <div class="success-header">
                <i class="fas fa-map-marker-alt"></i>
                <h4>Your Location Found</h4>
            </div>
            <div class="location-details">
                <div class="distance-info">
                    <div class="info-item">
                        <span class="label">Distance:</span>
                        <span class="value">${distance.toFixed(1)} miles</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Est. Drive Time:</span>
                        <span class="value">${travelTime} minutes</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Your Coordinates:</span>
                        <span class="value">${latitude.toFixed(4)}, ${longitude.toFixed(4)}</span>
                    </div>
                </div>
                <div class="location-actions">
                    <a href="https://maps.google.com/maps/dir/${latitude},${longitude}/${dealershipLat},${dealershipLng}" 
                       target="_blank" class="btn btn-primary">
                        <i class="fas fa-route"></i> Get Directions
                    </a>
                    <button onclick="shareLocation(${latitude}, ${longitude})" class="btn btn-outline">
                        <i class="fas fa-share-alt"></i> Share My Location
                    </button>
                    <button onclick="callShowroom()" class="btn btn-outline">
                        <i class="fas fa-phone"></i> Call Showroom
                    </button>
                </div>
            </div>
        </div>
    `;
    locationResult.style.display = 'block';
    
    // Smooth scroll to result
    locationResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Show notification
    showNotification('Location found successfully! Directions are ready.', 'success');
}

function updateMapWithUserLocation(userLat, userLng) {
    const mapContainer = document.getElementById('googleMap');
    const dealershipLat = 40.7128;
    const dealershipLng = -74.0059;
    
    // Create new iframe with both locations
    const newMapSrc = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTuMLKaJ1x9m_n3HdSd9Vy4k&origin=${userLat},${userLng}&destination=${dealershipLat},${dealershipLng}&mode=driving`;
    
    // For demo purposes, we'll update with a generic map showing the area
    const genericMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24177.07063729416!2d-74.02059795000001!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1639515516495!5m2!1sen!2sus`;
    
    mapContainer.innerHTML = `
        <iframe 
            src="${genericMapSrc}"
            width="100%" 
            height="400" 
            style="border:0;border-radius:12px;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
}

function callShowroom() {
    window.location.href = 'tel:+15551234567';
}

function showLocationError(message) {
    const locationResult = document.getElementById('locationResult');
    
    locationResult.innerHTML = `
        <div class="location-error">
            <i class="fas fa-exclamation-triangle"></i>
            <div class="error-info">
                <h4>Location Access Failed</h4>
                <p>${message}</p>
                <p>You can still find us at: 123 Luxury Avenue, Auto City, AC 12345</p>
            </div>
        </div>
    `;
    locationResult.style.display = 'block';
}

function getGeolocationErrorMessage(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "Location access denied by user. Please enable location services and try again.";
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable. Please check your GPS settings.";
        case error.TIMEOUT:
            return "Location request timed out. Please try again.";
        default:
            return "An unknown error occurred while retrieving your location.";
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function shareLocation(lat, lng) {
    if (navigator.share) {
        navigator.share({
            title: 'My Location',
            text: 'Here is my current location',
            url: `https://maps.google.com/?q=${lat},${lng}`
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Location link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy location link.', 'error');
        });
    }
}

// FAQ toggle functionality
function initFAQToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqNumber = this.dataset.faq;
            const answer = document.getElementById(`faq-${faqNumber}`);
            const icon = this.querySelector('i');
            
            // Close other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherNumber = otherQuestion.dataset.faq;
                    const otherAnswer = document.getElementById(`faq-${otherNumber}`);
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherItem.classList.remove('active');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0 0';
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '1rem 0';
                }
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                if (answer) {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 0';
                }
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// Global function to show notifications (if not already defined)
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

// Add contact page specific styles
const contactStyles = document.createElement('style');
contactStyles.textContent = `
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

    .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        margin-bottom: 4rem;
    }

    .info-cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .info-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 2rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .info-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    .card-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .card-content h3 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    .card-content p {
        color: #666;
        line-height: 1.6;
    }

    .location-detection {
        margin-top: 2rem;
        text-align: center;
    }

    .location-result {
        margin-top: 1rem;
        padding: 1.5rem;
        border-radius: 8px;
        background: #f8f9fa;
    }

    .location-success {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        text-align: left;
    }

    .location-success i {
        color: #28a745;
        font-size: 2rem;
        flex-shrink: 0;
    }

    .location-error {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        text-align: left;
    }

    .location-error i {
        color: #dc3545;
        font-size: 2rem;
        flex-shrink: 0;
    }

    .location-actions {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }

    .contact-form-section {
        padding: 6rem 0;
        background: #f8f9fa;
    }

    .form-container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .form-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .radio-group {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .radio-group input[type="radio"] {
        width: auto;
        margin-right: 0.5rem;
    }

    .checkbox-group {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .checkbox-group input[type="checkbox"] {
        width: auto;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }

    .checkbox-group label {
        margin-bottom: 0;
        line-height: 1.5;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }

    .btn-loading {
        display: none;
        align-items: center;
        gap: 0.5rem;
    }

    .map-section {
        padding: 6rem 0;
        background: white;
    }

    .map-container {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }

    .map-features {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #666;
    }

    .feature-item i {
        color: #2c5aa0;
    }

    .faq-section {
        padding: 6rem 0;
        background: #f8f9fa;
    }

    .faq-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-item {
        background: white;
        border-radius: 8px;
        margin-bottom: 1rem;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
        border: none;
        width: 100%;
        text-align: left;
    }

    .faq-question:hover {
        background: #f8f9fa;
    }

    .faq-question h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #333;
    }

    .faq-question i {
        color: #2c5aa0;
        transition: transform 0.3s ease;
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        background: #f8f9fa;
        padding: 0;
    }

    .faq-answer p {
        margin: 0;
        color: #666;
        line-height: 1.6;
    }

    .contact-info-section {
        padding: 6rem 0;
        background: white;
    }
`;
document.head.appendChild(contactStyles);
