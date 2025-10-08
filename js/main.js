// Main JavaScript file for LuxAuto website
// Handles navigation, animations, and general functionality

const DEFAULT_LANGUAGE = 'en';

function getLanguageManager() {
    return window.languageManager || null;
}

function getCurrentLanguage() {
    const manager = getLanguageManager();
    if (manager && typeof manager.getCurrentLanguage === 'function') {
        return manager.getCurrentLanguage();
    }
    return DEFAULT_LANGUAGE;
}

function translateText(key, fallback = key, ...args) {
    const manager = getLanguageManager();
    if (manager && typeof manager.translate === 'function') {
        const result = manager.translate(key, ...args);
        if (result !== undefined && result !== null) {
            return result;
        }
    }
    if (manager && typeof manager.t === 'function') {
        const result = manager.t(key);
        if (typeof result === 'function') {
            return result(...args);
        }
        if (result !== undefined && result !== null) {
            return result;
        }
    }
    return fallback;
}

function getLocalizedValue(value, lang = getCurrentLanguage()) {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object') {
        if (value[lang]) {
            return value[lang];
        }
        if (value[DEFAULT_LANGUAGE]) {
            return value[DEFAULT_LANGUAGE];
        }
    }
    return '';
}

function getCurrentLocale() {
    return getCurrentLanguage() === 'vi' ? 'vi-VN' : 'en-US';
}

