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
    }
}

function updateSliderFill(value) {
    const percent = ((value - 0.5) / (1.5 - 0.5)) * 100;
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.setProperty('--fill', `${percent}%`);
    }
}

function openSidebar() {
    document.getElementById('settingsSidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('active');
}

function closeSidebar() {
    document.getElementById('settingsSidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
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

document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();

    const settingsBtn = document.getElementById('settingsBtn');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    settingsBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    const brightnessSlider = document.getElementById('brightnessSlider');
    brightnessSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        setBrightness(val);
        updateSliderFill(val);
    });
    updateSliderFill(parseFloat(brightnessSlider.value));

    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('change', (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    });

    const langSelect = document.getElementById('languageSelect');
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('settingsSidebar').classList.contains('open')) {
            closeSidebar();
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
                closeSidebar();
            }
        });
    });
});