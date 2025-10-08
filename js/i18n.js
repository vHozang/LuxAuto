// Internationalization helper for LuxAuto
// Provides translation utilities and language toggle management        sadasdas    

(function() {
    const translations = {
        en: {
            nav: {
                home: 'Home',
                about: 'About Us',
                products: 'Products',
                productsLuxury: 'Luxury Cars',
                productsElectric: 'Electric Vehicles',
                productsSports: 'Sports Cars',
                contact: 'Contact',
                blog: 'Blog',
                register: 'Register'
            },
            hero: {
                title: 'Discover Premium Luxury',
                subtitle: 'Experience the finest collection of luxury vehicles crafted for excellence',
                primaryCta: 'Explore Collection',
                secondaryCta: 'Schedule Test Drive'
            },
            featured: {
                title: 'Featured Vehicles',
                description: 'Discover our handpicked selection of premium automobiles',
                viewAll: 'View All Vehicles'
            },
            services: {
                title: 'Our Services',
                subtitle: 'Comprehensive automotive solutions for discerning customers',
                cards: {
                    sales: {
                        title: 'Sales',
                        text: 'Premium vehicles with complete documentation and warranty'
                    },
                    maintenance: {
                        title: 'Service & Maintenance',
                        text: 'Expert care from certified technicians using genuine parts'
                    },
                    financing: {
                        title: 'Financing',
                        text: 'Flexible financing options tailored to your needs'
                    },
                    insurance: {
                        title: 'Insurance',
                        text: 'Comprehensive coverage for your valuable investment'
                    }
                }
            },
            video: {
                title: 'Experience Excellence',
                subtitle: 'Watch our showroom tour and discover the LuxAuto difference',
                unsupported: 'Your browser does not support the video tag. Please upgrade to a modern browser.'
            },
            graphics: {
                title: 'Interactive Graphics',
                subtitle: 'Explore our interactive car visualization',
                animate: 'Animate Car',
                reset: 'Reset'
            },
            newsletter: {
                title: 'Stay Updated',
                subtitle: 'Get the latest news about new arrivals and exclusive offers',
                placeholder: 'Enter your email',
                button: 'Subscribe',
                loading: 'Subscribing...'
            },
            footer: {
                about: 'Your premier destination for luxury automobiles. Experience excellence in every detail.',
                quickLinksTitle: 'Quick Links',
                links: {
                    home: 'Home',
                    about: 'About Us',
                    products: 'Products',
                    contact: 'Contact'
                },
                servicesTitle: 'Services',
                services: {
                    sales: 'Sales',
                    service: 'Service',
                    financing: 'Financing',
                    insurance: 'Insurance'
                },
                contactTitle: 'Contact Info',
                contact: {
                    address: '123 Luxury Avenue, Auto City',
                    phone: '+1 (555) 123-4567',
                    email: 'info@luxauto.com'
                },
                bottom: '© 2025 LuxAuto. All rights reserved. | Privacy Policy | Terms of Service'
            },
            modal: {
                contact: 'Contact Sales',
                testDrive: 'Schedule Test Drive'
            },
            notifications: {
                newsletterSuccess: 'Thank you for subscribing to our newsletter!',
                newsletterInvalid: 'Please enter a valid email address.',
                testDriveSuccess: (carName) => `Test drive scheduled for ${carName}. We\'ll contact you soon!`
            },
            buttons: {
                viewDetails: 'View Details',
                testDrive: 'Test Drive',
                readMore: 'Read More',
                loadMore: 'Load More',
                loadMoreArticles: 'Load More Articles'
            },
            cars: {
                specLabels: {
                    engine: 'Engine',
                    horsepower: 'Horsepower',
                    drivetrain: 'Drivetrain',
                    acceleration: 'Acceleration',
                    fuelEconomy: 'Fuel Economy',
                    seating: 'Seating',
                    transmission: 'Transmission'
                }
            },
            badges: {
                new: 'New',
                featured: 'Featured',
                electric: 'Electric',
                premium: 'Premium',
                performance: 'Performance',
                mPerformance: 'M Performance',
                amg: 'AMG'
            },
            blog: {
                categories: {
                    technology: 'Technology',
                    reviews: 'Reviews',
                    maintenance: 'Maintenance',
                    financing: 'Financing',
                    industry: 'Industry'
                },
                readTimeSuffix: 'min read'
            },
            about: {
                header: {
                    title: 'About LuxAuto',
                    subtitle: 'Excellence in automotive luxury since 1985'
                },
                journey: {
                    title: 'Our Journey of Excellence',
                    subtitle: 'Crafting luxury automotive experiences since 1985'
                },
                story: {
                    badge: 'Our Story',
                    heading: 'Building Dreams on Four Wheels',
                    paragraph1: 'For nearly four decades, LuxAuto has been at the forefront of luxury automotive retail, setting the standard for excellence in customer service and vehicle quality. What began as a small family business has evolved into one of the most respected names in premium automotive sales.',
                    paragraph2: 'Our commitment to excellence extends beyond just selling cars. We believe in building lasting relationships with our customers, providing them with not just a vehicle, but a complete luxury experience that exceeds expectations at every touchpoint.',
                    paragraph3: 'Today, we stand proud as a testament to the American dream - a family business that grew through dedication, integrity, and an unwavering commitment to our customers\' satisfaction.',
                    stats: {
                        customers: 'Satisfied Customers',
                        years: 'Years of Excellence',
                        satisfaction: 'Customer Satisfaction'
                    }
                },
                mission: {
                    title: 'Our Mission',
                    text: 'To provide an unparalleled luxury automotive experience by offering the finest vehicles, exceptional service, and building lasting relationships with our customers based on trust and excellence.'
                },
                vision: {
                    title: 'Our Vision',
                    text: 'To be the premier destination for luxury automobiles, recognized for our commitment to quality, innovation, and customer satisfaction, while setting new standards in the automotive retail industry.'
                },
                team: {
                    badge: 'Our People',
                    title: 'Meet the Experts Behind LuxAuto',
                    subtitle: 'Our passionate team of automotive professionals is dedicated to providing you with an exceptional luxury car buying experience',
                    members: {
                        trung: {
                            role: 'General Manager',
                            bio: 'With over 20 years in luxury automotive sales, Michael leads our team with passion and expertise, ensuring every customer receives world-class service.',
                            stat1: '20+ Years Experience',
                            stat2: 'Certified Sales Expert'
                        },
                        vu: {
                            role: 'Sales Director',
                            bio: 'Sarah brings exceptional customer service skills and deep product knowledge to every interaction, helping customers find their perfect luxury vehicle.',
                            stat1: 'Top Sales Performer',
                            stat2: 'Customer Choice Award'
                        },
                        my: {
                            role: 'Service Manager',
                            bio: 'David ensures every vehicle receives the highest quality service and maintenance care, keeping your luxury car in pristine condition.',
                            stat1: 'ASE Certified',
                            stat2: '15+ Years Service'
                        }
                    }
                },
                values: {
                    title: 'Our Values',
                    subtitle: 'The principles that guide everything we do',
                    items: {
                        excellence: {
                            title: 'Excellence',
                            text: 'We strive for perfection in every aspect of our business, from the vehicles we sell to the service we provide.'
                        },
                        integrity: {
                            title: 'Integrity',
                            text: 'Honest, transparent dealings with every customer, building trust through consistent ethical practices.'
                        },
                        innovation: {
                            title: 'Innovation',
                            text: 'Embracing new technologies and methods to enhance the customer experience and stay ahead of industry trends.'
                        },
                        passion: {
                            title: 'Passion',
                            text: 'Genuine enthusiasm for automobiles and dedication to helping customers find their perfect vehicle.'
                        }
                    }
                },
                awards: {
                    title: 'Awards & Recognition',
                    subtitle: 'Honored for our commitment to excellence',
                    items: {
                        dealer: {
                            title: 'Dealer of the Year',
                            note: '2023 - Luxury Auto Association'
                        },
                        customer: {
                            title: 'Customer Excellence Award',
                            note: '2022 - National Auto Dealers'
                        },
                        service: {
                            title: 'Quality Service Recognition',
                            note: '2021 - Consumer Choice Awards'
                        }
                    }
                },
                process: {
                    title: 'Our Process',
                    subtitle: 'Your journey to luxury automotive ownership',
                    steps: {
                        consultation: 'Consultation',
                        selection: 'Selection',
                        financing: 'Financing',
                        delivery: 'Delivery'
                    }
                }
            },
            contact: {
                header: {
                    title: 'Contact Us',
                    subtitle: 'Get in touch with our luxury automotive experts'
                },
                showroom: {
                    badge: 'Contact Us',
                    title: 'Visit Our Luxury Showroom',
                    description: 'Experience our premium vehicles and exceptional service in person, or reach out to us through any of the channels below.'
                },
                cards: {
                    location: {
                        title: 'Visit Our Showroom',
                        address: '123 Luxury Avenue<br>Auto City, AC 12345<br>United States',
                        cta: 'Get Directions'
                    },
                    phone: {
                        title: 'Call Us',
                        sales: '<strong>Sales:</strong> <a href="tel:+15551234567">(555) 123-4567</a>',
                        service: '<strong>Service:</strong> <a href="tel:+15551234568">(555) 123-4568</a>',
                        parts: '<strong>Parts:</strong> <a href="tel:+15551234569">(555) 123-4569</a>'
                    },
                    email: {
                        title: 'Email Us',
                        general: 'info@luxauto.com',
                        sales: 'sales@luxauto.com',
                        service: 'service@luxauto.com'
                    },
                    hours: {
                        title: 'Business Hours',
                        weekday: '<strong>Monday - Friday:</strong><br>9:00 AM - 8:00 PM',
                        saturday: '<strong>Saturday:</strong><br>9:00 AM - 6:00 PM',
                        sunday: '<strong>Sunday:</strong><br>12:00 PM - 5:00 PM'
                    }
                },
                map: {
                    title: 'Find Us on the Map',
                    subtitle: 'Locate our showroom and get directions from your current location',
                    useLocation: 'Use My Location',
                    viewLarge: 'View Larger Map'
                },
                form: {
                    badge: 'Get In Touch',
                    title: 'Send Us a Message',
                    subtitle: 'Our luxury automotive experts are ready to assist you. Get personalized service and expert advice for all your automotive needs.',
                    benefits: {
                        response: {
                            title: 'Quick Response',
                            text: 'We respond to all inquiries within 24 hours'
                        },
                        consultation: {
                            title: 'Expert Consultation',
                            text: 'Get advice from certified automotive professionals'
                        },
                        security: {
                            title: 'Secure & Private',
                            text: 'Your information is protected and confidential'
                        }
                    },
                    labels: {
                        firstName: 'First Name *',
                        lastName: 'Last Name *',
                        email: 'Email *',
                        phone: 'Phone Number',
                        subject: 'Subject *',
                        vehicleInterest: 'Vehicle of Interest',
                        message: 'Message *',
                        contactPreference: 'Preferred Contact Method'
                    },
                    placeholders: {
                        phone: '123-456-7890',
                        vehicleInterest: 'e.g., BMW X5, Mercedes S-Class',
                        message: 'Please provide details about your inquiry...'
                    },
                    subject: {
                        placeholder: 'Select a subject',
                        options: {
                            general: 'General Inquiry',
                            sales: 'Sales Information',
                            service: 'Service Appointment',
                            financing: 'Financing Options',
                            testDrive: 'Schedule Test Drive',
                            parts: 'Parts Department',
                            other: 'Other'
                        }
                    },
                    contactPreference: {
                        email: 'Email',
                        phone: 'Phone',
                        either: 'Either'
                    },
                    consent: {
                        newsletter: 'Subscribe to our newsletter for updates and special offers',
                        privacy: 'I agree to the <a href="#" target="_blank">Privacy Policy</a> and <a href="#" target="_blank">Terms of Service</a> *'
                    },
                    submit: 'Send Message',
                    sending: 'Sending...',
                    reset: 'Reset Form',
                    success: {
                        title: 'Message Sent Successfully!',
                        message: 'Thank you for contacting us. We\'ll get back to you within 24 hours.'
                    }
                },
                mapSecondary: {
                    title: 'Find Us',
                    subtitle: 'Located in the heart of Auto City\'s luxury district',
                    features: {
                        parking: 'Free Valet Parking',
                        accessible: 'Wheelchair Accessible',
                        wifi: 'Complimentary WiFi',
                        lounge: 'Customer Lounge'
                    }
                },
                faq: {
                    title: 'Frequently Asked Questions',
                    subtitle: 'Quick answers to common questions',
                    items: {
                        financing: {
                            question: 'What are your financing options?',
                            answer: 'We offer competitive financing rates starting from 2.9% APR with terms from 24 to 84 months. We work with multiple lenders to find the best option for your situation.'
                        },
                        tradein: {
                            question: 'Do you accept trade-ins?',
                            answer: 'Yes, we accept trade-ins and offer competitive valuations. Our experienced appraisers will provide you with a fair market value for your current vehicle.'
                        },
                        warranty: {
                            question: 'What warranty do you offer?',
                            answer: 'All our vehicles come with manufacturer warranties, and we offer extended warranty options for additional peace of mind. Certified pre-owned vehicles include additional coverage.'
                        },
                        testDrive: {
                            question: 'Can I schedule a test drive?',
                            answer: 'Absolutely! You can schedule a test drive by calling us, filling out our contact form, or visiting our showroom. We recommend scheduling in advance for the best selection.'
                        }
                    }
                }
            },
            blogPage: {
                header: {
                    title: 'Automotive Insights',
                    subtitle: 'Latest news, reviews, and trends in luxury automotive'
                },
                featured: {
                    badge: 'Editor\'s Choice',
                    title: 'Featured Story',
                    subtitle: 'Our most popular and insightful article this week',
                    heading: 'The Future of Electric Luxury Vehicles: Revolutionary Changes Ahead',
                    excerpt: 'Discover how electric technology is revolutionizing the luxury automotive market, bringing together sustainability and premium performance in ways never before imagined. From advanced battery systems to autonomous driving capabilities, the future is electric.',
                    badgeLabel: 'Featured',
                    date: 'December 15, 2024',
                    readTime: '5 min read',
                    author: 'By Editorial Team',
                    highlights: {
                        battery: 'Next-gen battery technology',
                        autonomy: 'Autonomous driving features',
                        emissions: 'Zero-emission luxury'
                    },
                    readCta: 'Read Full Article',
                    share: 'Share',
                    save: 'Save'
                },
                brandCards: {
                    bmw: {
                        title: 'BMW Innovation',
                        tagline: 'The Ultimate Driving Machine',
                        articleTitle: 'BMW\'s Electric Future: The iX Revolution',
                        articleExcerpt: 'Exploring BMW\'s groundbreaking iX series and their commitment to sustainable luxury mobility.',
                        views: '2.3k views',
                        readTime: '5 min read'
                    },
                    mercedes: {
                        title: 'Mercedes-Benz',
                        tagline: 'The Best or Nothing',
                        articleTitle: 'Mercedes EQS: Redefining Electric Luxury',
                        articleExcerpt: 'How Mercedes-Benz is setting new standards in electric vehicle luxury and performance.',
                        views: '1.9k views',
                        readTime: '6 min read'
                    },
                    honda: {
                        title: 'Honda',
                        tagline: 'The Power of Dreams',
                        articleTitle: 'Honda\'s Reliability Legacy: Engineering Excellence',
                        articleExcerpt: 'Discover what makes Honda vehicles synonymous with reliability and innovative engineering.',
                        views: '1.7k views',
                        readTime: '4 min read'
                    }
                },
                brands: {
                    badge: 'Premium Brands',
                    title: 'Stories from Luxury Automotive Leaders',
                    subtitle: 'Discover insights and innovations from the world\'s most prestigious automotive brands'
                },
                latest: {
                    badge: 'Latest News',
                    title: 'Recent Automotive Insights'
                },
                filters: {
                    all: 'All Articles',
                    reviews: 'Car Reviews',
                    technology: 'Technology',
                    maintenance: 'Maintenance',
                    industry: 'Industry News'
                },
                articleCards: {
                    autonomous: {
                        badge: 'Featured',
                        readTime: '8 min read',
                        category: 'Technology',
                        date: 'Dec 10, 2024',
                        title: 'The Future of Autonomous Driving in Luxury Vehicles',
                        excerpt: 'Exploring how AI and machine learning are revolutionizing the driving experience in premium automobiles.'
                    },
                    bmwX7: {
                        readTime: '12 min read',
                        category: 'Car Review',
                        date: 'Dec 8, 2024',
                        title: '2024 BMW X7: Luxury SUV Redefined',
                        excerpt: 'Our comprehensive review of BMW\'s flagship SUV, covering performance, luxury features, and value proposition.'
                    },
                    winterCare: {
                        readTime: '6 min read',
                        category: 'Maintenance',
                        date: 'Dec 5, 2024',
                        title: 'Essential Winter Maintenance for Luxury Vehicles',
                        excerpt: 'Keep your premium vehicle in perfect condition during harsh winter months with these expert tips.'
                    },
                    evsurge: {
                        readTime: '10 min read',
                        category: 'Industry News',
                        date: 'Dec 3, 2024',
                        title: 'Electric Vehicle Market Surges in 2024',
                        excerpt: 'Analysis of the growing EV market and what it means for luxury automotive manufacturers and consumers.'
                    },
                    connected: {
                        readTime: '7 min read',
                        category: 'Technology',
                        date: 'Nov 30, 2024',
                        title: 'Connected Car Technology: The Road Ahead',
                        excerpt: 'How IoT and 5G connectivity are transforming the in-vehicle experience and road safety.'
                    },
                    sclass: {
                        readTime: '15 min read',
                        category: 'Car Review',
                        date: 'Nov 28, 2024',
                        title: 'Mercedes S-Class: The Pinnacle of Luxury',
                        excerpt: 'An in-depth review of the latest Mercedes S-Class, exploring its advanced features and luxurious appointments.'
                    }
                },
                newsletter: {
                    title: 'Stay Informed',
                    subtitle: 'Subscribe to our blog newsletter and never miss the latest automotive insights and industry updates.',
                    placeholder: 'Enter your email address',
                    button: 'Subscribe',
                    benefits: {
                        weekly: 'Weekly automotive insights',
                        reports: 'Exclusive industry reports',
                        nospam: 'No spam, unsubscribe anytime'
                    }
                },
                tags: {
                    title: 'Popular Tags',
                    luxury: 'Luxury Cars',
                    electric: 'Electric Vehicles',
                    maintenance: 'Car Maintenance',
                    technology: 'Automotive Technology',
                    buyingGuide: 'Car Buying Guide',
                    financing: 'Financing',
                    reviews: 'Car Reviews',
                    safety: 'Safety',
                    performance: 'Performance'
                },
                archives: {
                    december: 'December 2024 (8)',
                    november: 'November 2024 (12)',
                    october: 'October 2024 (15)',
                    september: 'September 2024 (10)',
                    august: 'August 2024 (14)'
                },
                social: {
                    facebook: 'Facebook',
                    twitter: 'Twitter',
                    instagram: 'Instagram',
                    youtube: 'YouTube'
                },
                sidebar: {
                    recent: 'Recent Posts',
                    archives: 'Archives',
                    follow: 'Follow Us'
                },
                notifications: {
                    showing: 'Showing {count} articles in {filter}',
                    brand: 'Viewing {brand} related articles',
                    loading: 'Loading...',
                    loaded: 'Loaded {count} more articles',
                    allLoaded: 'All articles loaded'
                }
            },
            productsPage: {
                header: {
                    title: 'Our Vehicle Collection',
                    subtitle: 'Discover premium automobiles crafted for discerning drivers'
                },
                filters: {
                    title: 'Filter Vehicles',
                    categories: {
                        all: 'All Categories',
                        luxury: 'Luxury Cars',
                        electric: 'Electric Vehicles',
                        sports: 'Sports Cars'
                    },
                    prices: {
                        all: 'All Prices',
                        under50: 'Under $50,000',
                        mid: '$50,000 - $100,000',
                        over100: 'Over $100,000'
                    },
                    search: 'Search vehicles...',
                    clear: 'Clear Filters'
                },
                categories: {
                    luxury: {
                        title: 'Luxury Cars',
                        subtitle: 'Experience ultimate comfort and sophistication'
                    },
                    electric: {
                        title: 'Electric Vehicles',
                        subtitle: 'Sustainable luxury for the future'
                    },
                    sports: {
                        title: 'Sports Cars',
                        subtitle: 'Performance engineering at its finest'
                    }
                },
                comparison: {
                    title: 'Compare Vehicles',
                    subtitle: 'Drag vehicles here to compare specifications',
                    placeholder: 'Drag a vehicle here',
                    vs: 'VS',
                    table: {
                        feature: 'Feature',
                        vehicle1: 'Vehicle 1',
                        vehicle2: 'Vehicle 2'
                    },
                    clear: 'Clear Comparison'
                },
                labels: {
                    price: 'Price'
                },
                noResults: {
                    title: 'No vehicles found',
                    subtitle: 'Try adjusting your search criteria or clearing filters to see more results.',
                    cta: 'Clear All Filters'
                },
                financing: {
                    title: 'Financing Options',
                    subtitle: 'Flexible solutions to make your dream car affordable',
                    options: {
                        rates: {
                            title: 'Low Interest Rates',
                            text: 'Competitive financing starting from 2.9% APR'
                        },
                        terms: {
                            title: 'Flexible Terms',
                            text: 'Choose from 24 to 84-month financing options'
                        },
                        tradein: {
                            title: 'Trade-In Program',
                            text: 'Get the best value for your current vehicle'
                        },
                        approval: {
                            title: 'Quick Approval',
                            text: 'Get pre-approved in minutes with our online application'
                        }
                    }
                },
                calculator: {
                    title: 'Loan Calculator',
                    labels: {
                        vehiclePrice: 'Vehicle Price ($)',
                        downPayment: 'Down Payment ($)',
                        interestRate: 'Interest Rate (%)',
                        loanTerm: 'Loan Term (months)'
                    },
                    terms: {
                        '24': '24 months',
                        '36': '36 months',
                        '48': '48 months',
                        '60': '60 months',
                        '72': '72 months',
                        '84': '84 months'
                    },
                    calculate: 'Calculate Payment',
                    results: {
                        monthly: 'Monthly Payment:',
                        interest: 'Total Interest:',
                        total: 'Total Cost:'
                    }
                }
            },
            registerPage: {
                header: {
                    title: 'Create Your Account',
                    subtitle: 'Join LuxAuto and unlock exclusive benefits'
                },
                benefits: {
                    offers: {
                        title: 'Exclusive Offers',
                        text: 'Access special pricing and limited-time deals on luxury vehicles'
                    },
                    notifications: {
                        title: 'Priority Notifications',
                        text: 'Be the first to know about new arrivals and exclusive events'
                    },
                    scheduling: {
                        title: 'Easy Scheduling',
                        text: 'Book service appointments and test drives online instantly'
                    },
                    advisor: {
                        title: 'Personal Advisor',
                        text: 'Get dedicated support from certified automotive experts'
                    }
                },
                form: {
                    requiredNotice: 'All fields marked with * are required'
                },
                steps: {
                    step1: { title: 'Personal Information' },
                    step2: { title: 'Address Information' },
                    step3: { title: 'Vehicle Preferences' },
                    step4: { title: 'Account Security' },
                    step5: { title: 'Review Your Information' }
                },
                buttons: {
                    next: 'Next Step',
                    previous: 'Previous',
                    review: 'Review & Submit',
                    submit: 'Create Account',
                    submitting: 'Creating Account...'
                },
                review: {
                    personal: 'Personal Information',
                    address: 'Address',
                    preferences: 'Preferences'
                },
                consent: {
                    terms: 'I agree to the <a href="#" target="_blank">Terms of Service</a> and <a href="#" target="_blank">Privacy Policy</a> *',
                    age: 'I confirm that I am at least 18 years old *'
                },
                progress: {
                    personal: 'Personal',
                    address: 'Address',
                    preferences: 'Preferences',
                    security: 'Security',
                    review: 'Review'
                },
                success: {
                    title: 'Welcome to LuxAuto!',
                    message: 'Your account has been created successfully. You will receive a confirmation email shortly.',
                    cta: 'Go to Homepage'
                }
            }
        },
        vi: {
            nav: {
                home: 'Trang chủ',
                about: 'Về chúng tôi',
                products: 'Sản phẩm',
                productsLuxury: 'Xe sang',
                productsElectric: 'Xe điện',
                productsSports: 'Xe thể thao',
                contact: 'Liên hệ',
                blog: 'Tin tức',
                register: 'Đăng ký'
            },
            hero: {
                title: 'Khám phá đẳng cấp thượng lưu',
                subtitle: 'Trải nghiệm bộ sưu tập xe sang tinh tế được tuyển chọn dành riêng cho bạn',
                primaryCta: 'Khám phá bộ sưu tập',
                secondaryCta: 'Đặt lịch lái thử'
            },
            featured: {
                title: 'Xe nổi bật',
                description: 'Khám phá những mẫu xe sang cao cấp được chúng tôi chọn lọc kỹ lưỡng',
                viewAll: 'Xem tất cả xe'
            },
            services: {
                title: 'Dịch vụ của chúng tôi',
                subtitle: 'Giải pháp xe hơi toàn diện dành cho khách hàng tinh tế',
                cards: {
                    sales: {
                        title: 'Bán xe',
                        text: 'Xe sang chính hãng với đầy đủ giấy tờ và bảo hành'
                    },
                    maintenance: {
                        title: 'Bảo dưỡng & sửa chữa',
                        text: 'Kỹ thuật viên chứng nhận sử dụng phụ tùng chính hãng'
                    },
                    financing: {
                        title: 'Tài chính',
                        text: 'Giải pháp trả góp linh hoạt phù hợp nhu cầu của bạn'
                    },
                    insurance: {
                        title: 'Bảo hiểm',
                        text: 'Gói bảo hiểm toàn diện cho chiếc xe giá trị của bạn'
                    }
                }
            },
            video: {
                title: 'Trải nghiệm đẳng cấp',
                subtitle: 'Tham quan phòng trưng bày và cảm nhận sự khác biệt của LuxAuto',
                unsupported: 'Trình duyệt của bạn không hỗ trợ video này. Vui lòng nâng cấp trình duyệt.'
            },
            graphics: {
                title: 'Đồ họa tương tác',
                subtitle: 'Khám phá mô phỏng xe hơi tương tác trực quan',
                animate: 'Hoạt họa xe',
                reset: 'Đặt lại'
            },
            newsletter: {
                title: 'Luôn cập nhật',
                subtitle: 'Nhận tin tức mới nhất về mẫu xe mới và ưu đãi độc quyền',
                placeholder: 'Nhập email của bạn',
                button: 'Đăng ký nhận tin',
                loading: 'Đang đăng ký...'
            },
            footer: {
                about: 'Điểm đến lý tưởng của bạn cho những chiếc xe sang. Trải nghiệm sự tinh tế trong từng chi tiết.',
                quickLinksTitle: 'Liên kết nhanh',
                links: {
                    home: 'Trang chủ',
                    about: 'Về chúng tôi',
                    products: 'Sản phẩm',
                    contact: 'Liên hệ'
                },
                servicesTitle: 'Dịch vụ',
                services: {
                    sales: 'Bán xe',
                    service: 'Dịch vụ',
                    financing: 'Tài chính',
                    insurance: 'Bảo hiểm'
                },
                contactTitle: 'Thông tin liên hệ',
                contact: {
                    address: '123 Luxury Avenue, Thành phố Auto',
                    phone: '+1 (555) 123-4567',
                    email: 'info@luxauto.com'
                },
                bottom: '© 2025 LuxAuto. Mọi quyền được bảo lưu. | Chính sách bảo mật | Điều khoản sử dụng'
            },
            modal: {
                contact: 'Liên hệ tư vấn',
                testDrive: 'Đặt lịch lái thử'
            },
            notifications: {
                newsletterSuccess: 'Cảm ơn bạn đã đăng ký nhận bản tin!',
                newsletterInvalid: 'Vui lòng nhập địa chỉ email hợp lệ.',
                testDriveSuccess: (carName) => `Đã đặt lịch lái thử cho ${carName}. Chúng tôi sẽ liên hệ với bạn sớm!`
            },
            buttons: {
                viewDetails: 'Xem chi tiết',
                testDrive: 'Lái thử',
                readMore: 'Đọc thêm',
                loadMore: 'Xem thêm',
                loadMoreArticles: 'Xem thêm bài viết'
            },
            cars: {
                specLabels: {
                    engine: 'Động cơ',
                    horsepower: 'Công suất',
                    drivetrain: 'Hệ dẫn động',
                    acceleration: 'Tăng tốc',
                    fuelEconomy: 'Tiết kiệm nhiên liệu',
                    seating: 'Số chỗ',
                    transmission: 'Hộp số'
                }
            },
            badges: {
                new: 'Mới',
                featured: 'Nổi bật',
                electric: 'Xe điện',
                premium: 'Cao cấp',
                performance: 'Hiệu năng',
                mPerformance: 'M Performance',
                amg: 'AMG'
            },
            blog: {
                categories: {
                    technology: 'Công nghệ',
                    reviews: 'Đánh giá',
                    maintenance: 'Bảo dưỡng',
                    financing: 'Tài chính',
                    industry: 'Ngành xe'
                },
                readTimeSuffix: 'phút đọc'
            },
            about: {
                header: {
                    title: 'Giới thiệu về LuxAuto',
                    subtitle: 'Tinh hoa trong lĩnh vực xe sang từ năm 1985'
                },
                journey: {
                    title: 'Hành trình chinh phục đỉnh cao',
                    subtitle: 'Kiến tạo trải nghiệm xe sang từ năm 1985'
                },
                story: {
                    badge: 'Câu chuyện',
                    heading: 'Kiến tạo giấc mơ trên bốn bánh xe',
                    paragraph1: 'Gần bốn thập kỷ qua, LuxAuto luôn tiên phong trong lĩnh vực bán lẻ xe sang, đặt ra chuẩn mực dịch vụ và chất lượng. Từ một doanh nghiệp gia đình nhỏ, chúng tôi đã trở thành một trong những tên tuổi uy tín nhất của ngành.',
                    paragraph2: 'Chúng tôi không chỉ bán xe. LuxAuto chú trọng xây dựng mối quan hệ lâu dài với khách hàng, mang đến trải nghiệm xe sang toàn diện vượt xa mong đợi.',
                    paragraph3: 'Ngày nay, chúng tôi tự hào là minh chứng cho giấc mơ Mỹ – một doanh nghiệp gia đình lớn mạnh nhờ sự tận tâm, chính trực và cam kết không ngừng vì sự hài lòng của khách hàng.',
                    stats: {
                        customers: 'Khách hàng hài lòng',
                        years: 'Năm hoạt động xuất sắc',
                        satisfaction: 'Mức độ hài lòng của khách hàng'
                    }
                },
                mission: {
                    title: 'Sứ mệnh của chúng tôi',
                    text: 'Mang đến trải nghiệm xe sang vượt trội với những mẫu xe tinh hoa, dịch vụ xuất sắc và mối quan hệ bền vững dựa trên sự tin cậy và tận tâm.'
                },
                vision: {
                    title: 'Tầm nhìn của chúng tôi',
                    text: 'Trở thành điểm đến hàng đầu cho xe sang, được ghi nhận bởi chất lượng, đổi mới và sự hài lòng của khách hàng, đồng thời thiết lập chuẩn mực mới cho ngành bán lẻ ô tô.'
                },
                team: {
                    badge: 'Đội ngũ',
                    title: 'Gặp gỡ những chuyên gia đứng sau LuxAuto',
                    subtitle: 'Đội ngũ giàu nhiệt huyết luôn mang đến trải nghiệm mua xe sang hoàn hảo cho bạn',
                    members: {
                        trung: {
                            role: 'Giám đốc điều hành',
                            bio: 'Với hơn 20 năm kinh nghiệm trong ngành xe sang, Donald dẫn dắt đội ngũ bằng đam mê và chuyên môn, đảm bảo mọi khách hàng đều nhận được dịch vụ đẳng cấp.',
                            stat1: 'Hơn 20 năm kinh nghiệm',
                            stat2: 'Chuyên gia bán hàng chứng nhận'
                        },
                        vu: {
                            role: 'Giám đốc kinh doanh',
                            bio: 'Vũ sở hữu kỹ năng chăm sóc khách hàng vượt trội cùng kiến thức sản phẩm sâu rộng, giúp mỗi khách hàng tìm thấy chiếc xe sang phù hợp nhất.',
                            stat1: 'Nhân viên kinh doanh xuất sắc',
                            stat2: 'Giải thưởng khách hàng bình chọn'
                        },
                        my: {
                            role: 'Trưởng bộ phận dịch vụ',
                            bio: 'My đảm bảo mọi chiếc xe luôn nhận được dịch vụ và bảo dưỡng ở mức cao nhất, giữ cho xe của bạn luôn trong trạng thái hoàn hảo.',
                            stat1: 'Chứng chỉ ASE',
                            stat2: 'Hơn 15 năm kinh nghiệm'
                        }
                    }
                },
                values: {
                    title: 'Giá trị cốt lõi',
                    subtitle: 'Kim chỉ nam cho mọi hoạt động của chúng tôi',
                    items: {
                        excellence: {
                            title: 'Xuất sắc',
                            text: 'Theo đuổi sự hoàn hảo trong từng chi tiết, từ sản phẩm tới dịch vụ.'
                        },
                        integrity: {
                            title: 'Chính trực',
                            text: 'Hợp tác minh bạch, xây dựng niềm tin bằng chuẩn mực đạo đức nhất quán.'
                        },
                        innovation: {
                            title: 'Đổi mới',
                            text: 'Liên tục ứng dụng công nghệ và phương thức mới để nâng tầm trải nghiệm khách hàng.'
                        },
                        passion: {
                            title: 'Đam mê',
                            text: 'Niềm say mê xe hơi chân thành và khát khao giúp khách hàng tìm được chiếc xe lý tưởng.'
                        }
                    }
                },
                awards: {
                    title: 'Giải thưởng & ghi nhận',
                    subtitle: 'Danh hiệu dành cho cam kết xuất sắc của chúng tôi',
                    items: {
                        dealer: {
                            title: 'Đại lý của năm',
                            note: '2023 - Hiệp hội Xe sang'
                        },
                        customer: {
                            title: 'Giải thưởng dịch vụ khách hàng',
                            note: '2022 - Hiệp hội đại lý ô tô quốc gia'
                        },
                        service: {
                            title: 'Vinh danh dịch vụ chất lượng',
                            note: '2021 - Giải thưởng Người tiêu dùng'
                        }
                    }
                },
                process: {
                    title: 'Quy trình của chúng tôi',
                    subtitle: 'Hành trình sở hữu xe sang của bạn',
                    steps: {
                        consultation: 'Tư vấn',
                        selection: 'Lựa chọn',
                        financing: 'Tài chính',
                        delivery: 'Bàn giao'
                    }
                }
            },
            contact: {
                header: {
                    title: 'Liên hệ với chúng tôi',
                    subtitle: 'Kết nối cùng đội ngũ chuyên gia xe sang LuxAuto'
                },
                showroom: {
                    badge: 'Liên hệ',
                    title: 'Ghé thăm showroom đẳng cấp',
                    description: 'Trải nghiệm những mẫu xe cao cấp và dịch vụ chuyên nghiệp hoặc liên hệ qua các kênh dưới đây.'
                },
                cards: {
                    location: {
                        title: 'Ghé thăm showroom',
                        address: '123 Luxury Avenue<br>Auto City, AC 12345<br>Hoa Kỳ',
                        cta: 'Xem chỉ đường'
                    },
                    phone: {
                        title: 'Gọi cho chúng tôi',
                        sales: '<strong>Kinh doanh:</strong> <a href="tel:+15551234567">(555) 123-4567</a>',
                        service: '<strong>Dịch vụ:</strong> <a href="tel:+15551234568">(555) 123-4568</a>',
                        parts: '<strong>Phụ tùng:</strong> <a href="tel:+15551234569">(555) 123-4569</a>'
                    },
                    email: {
                        title: 'Gửi email',
                        general: 'info@luxauto.com',
                        sales: 'sales@luxauto.com',
                        service: 'service@luxauto.com'
                    },
                    hours: {
                        title: 'Giờ làm việc',
                        weekday: '<strong>Thứ Hai - Thứ Sáu:</strong><br>9:00 - 20:00',
                        saturday: '<strong>Thứ Bảy:</strong><br>9:00 - 18:00',
                        sunday: '<strong>Chủ Nhật:</strong><br>12:00 - 17:00'
                    }
                },
                map: {
                    title: 'Tìm chúng tôi trên bản đồ',
                    subtitle: 'Xác định vị trí showroom và chỉ đường từ nơi bạn đang đứng',
                    useLocation: 'Sử dụng vị trí của tôi',
                    viewLarge: 'Xem bản đồ lớn'
                },
                form: {
                    badge: 'Liên hệ ngay',
                    title: 'Gửi tin nhắn',
                    subtitle: 'Đội ngũ chuyên gia xe sang luôn sẵn sàng hỗ trợ bạn. Nhận tư vấn cá nhân hóa cho mọi nhu cầu ô tô.',
                    benefits: {
                        response: {
                            title: 'Phản hồi nhanh',
                            text: 'Trả lời mọi yêu cầu trong vòng 24 giờ'
                        },
                        consultation: {
                            title: 'Tư vấn chuyên gia',
                            text: 'Nhận lời khuyên từ chuyên gia xe hơi được chứng nhận'
                        },
                        security: {
                            title: 'Bảo mật tuyệt đối',
                            text: 'Thông tin của bạn luôn được bảo vệ và giữ kín'
                        }
                    },
                    labels: {
                        firstName: 'Tên *',
                        lastName: 'Họ *',
                        email: 'Email *',
                        phone: 'Số điện thoại',
                        subject: 'Chủ đề *',
                        vehicleInterest: 'Mẫu xe quan tâm',
                        message: 'Nội dung *',
                        contactPreference: 'Hình thức liên hệ ưu tiên'
                    },
                    placeholders: {
                        phone: '123-456-7890',
                        vehicleInterest: 'Ví dụ: BMW X5, Mercedes S-Class',
                        message: 'Vui lòng mô tả nhu cầu của bạn...'
                    },
                    subject: {
                        placeholder: 'Chọn chủ đề',
                        options: {
                            general: 'Tư vấn chung',
                            sales: 'Thông tin mua xe',
                            service: 'Đặt lịch dịch vụ',
                            financing: 'Tư vấn tài chính',
                            testDrive: 'Đăng ký lái thử',
                            parts: 'Bộ phận phụ tùng',
                            other: 'Khác'
                        }
                    },
                    contactPreference: {
                        email: 'Email',
                        phone: 'Điện thoại',
                        either: 'Bất kỳ'
                    },
                    consent: {
                        newsletter: 'Đăng ký nhận bản tin để cập nhật tin tức và ưu đãi',
                        privacy: 'Tôi đồng ý với <a href="#" target="_blank">Chính sách bảo mật</a> và <a href="#" target="_blank">Điều khoản dịch vụ</a> *'
                    },
                    submit: 'Gửi tin nhắn',
                    sending: 'Đang gửi...',
                    reset: 'Làm mới',
                    success: {
                        title: 'Gửi thông tin thành công!',
                        message: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.'
                    }
                },
                mapSecondary: {
                    title: 'Địa chỉ',
                    subtitle: 'Nằm ở trung tâm khu xe sang của Auto City',
                    features: {
                        parking: 'Đỗ xe valet miễn phí',
                        accessible: 'Lối đi hỗ trợ xe lăn',
                        wifi: 'WiFi miễn phí',
                        lounge: 'Phòng chờ tiện nghi'
                    }
                },
                faq: {
                    title: 'Câu hỏi thường gặp',
                    subtitle: 'Những thắc mắc phổ biến',
                    items: {
                        financing: {
                            question: 'Các gói tài chính của LuxAuto gồm những gì?',
                            answer: 'Chúng tôi cung cấp lãi suất cạnh tranh từ 2,9% APR với kỳ hạn 24 - 84 tháng và hợp tác với nhiều đối tác tài chính để chọn giải pháp phù hợp nhất.'
                        },
                        tradein: {
                            question: 'LuxAuto có nhận thu xe cũ không?',
                            answer: 'Có, chúng tôi thu mua xe cũ với mức giá cạnh tranh. Đội ngũ thẩm định giàu kinh nghiệm sẽ đưa ra giá trị thị trường công bằng cho chiếc xe của bạn.'
                        },
                        warranty: {
                            question: 'Chế độ bảo hành tại LuxAuto như thế nào?',
                            answer: 'Tất cả xe đều được bảo hành chính hãng và chúng tôi cũng cung cấp các gói bảo hành mở rộng để bạn an tâm hơn. Xe đã qua chứng nhận còn được cộng thêm quyền lợi.'
                        },
                        testDrive: {
                            question: 'Tôi có thể đặt lịch lái thử không?',
                            answer: 'Hoàn toàn được! Bạn có thể gọi điện, gửi biểu mẫu hoặc ghé trực tiếp showroom để đặt lịch. Nên đặt trước để có nhiều lựa chọn xe lái thử nhất.'
                        }
                    }
                }
            },
            blogPage: {
                header: {
                    title: 'Góc nhìn ô tô',
                    subtitle: 'Tin tức, đánh giá và xu hướng xe sang mới nhất'
                },
                featured: {
                    badge: 'Biên tập chọn lọc',
                    title: 'Câu chuyện nổi bật',
                    subtitle: 'Bài viết được quan tâm nhất trong tuần',
                    heading: 'Tương lai của xe sang điện: Những thay đổi mang tính cách mạng',
                    excerpt: 'Khám phá cách công nghệ điện đang thay đổi hoàn toàn thị trường xe sang, kết hợp tính bền vững và hiệu năng đỉnh cao. Từ hệ thống pin thế hệ mới đến khả năng tự hành, tương lai xe sang thuộc về điện hóa.',
                    badgeLabel: 'Nổi bật',
                    date: '15 tháng 12, 2024',
                    readTime: '5 phút đọc',
                    author: 'Đội ngũ biên tập',
                    highlights: {
                        battery: 'Công nghệ pin thế hệ mới',
                        autonomy: 'Tính năng tự hành thông minh',
                        emissions: 'Xe sang không phát thải'
                    },
                    readCta: 'Đọc toàn bộ bài viết',
                    share: 'Chia sẻ',
                    save: 'Lưu'
                },
                brandCards: {
                    bmw: {
                        title: 'BMW Innovation',
                        tagline: 'The Ultimate Driving Machine',
                        articleTitle: 'Tương lai điện hóa của BMW: Cách mạng iX',
                        articleExcerpt: 'Khám phá dòng iX đột phá và cam kết của BMW đối với sự bền vững trong phân khúc xe sang.',
                        views: '2,3k lượt xem',
                        readTime: '5 phút đọc'
                    },
                    mercedes: {
                        title: 'Mercedes-Benz',
                        tagline: 'The Best or Nothing',
                        articleTitle: 'Mercedes EQS: Tái định nghĩa xe sang điện',
                        articleExcerpt: 'Cách Mercedes-Benz thiết lập chuẩn mực mới cho sự sang trọng và hiệu năng của xe điện.',
                        views: '1,9k lượt xem',
                        readTime: '6 phút đọc'
                    },
                    honda: {
                        title: 'Honda',
                        tagline: 'The Power of Dreams',
                        articleTitle: 'Di sản bền bỉ của Honda: Đỉnh cao kỹ thuật',
                        articleExcerpt: 'Khám phá điều tạo nên danh tiếng bền bỉ và sáng tạo của các mẫu xe Honda.',
                        views: '1,7k lượt xem',
                        readTime: '4 phút đọc'
                    }
                },
                brands: {
                    badge: 'Thương hiệu đẳng cấp',
                    title: 'Câu chuyện từ các nhà sản xuất xe sang hàng đầu',
                    subtitle: 'Khám phá insight và đổi mới từ những thương hiệu danh giá nhất thế giới'
                },
                latest: {
                    badge: 'Tin mới',
                    title: 'Bài viết đáng chú ý gần đây'
                },
                filters: {
                    all: 'Tất cả bài viết',
                    reviews: 'Đánh giá xe',
                    technology: 'Công nghệ',
                    maintenance: 'Bảo dưỡng',
                    industry: 'Tin ngành'
                },
                articleCards: {
                    autonomous: {
                        badge: 'Nổi bật',
                        readTime: '8 phút đọc',
                        category: 'Công nghệ',
                        date: '10 Tháng 12, 2024',
                        title: 'Tương lai lái tự động trên xe sang',
                        excerpt: 'AI và học máy đang thay đổi trải nghiệm lái xe sang như thế nào.'
                    },
                    bmwX7: {
                        readTime: '12 phút đọc',
                        category: 'Đánh giá xe',
                        date: '8 Tháng 12, 2024',
                        title: 'BMW X7 2024: SUV sang trọng được tái định nghĩa',
                        excerpt: 'Đánh giá chi tiết SUV đầu bảng của BMW về hiệu năng, tiện nghi và giá trị.'
                    },
                    winterCare: {
                        readTime: '6 phút đọc',
                        category: 'Bảo dưỡng',
                        date: '5 Tháng 12, 2024',
                        title: 'Bảo dưỡng xe sang mùa đông: Những lưu ý quan trọng',
                        excerpt: 'Giữ chiếc xe sang hoàn hảo trong điều kiện mùa đông khắc nghiệt với các mẹo từ chuyên gia.'
                    },
                    evsurge: {
                        readTime: '10 phút đọc',
                        category: 'Tin ngành',
                        date: '3 Tháng 12, 2024',
                        title: 'Thị trường xe điện bùng nổ năm 2024',
                        excerpt: 'Phân tích sự tăng trưởng của EV và tác động tới nhà sản xuất lẫn người dùng xe sang.'
                    },
                    connected: {
                        readTime: '7 phút đọc',
                        category: 'Công nghệ',
                        date: '30 Tháng 11, 2024',
                        title: 'Công nghệ xe kết nối: Con đường phía trước',
                        excerpt: 'IoT và 5G đang thay đổi trải nghiệm trong xe và an toàn giao thông ra sao.'
                    },
                    sclass: {
                        readTime: '15 phút đọc',
                        category: 'Đánh giá xe',
                        date: '28 Tháng 11, 2024',
                        title: 'Mercedes S-Class: Đỉnh cao sang trọng',
                        excerpt: 'Đánh giá sâu dòng S-Class mới với trang bị hiện đại và nội thất đẳng cấp.'
                    }
                },
                newsletter: {
                    title: 'Đừng bỏ lỡ tin tức',
                    subtitle: 'Đăng ký bản tin để cập nhật insight và báo cáo ngành ô tô mới nhất.',
                    placeholder: 'Nhập địa chỉ email của bạn',
                    button: 'Đăng ký',
                    benefits: {
                        weekly: 'Insight ngành ô tô mỗi tuần',
                        reports: 'Báo cáo độc quyền',
                        nospam: 'Không spam, có thể hủy bất cứ lúc nào'
                    }
                },
                tags: {
                    title: 'Chủ đề nổi bật',
                    luxury: 'Xe sang',
                    electric: 'Xe điện',
                    maintenance: 'Bảo dưỡng xe',
                    technology: 'Công nghệ ô tô',
                    buyingGuide: 'Hướng dẫn mua xe',
                    financing: 'Tài chính',
                    reviews: 'Đánh giá xe',
                    safety: 'An toàn',
                    performance: 'Hiệu suất'
                },
                archives: {
                    december: 'Tháng 12 2024 (8)',
                    november: 'Tháng 11 2024 (12)',
                    october: 'Tháng 10 2024 (15)',
                    september: 'Tháng 9 2024 (10)',
                    august: 'Tháng 8 2024 (14)'
                },
                social: {
                    facebook: 'Facebook',
                    twitter: 'Twitter',
                    instagram: 'Instagram',
                    youtube: 'YouTube'
                },
                sidebar: {
                    recent: 'Bài viết gần đây',
                    archives: 'Lưu trữ',
                    follow: 'Theo dõi chúng tôi'
                },
                notifications: {
                    showing: 'Đang hiển thị {count} bài viết thuộc {filter}',
                    brand: 'Đang xem các bài viết về {brand}',
                    loading: 'Đang tải...',
                    loaded: 'Đã tải thêm {count} bài viết',
                    allLoaded: 'Đã hiển thị tất cả bài viết'
                }
            },
            productsPage: {
                header: {
                    title: 'Bộ sưu tập xe',
                    subtitle: 'Khám phá những mẫu xe cao cấp dành riêng cho bạn'
                },
                filters: {
                    title: 'Lọc danh sách xe',
                    categories: {
                        all: 'Tất cả phân khúc',
                        luxury: 'Xe hạng sang',
                        electric: 'Xe điện',
                        sports: 'Xe thể thao'
                    },
                    prices: {
                        all: 'Tất cả mức giá',
                        under50: 'Dưới 50.000 USD',
                        mid: '50.000 - 100.000 USD',
                        over100: 'Trên 100.000 USD'
                    },
                    search: 'Tìm kiếm xe...',
                    clear: 'Xóa bộ lọc'
                },
                categories: {
                    luxury: {
                        title: 'Xe hạng sang',
                        subtitle: 'Trải nghiệm sự tiện nghi và sang trọng đỉnh cao'
                    },
                    electric: {
                        title: 'Xe điện',
                        subtitle: 'Giải pháp bền vững cho tương lai'
                    },
                    sports: {
                        title: 'Xe thể thao',
                        subtitle: 'Tinh hoa kỹ thuật hiệu năng'
                    }
                },
                comparison: {
                    title: 'So sánh xe',
                    subtitle: 'Kéo thả xe vào đây để so sánh thông số',
                    placeholder: 'Kéo một mẫu xe vào đây',
                    vs: 'VS',
                    table: {
                        feature: 'Hạng mục',
                        vehicle1: 'Xe 1',
                        vehicle2: 'Xe 2'
                    },
                    clear: 'Xóa so sánh'
                },
                labels: {
                    price: 'Giá bán'
                },
                noResults: {
                    title: 'Không tìm thấy xe phù hợp',
                    subtitle: 'Hãy điều chỉnh bộ lọc hoặc xóa bộ lọc để xem thêm lựa chọn.',
                    cta: 'Xóa tất cả bộ lọc'
                },
                financing: {
                    title: 'Giải pháp tài chính',
                    subtitle: 'Những lựa chọn linh hoạt giúp hiện thực hóa chiếc xe mơ ước',
                    options: {
                        rates: {
                            title: 'Lãi suất ưu đãi',
                            text: 'Lãi suất cạnh tranh chỉ từ 2,9% APR'
                        },
                        terms: {
                            title: 'Kỳ hạn linh hoạt',
                            text: 'Lựa chọn kỳ hạn từ 24 đến 84 tháng'
                        },
                        tradein: {
                            title: 'Thu xe cũ giá tốt',
                            text: 'Định giá cao cho chiếc xe hiện tại của bạn'
                        },
                        approval: {
                            title: 'Duyệt hồ sơ nhanh',
                            text: 'Phê duyệt chỉ trong vài phút với biểu mẫu trực tuyến'
                        }
                    }
                },
                calculator: {
                    title: 'Máy tính khoản vay',
                    labels: {
                        vehiclePrice: 'Giá xe ($)',
                        downPayment: 'Trả trước ($)',
                        interestRate: 'Lãi suất (%)',
                        loanTerm: 'Thời hạn vay (tháng)'
                    },
                    terms: {
                        '24': '24 tháng',
                        '36': '36 tháng',
                        '48': '48 tháng',
                        '60': '60 tháng',
                        '72': '72 tháng',
                        '84': '84 tháng'
                    },
                    calculate: 'Tính khoản trả',
                    results: {
                        monthly: 'Khoản trả hàng tháng:',
                        interest: 'Tổng lãi phải trả:',
                        total: 'Tổng chi phí:'
                    }
                }
            },
            registerPage: {
                header: {
                    title: 'Tạo tài khoản',
                    subtitle: 'Gia nhập LuxAuto và nhận ưu đãi độc quyền'
                },
                benefits: {
                    offers: {
                        title: 'Ưu đãi độc quyền',
                        text: 'Tiếp cận mức giá đặc biệt và khuyến mại giới hạn cho xe sang'
                    },
                    notifications: {
                        title: 'Thông báo ưu tiên',
                        text: 'Là người đầu tiên biết về mẫu xe mới và sự kiện riêng tư'
                    },
                    scheduling: {
                        title: 'Đặt lịch dễ dàng',
                        text: 'Đặt lịch dịch vụ và lái thử trực tuyến chỉ trong vài bước'
                    },
                    advisor: {
                        title: 'Chuyên gia đồng hành',
                        text: 'Được hỗ trợ bởi các chuyên gia xe hơi được chứng nhận'
                    }
                },
                form: {
                    requiredNotice: 'Các trường có dấu * là bắt buộc'
                },
                steps: {
                    step1: { title: 'Thông tin cá nhân' },
                    step2: { title: 'Thông tin liên hệ' },
                    step3: { title: 'Sở thích về xe' },
                    step4: { title: 'Bảo mật tài khoản' },
                    step5: { title: 'Kiểm tra thông tin' }
                },
                buttons: {
                    next: 'Bước tiếp theo',
                    previous: 'Quay lại',
                    review: 'Kiểm tra & gửi',
                    submit: 'Tạo tài khoản',
                    submitting: 'Đang tạo tài khoản...'
                },
                review: {
                    personal: 'Thông tin cá nhân',
                    address: 'Địa chỉ',
                    preferences: 'Sở thích'
                },
                consent: {
                    terms: 'Tôi đồng ý với <a href="#" target="_blank">Điều khoản dịch vụ</a> và <a href="#" target="_blank">Chính sách bảo mật</a> *',
                    age: 'Tôi xác nhận đã đủ 18 tuổi *'
                },
                progress: {
                    personal: 'Cá nhân',
                    address: 'Địa chỉ',
                    preferences: 'Sở thích',
                    security: 'Bảo mật',
                    review: 'Kiểm tra'
                },
                success: {
                    title: 'Chào mừng đến LuxAuto!',
                    message: 'Tài khoản của bạn đã được tạo thành công. Chúng tôi sẽ gửi email xác nhận trong thời gian sớm nhất.',
                    cta: 'Về trang chủ'
                }
            }
        }
    };

    const subscribers = new Set();

    function getTranslationValue(lang, key) {
        const segments = key.split('.');
        let current = translations[lang];
        let fallback = translations.en;

        for (const segment of segments) {
            current = current && current[segment] !== undefined ? current[segment] : undefined;
            fallback = fallback && fallback[segment] !== undefined ? fallback[segment] : undefined;
        }

        if (typeof current === 'function') {
            return current;
        }

        if (current !== undefined) {
            return current;
        }

        if (typeof fallback === 'function') {
            return fallback;
        }

        return fallback !== undefined ? fallback : key;
    }

    function applyTranslations(root = document) {
        const textElements = root.querySelectorAll('[data-i18n]');
        textElements.forEach(el => {
            const key = el.dataset.i18n;
            if (!key) return;
            const value = window.languageManager.t(key);
            if (typeof value === 'string') {
                el.textContent = value;
            }
        });

        const htmlElements = root.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(el => {
            const key = el.dataset.i18nHtml;
            if (!key) return;
            const value = window.languageManager.t(key);
            if (typeof value === 'string') {
                el.innerHTML = value;
            }
        });

        const placeholderElements = root.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (!key) return;
            const value = window.languageManager.t(key);
            if (typeof value === 'string') {
                el.setAttribute('placeholder', value);
            }
        });
    }

    function updateToggleState(lang) {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    window.languageManager = {
        currentLang: localStorage.getItem('luxauto_lang') || 'en',
        t(key) {
            const value = getTranslationValue(this.currentLang, key);
            if (typeof value === 'function') {
                return value;
            }
            return value;
        },
        translate(key, ...args) {
            const value = this.t(key);
            if (typeof value === 'function') {
                return value(...args);
            }
            return value;
        },
        apply() {
            applyTranslations();
            document.documentElement.lang = this.currentLang;
            updateToggleState(this.currentLang);
        },
        applyTo(root) {
            applyTranslations(root);
        },
        setLanguage(lang) {
            if (!translations[lang]) {
                return;
            }
            this.currentLang = lang;
            localStorage.setItem('luxauto_lang', lang);
            this.apply();
            subscribers.forEach(callback => {
                try {
                    callback(lang);
                } catch (err) {
                    console.error('Language callback failed', err);
                }
            });
        },
        getCurrentLanguage() {
            return this.currentLang;
        },
        onChange(callback) {
            if (typeof callback === 'function') {
                subscribers.add(callback);
                return () => subscribers.delete(callback);
            }
            return () => {};
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const initialLang = window.languageManager.getCurrentLanguage();
        window.languageManager.setLanguage(initialLang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                window.languageManager.setLanguage(lang);
            });
        });
    });
})();