function formatCurrency(value) {
    try {
        return new Intl.NumberFormat(getCurrentLocale(), {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    } catch (err) {
        console.warn('Currency formatting failed', err);
        return `$${Number(value).toLocaleString()}`;
    }
}

function formatReadTime(minutes) {
    return `${minutes} ${translateText('blog.readTimeSuffix', 'min read')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functionality
    initNavigation();
    initAnimations();
    initNewsletterForms();
    initScrollEffects();
    initCarData();
    initBlogData();
    initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.car-card, .service-card, .team-member, .value-item, .award-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Card hover effects
    document.querySelectorAll('.car-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Newsletter form functionality
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form, #newsletter-form, #blog-newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');

            if (validateEmail(email)) {
                // Show loading state
                submitBtn.textContent = translateText('newsletter.loading', 'Subscribing...');
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    showNotification(translateText('notifications.newsletterSuccess', 'Thank you for subscribing to our newsletter!'), 'success');
                    this.reset();
                    submitBtn.textContent = translateText('newsletter.button', 'Subscribe');
                    submitBtn.disabled = false;

                    // Store subscription in localStorage
                    storeSubscription(email);
                }, 1500);
            } else {
                showNotification(translateText('notifications.newsletterInvalid', 'Please enter a valid email address.'), 'error');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-image');

        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Progress bar for reading
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Car data for featured cars section
let featuredCars = []; // Make it global
let vehicleModalInitialized = false;

function initCarData() {
    // Featured cars data
    featuredCars = [
        {
            id: 1,
            name: 'BMW X7 xDrive40i',
            price: 89500,
            category: 'luxury',
            image: 'https://cdn.pixabay.com/photo/2018/07/12/16/05/bmw-3533813_1280.jpg',
            specs: {
                engine: 'Twin Turbo V8',
                horsepower: '523 HP',
                drivetrain: 'AWD',
                acceleration: '4.2s 0-60mph',
                fuelEconomy: '21/26 MPG',
                seating: '7 passengers',
                transmission: '8-Speed Automatic'
            },
            description: {
                en: 'The BMW X7 combines luxury with performance in a stunning SUV package.',
                vi: 'BMW X7 kết hợp sự sang trọng và hiệu suất trong một mẫu SUV ấn tượng.'
            },
            badgeKey: 'new'
        },
        {
            id: 2,
            name: 'Mercedes S-Class S450',
            price: 126000,
            category: 'luxury',
            image: 'https://cdn.pixabay.com/photo/2016/11/22/22/31/auto-1850953_1280.jpg',
            specs: {
                engine: 'V6 Turbo',
                horsepower: '429 HP',
                drivetrain: 'RWD',
                acceleration: '4.8s 0-60mph',
                fuelEconomy: '23/31 MPG',
                seating: '5 passengers',
                transmission: '9-Speed Automatic'
            },
            description: {
                en: 'The Mercedes S-Class sets the standard for luxury sedans worldwide.',
                vi: 'Mercedes S-Class đặt ra chuẩn mực cho dòng sedan hạng sang trên toàn thế giới.'
            },
            badgeKey: 'featured'
        },
        {
            id: 3,
            name: 'Tesla Model S Plaid',
            price: 135000,
            category: 'electric',
            image: 'https://cdn.pixabay.com/photo/2021/01/21/11/09/tesla-5937063_1280.jpg',
            specs: {
                engine: 'Tri-Motor Electric',
                horsepower: '1020 HP',
                drivetrain: 'AWD',
                acceleration: '1.9s 0-60mph',
                fuelEconomy: '120 MPGe',
                seating: '5 passengers',
                transmission: 'Single-Speed'
            },
            description: {
                en: 'The Tesla Model S Plaid delivers unprecedented electric performance.',
                vi: 'Tesla Model S Plaid mang đến hiệu năng điện chưa từng có.'
            },
            badgeKey: 'electric'
        }
    ];

    const featuredCarsGrid = document.getElementById('featured-cars-grid');
    if (featuredCarsGrid) {
        const renderAndInit = () => {
            renderFeaturedCars();
            initModal();
        };

        renderAndInit();

        const manager = getLanguageManager();
        if (manager) {
            manager.onChange(renderAndInit);
        }
    }

    function renderFeaturedCars() {
        const container = document.getElementById('featured-cars-grid');
        if (!container) return;

        const badgeText = badgeKey => translateText(`badges.${badgeKey}`, badgeKey);

        container.innerHTML = featuredCars.map(car => `
            <article class="car-card">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                    <div class="car-badge">${badgeText(car.badgeKey)}</div>
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.name}</h3>
                    <p class="car-price">${formatCurrency(car.price)}</p>
                    <div class="car-specs">
                        <span>${car.specs.horsepower}</span>
                        <span>${car.specs.acceleration}</span>
                        <span>${car.specs.drivetrain}</span>
                    </div>
                    <div class="car-actions">
                        <button class="btn btn-primary" onclick="openVehicleModal(${car.id})">${translateText('buttons.viewDetails', 'View Details')}</button>
                        <button class="btn btn-secondary" onclick="scheduleTestDrive('${car.name}')">${translateText('buttons.testDrive', 'Test Drive')}</button>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

// Blog data for blog section
function initBlogData() {
    const blogPosts = [
        {
            id: 1,
            title: {
                en: 'Electric Revolution in Luxury Cars',
                vi: 'Cuộc cách mạng xe điện trong phân khúc xe sang'
            },
            excerpt: {
                en: 'How premium automotive brands are embracing electric technology without compromising luxury.',
                vi: 'Cách các thương hiệu xe sang áp dụng công nghệ điện mà vẫn giữ trọn đẳng cấp.'
            },
            category: 'technology',
            date: '2024-12-10',
            readTimeMinutes: 5,
            image: 'https://cdn.pixabay.com/photo/2022/09/28/14/34/car-7485224_1280.jpg',
            tags: ['electric-vehicles', 'luxury-cars', 'technology']
        },
        {
            id: 2,
            title: {
                en: 'BMW vs Mercedes: Ultimate Comparison',
                vi: 'BMW và Mercedes: So sánh toàn diện'
            },
            excerpt: {
                en: 'A detailed comparison of BMW and Mercedes luxury sedans in 2024.',
                vi: 'So sánh chi tiết các mẫu sedan hạng sang BMW và Mercedes năm 2024.'
            },
            category: 'reviews',
            date: '2024-12-08',
            readTimeMinutes: 8,
            image: 'https://cdn.pixabay.com/photo/2022/06/30/08/13/race-car-7293167_960_720.jpg',
            tags: ['bmw', 'mercedes', 'comparison', 'reviews']
        },
        {
            id: 3,
            title: {
                en: 'Luxury Car Maintenance Tips',
                vi: 'Bí quyết bảo dưỡng xe sang'
            },
            excerpt: {
                en: 'Essential maintenance tips to keep your luxury vehicle in perfect condition.',
                vi: 'Những mẹo bảo dưỡng quan trọng để giữ xe sang của bạn luôn hoàn hảo.'
            },
            category: 'maintenance',
            date: '2024-12-05',
            readTimeMinutes: 6,
            image: 'https://cdn.pixabay.com/photo/2023/03/27/08/53/woman-7880177_1280.jpg',
            tags: ['maintenance', 'luxury-cars', 'tips']
        },
        {
            id: 4,
            title: {
                en: 'The Future of Autonomous Driving',
                vi: 'Tương lai của công nghệ tự lái'
            },
            excerpt: {
                en: 'How self-driving technology is reshaping the luxury automotive landscape.',
                vi: 'Công nghệ tự lái đang định hình lại ngành xe sang như thế nào.'
            },
            category: 'technology',
            date: '2024-12-03',
            readTimeMinutes: 7,
            image: 'https://cdn.pixabay.com/photo/2022/11/11/13/09/tesla-7584958_1280.jpg',
            tags: ['autonomous-driving', 'technology', 'future']
        },
        {
            id: 5,
            title: {
                en: 'Financing Your Dream Car',
                vi: 'Giải pháp tài chính cho chiếc xe mơ ước'
            },
            excerpt: {
                en: 'Understanding financing options and getting the best deals on luxury vehicles.',
                vi: 'Hiểu rõ các lựa chọn tài chính và tối ưu ưu đãi khi mua xe sang.'
            },
            category: 'financing',
            date: '2024-12-01',
            readTimeMinutes: 4,
            image: 'https://cdn.pixabay.com/photo/2022/07/04/10/46/vintage-car-7300881_1280.jpg',
            tags: ['financing', 'car-buying-guide', 'tips']
        },
        {
            id: 6,
            title: {
                en: 'Performance vs Efficiency in Modern Luxury Cars',
                vi: 'Hiệu suất và tiết kiệm trên xe sang hiện đại'
            },
            excerpt: {
                en: 'Balancing high performance with fuel efficiency in today\'s luxury automotive market.',
                vi: 'Cân bằng hiệu suất cao và tiết kiệm nhiên liệu trên thị trường xe sang hiện nay.'
            },
            category: 'industry',
            date: '2024-11-28',
            readTimeMinutes: 6,
            image: 'https://cdn.pixabay.com/photo/2017/11/09/01/49/ferrari-458-spider-2932191_1280.jpg',
            tags: ['performance', 'efficiency', 'industry']
        }
    ];

    const blogPostsGrid = document.getElementById('blog-posts-grid');
    const recentPostsContainer = document.getElementById('recent-posts');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (blogPostsGrid) {
        renderBlogPosts(blogPosts.slice(0, Math.min(3, blogPosts.length)), blogPostsGrid);
        initBlogFilters(blogPosts);
        initLoadMore(blogPosts);
    }

    if (recentPostsContainer) {
        renderRecentPosts(blogPosts.slice(0, Math.min(4, blogPosts.length)), recentPostsContainer);
    }

    initBlogTags();

    const manager = getLanguageManager();
    if (manager) {
        manager.onChange(() => {
            const postsToShow = loadMoreBtn
                ? parseInt(loadMoreBtn.dataset.currentPosts || Math.min(3, blogPosts.length), 10)
                : blogPosts.length;

            if (blogPostsGrid) {
                renderBlogPosts(blogPosts.slice(0, Math.min(postsToShow, blogPosts.length)), blogPostsGrid);
            }

            if (recentPostsContainer) {
                renderRecentPosts(blogPosts.slice(0, Math.min(4, blogPosts.length)), recentPostsContainer);
            }

            if (loadMoreBtn) {
                if (postsToShow >= blogPosts.length) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = '';
                }
            }

            initBlogTags();
        });
    }
}

// Interactive elements
function initInteractiveElements() {
    // FAQ toggles (for pages that have them)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Process SVG interactions (for about page)
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.fill = '#f39c12';
            this.style.transform = 'scale(1.1)';
        });

        step.addEventListener('mouseleave', function() {
            this.style.fill = '#2c5aa0';
            this.style.transform = 'scale(1)';
        });
    });

    // Social media sharing
    initSocialSharing();
}

