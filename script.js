const translations = {
    en: {
        "logo": "David",
        "nav-home": "Home",
        "nav-services": "Services",
        "nav-contact": "Contact",
        "hero-greeting": "I'm",
        "hero-name": "David",
        "hero-tagline": "Freelance programmer bringing your ideas to life.",
        "hire-btn": "Hire Me",
        "telegram-btn": "Telegram",
        "services-title": "What I Offer",
        "service1-title": "Software Development",
        "service1-desc": "Custom desktop and mobile applications tailored to your needs.",
        "service2-title": "Website Creation",
        "service2-desc": "Responsive, modern websites from landing pages to complex portals.",
        "service3-title": "Telegram Bots",
        "service3-desc": "Automation, chatbots, and integrations for your Telegram channels.",
        "service4-title": "Help with Existing Projects",
        "service4-desc": "Support, refactoring, and improvements for your ongoing projects.",
        "contact-title": "Get in Touch",
        "footer": "© 2026 David. All rights reserved.",
        "settings-title": "Settings",
        "brightness-label": "Brightness",
        "theme-label": "Theme",
        "language-label": "Language"
    },
    ru: {
        "logo": "Давид",
        "nav-home": "Главная",
        "nav-services": "Услуги",
        "nav-contact": "Контакты",
        "hero-greeting": "Я",
        "hero-name": "Давид",
        "hero-tagline": "Фриланс-программист, воплощающий ваши идеи в жизнь.",
        "hire-btn": "Нанять",
        "telegram-btn": "Telegram",
        "services-title": "Что я предлагаю",
        "service1-title": "Разработка ПО",
        "service1-desc": "Пользовательские настольные и мобильные приложения под ваши нужды.",
        "service2-title": "Создание сайтов",
        "service2-desc": "Адаптивные современные сайты от лендингов до сложных порталов.",
        "service3-title": "Telegram боты",
        "service3-desc": "Автоматизация, чат-боты и интеграции для ваших Telegram каналов.",
        "service4-title": "Помощь с существующими проектами",
        "service4-desc": "Поддержка, рефакторинг и улучшение ваших текущих проектов.",
        "contact-title": "Свяжитесь со мной",
        "footer": "© 2026 Давид. Все права защищены.",
        "settings-title": "Настройки",
        "brightness-label": "Яркость",
        "theme-label": "Тема",
        "language-label": "Язык"
    },
    zh: {
        "logo": "大衛",
        "nav-home": "首页",
        "nav-services": "服务",
        "nav-contact": "联系",
        "hero-greeting": "我是",
        "hero-name": "大衛",
        "hero-tagline": "自由程序员，将您的想法变为现实。",
        "hire-btn": "雇佣我",
        "telegram-btn": "Telegram",
        "services-title": "我的服务",
        "service1-title": "软件开发",
        "service1-desc": "根据您的需求定制桌面和移动应用程序。",
        "service2-title": "网站创建",
        "service2-desc": "响应式现代网站，从登录页到复杂门户。",
        "service3-title": "Telegram 机器人",
        "service3-desc": "为您的 Telegram 频道提供自动化、聊天机器人和集成。",
        "service4-title": "帮助现有项目",
        "service4-desc": "为您正在进行的项目提供支持、重构和改进。",
        "contact-title": "联系我",
        "footer": "© 2026 大衛. 保留所有权利。",
        "settings-title": "设置",
        "brightness-label": "亮度",
        "theme-label": "主题",
        "language-label": "语言"
    }
};

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.value = lang;
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeToggle').checked = true;
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        document.getElementById('themeToggle').checked = false;
        localStorage.setItem('theme', 'light');
    }
}

function setBrightness(value) {
    document.body.style.filter = `brightness(${value})`;
    localStorage.setItem('brightness', value);
    const slider = document.getElementById('brightnessSlider');
    if (slider) {
        slider.value = value;
        updateSliderFill(value);
        updateBrightnessDisplay(value);
    }
}

function updateSliderFill(value) {
    const percent = ((value - 0.5) / (1.5 - 0.5)) * 100;
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.setProperty('--fill', `${percent}%`);
    }
}

function updateBrightnessDisplay(value) {
    const percent = Math.round(((value - 0.5) / (1.5 - 0.5)) * 100);
    const displaySpan = document.querySelector('.brightness-value');
    if (displaySpan) {
        displaySpan.textContent = `${percent}%`;
    }
}

function toggleSettingsPanel() {
    const widget = document.querySelector('.floating-settings');
    widget.classList.toggle('open');
}

function closeSettingsPanel() {
    const widget = document.querySelector('.floating-settings');
    widget.classList.remove('open');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function loadPreferences() {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    const savedBrightness = localStorage.getItem('brightness');
    if (savedBrightness !== null) {
        setBrightness(parseFloat(savedBrightness));
    } else {
        setBrightness(1);
    }
}

// Scroll Reveal
function initScrollReveal() {
    const elements = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    initScrollReveal();

    const settingsToggle = document.getElementById('settingsToggle');
    const closePanel = document.getElementById('closePanel');

    settingsToggle.addEventListener('click', toggleSettingsPanel);
    closePanel.addEventListener('click', closeSettingsPanel);

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        const widget = document.querySelector('.floating-settings');
        if (!widget.contains(e.target) && widget.classList.contains('open')) {
            closeSettingsPanel();
        }
    });

    const brightnessSlider = document.getElementById('brightnessSlider');
    brightnessSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        setBrightness(val);
    });
    updateBrightnessDisplay(parseFloat(brightnessSlider.value));

    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('change', (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    });

    const langSelect = document.getElementById('languageSelect');
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettingsPanel();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeSettingsPanel();
            }
        });
    });

    // Copy contact info
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            const textToCopy = item.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied: ${textToCopy}`);
                }).catch(() => {
                    showToast('Failed to copy');
                });
            }
        });
    });
});