// Utility functions
function renderCars(cars, container) {
    container.innerHTML = cars.map(car => {
        const badgeKey = car.badgeKey || (car.badge ? car.badge.toString().toLowerCase().replace(/[^a-z0-9]/g, '') : '');
        const badgeText = badgeKey ? translateText(`badges.${badgeKey}`, car.badge || '') : (car.badge || '');
        const viewDetailsText = translateText('buttons.viewDetails', 'View Details');
        const testDriveText = translateText('buttons.testDrive', 'Test Drive');
        const priceText = typeof car.price === 'number' ? formatCurrency(car.price) : car.price;
        return `
        <div class="car-card" data-category="${car.category}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                ${badgeText ? `<div class="car-badge">${badgeText}</div>` : ''}
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.name}</h3>
                <p class="car-price">${priceText}</p>
                <div class="car-specs">
                    ${car.specs.map(spec => `<span>${spec}</span>`).join('')}
                </div>
                <div class="car-actions">
                    <button class="btn btn-primary" onclick="openCarModal(${car.id})">${viewDetailsText}</button>
                    <button class="btn btn-secondary" onclick="scheduleTestDrive('${car.name}')">${testDriveText}</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function renderBlogPosts(posts, container) {
    const lang = getCurrentLanguage();
    container.innerHTML = posts.map(post => {
        const title = getLocalizedValue(post.title, lang);
        const excerpt = getLocalizedValue(post.excerpt, lang);
        const readTimeText = post.readTimeMinutes ? formatReadTime(post.readTimeMinutes) : post.readTime || '';
        const categoryLabel = translateText(`blog.categories.${post.category}`, post.category);

        return `
        <article class="blog-post" data-category="${post.category}">
            <div class="post-image">
                <img src="${post.image}" alt="${title}" loading="lazy">
                <div class="post-category">${categoryLabel}</div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${readTimeText}</span>
                </div>
                <h3 class="post-title">${title}</h3>
                <p class="post-excerpt">${excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="btn btn-outline">${translateText('buttons.readMore', 'Read More')}</a>
            </div>
        </article>
        `;
    }).join('');
}

function renderRecentPosts(posts, container) {
    const lang = getCurrentLanguage();
    container.innerHTML = posts.map(post => `
        <div class="recent-post">
            <div class="recent-post-image">
                <img src="${post.image}" alt="${getLocalizedValue(post.title, lang)}" loading="lazy">
            </div>
            <div class="recent-post-content">
                <h4>${getLocalizedValue(post.title, lang)}</h4>
                <span class="recent-post-date">${formatDate(post.date)}</span>
            </div>
        </div>
    `).join('');
}

function initBlogFilters(posts) {
    const categoryFilters = document.querySelectorAll('.category-filter');

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            const blogPosts = document.querySelectorAll('.blog-post');
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

function initLoadMore(posts) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPosts = 3;

    if (loadMoreBtn) {
        loadMoreBtn.dataset.currentPosts = currentPosts;

        const updateButtonText = () => {
            const labelElement = loadMoreBtn.querySelector('span');
            if (labelElement && labelElement.dataset.i18n) {
                return;
            }
            const translated = translateText('buttons.loadMore', labelElement ? labelElement.textContent.trim() || 'Load More' : 'Load More');
            if (labelElement) {
                labelElement.textContent = translated;
            } else {
                loadMoreBtn.textContent = translated;
            }
        };

        updateButtonText();

        const manager = getLanguageManager();
        if (manager) {
            manager.onChange(updateButtonText);
        }

        if (!loadMoreBtn.dataset.loadMoreInitialized) {
            loadMoreBtn.dataset.loadMoreInitialized = 'true';
            loadMoreBtn.addEventListener('click', function() {
                currentPosts = parseInt(loadMoreBtn.dataset.currentPosts || currentPosts, 10);
                const nextPosts = posts.slice(currentPosts, currentPosts + 3);
                const container = document.getElementById('blog-posts-grid');
                const lang = getCurrentLanguage();

                nextPosts.forEach(post => {
                    const postElement = document.createElement('div');
                    const title = getLocalizedValue(post.title, lang);
                    const excerpt = getLocalizedValue(post.excerpt, lang);
                    const readTimeText = post.readTimeMinutes ? formatReadTime(post.readTimeMinutes) : post.readTime || '';
                    const categoryLabel = translateText(`blog.categories.${post.category}`, post.category);

                    postElement.innerHTML = `
                        <article class="blog-post" data-category="${post.category}">
                            <div class="post-image">
                                <img src="${post.image}" alt="${title}" loading="lazy">
                                <div class="post-category">${categoryLabel}</div>
                            </div>
                            <div class="post-content">
                                <div class="post-meta">
                                    <span class="post-date">${formatDate(post.date)}</span>
                                    <span class="post-read-time">${readTimeText}</span>
                                </div>
                                <h3 class="post-title">${title}</h3>
                                <p class="post-excerpt">${excerpt}</p>
                                <div class="post-tags">
                                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                                <a href="#" class="btn btn-outline">${translateText('buttons.readMore', 'Read More')}</a>
                            </div>
                        </article>
                    `;
                    container.appendChild(postElement.firstElementChild);
                });

                currentPosts += 3;
                loadMoreBtn.dataset.currentPosts = currentPosts;

                if (currentPosts >= posts.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }
    }
}

function initBlogTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase().replace(/\s+/g, '-');
            // Filter posts by tag
            console.log('Filtering by tag:', tagText);
        });
    });
}

function initSocialSharing() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            const url = window.location.href;
            const title = document.title;

            let shareUrl = '';
            if (platform.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            } else if (platform.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            } else if (platform.includes('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Global utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return new Date(dateString).toLocaleDateString(getCurrentLocale(), options);
    } catch (err) {
        console.warn('Date formatting failed', err);
        return new Date(dateString).toLocaleDateString();
    }
}

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
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function storeSubscription(email) {
    const subscriptions = JSON.parse(localStorage.getItem('luxauto_subscriptions') || '[]');
    if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('luxauto_subscriptions', JSON.stringify(subscriptions));
    }
}

// Global functions for car interactions
function openCarModal(carId) {
    console.log('Opening modal for car ID:', carId);
    // This will be implemented in products.js
}

function scheduleTestDrive(carName) {
    const fallback = `Test drive scheduled for ${carName}. We'll contact you soon!`;
    showNotification(translateText('notifications.testDriveSuccess', fallback, carName), 'success');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .blog-post {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.5s ease;
        margin-bottom: 2rem;
    }

    .blog-post:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    .post-image {
        position: relative;
        height: 250px;
        overflow: hidden;
    }

    .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .blog-post:hover .post-image img {
        transform: scale(1.1);
    }

    .post-category {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    .post-content {
        padding: 2rem;
    }

    .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .post-title {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #333;
    }

    .post-excerpt {
        margin-bottom: 1.5rem;
        color: #666;
        line-height: 1.6;
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .tag {
        background: #f8f9fa;
        color: #666;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tag:hover {
        background: #2c5aa0;
        color: white;
    }

    .category-filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .category-filter.active,
    .category-filter:hover {
        background: #2c5aa0;
        color: white;
        transform: translateY(-5px);
    }

    .category-filter i {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .recent-post {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }

    .recent-post-image {
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        flex-shrink: 0;
    }

    .recent-post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .recent-post-content h4 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }

    .recent-post-date {
        font-size: 0.8rem;
        color: #666;
    }
`;
document.head.appendChild(style);

// Vehicle modal functionality for featured cars
function openVehicleModal(vehicleId) {
    const vehicle = featuredCars.find(v => v.id === vehicleId);
    if (!vehicle) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('vehicleModal');
    if (!modal) {
        modal = createVehicleModal();
        document.body.appendChild(modal);
    }

    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = vehicle.image;
    modalImage.alt = vehicle.name;
    modalTitle.textContent = vehicle.name;
    modalPrice.textContent = formatCurrency(vehicle.price);
    modalDescription.textContent = getLocalizedValue(vehicle.description);

    modalSpecs.innerHTML = Object.entries(vehicle.specs).map(([key, value]) => `
        <div class="spec-item">
            <span class="spec-label">${formatSpecLabel(key)}:</span>
            <span class="spec-value">${value}</span>
        </div>
    `).join('');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Contact and test drive button handlers
    const contactBtn = document.getElementById('contactBtn');
    const testDriveBtn = document.getElementById('testDriveBtn');

    contactBtn.onclick = () => {
        window.location.href = `frontend/contact.html?vehicle=${encodeURIComponent(vehicle.name)}`;
    };

    testDriveBtn.onclick = () => {
        scheduleTestDrive(vehicle.name);
        closeVehicleModal();
    };
}

function closeVehicleModal() {
    const modal = document.getElementById('vehicleModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function createVehicleModal() {
    const modal = document.createElement('div');
    modal.id = 'vehicleModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <img id="modalImage" src="" alt="Vehicle Image">
                </div>
                <div class="modal-info">
                    <h2 id="modalTitle"></h2>
                    <p class="modal-price" id="modalPrice"></p>
                    <div class="modal-specs" id="modalSpecs">
                        <!-- Specifications will be populated dynamically -->
                    </div>
                    <div class="modal-description" id="modalDescription">
                        <!-- Description will be populated dynamically -->
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" id="contactBtn">Contact Sales</button>
                        <button class="btn btn-secondary" id="testDriveBtn">Schedule Test Drive</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', closeVehicleModal);

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeVehicleModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeVehicleModal();
        }
    });

    return modal;
}

function formatSpecLabel(key) {
    const fallback = key.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .trim();
    return translateText(`cars.specLabels.${key}`, fallback);
}

// Add modal initialization function
function initModal() {
    if (vehicleModalInitialized) {
        return;
    }

    const modal = document.getElementById('vehicleModal');
    if (!modal) {
        return;
    }

    const closeBtn = modal.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeVehicleModal);
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeVehicleModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeVehicleModal();
        }
    });

    vehicleModalInitialized = true;
}

// Make functions globally available
window.scheduleTestDrive = scheduleTestDrive;
window.openVehicleModal = openVehicleModal;
