/**
 * ШАГГИ - Умный гид по прогулкам
 * Полностью обновленная версия с исправлениями
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let appState = {
    currentScreen: 'screen1',
    previousScreen: null,
    currentCategory: null,
    currentDistrict: null,
    currentRoute: null,
    favorites: [],
    userData: null,
    isTelegram: false,
    tg: null,
    filters: {
        time: 5,
        distance: 10,
        price: 10000
    },
    settings: {
        darkMode: false,
        notifications: true,
        sounds: true,
        walkingSpeed: 'normal'
    }
};

// ===== ДАННЫЕ МАРШРУТОВ =====
const routeData = {
    romantic: {
        title: "Романтические маршруты",
        icon: "fa-heart",
        color: "#FF7675",
        gradient: "linear-gradient(135deg, #FF7675 0%, #FFA8A8 100%)",
        districts: {
            center: {
                name: "Центр для влюбленных",
                routes: [
                    {
                        id: "romantic-center-1",
                        name: "Вечерние огни",
                        description: "Прогулка по самым красивым вечерним видам Москвы",
                        time: 2,
                        distance: 3.2,
                        price: 1500,
                        rating: 4.3,
                        reviews: 128,
                        places: [
                            {name: "Патриарший мост", description: "Лучший вид на закат"},
                            {name: "Софийская набережная", description: "Романтичная прогулка у воды"},
                            {name: "Парк Зарядье", description: "Современный парк с панорамными видами"}
                        ]
                    },
                    {
                        id: "romantic-center-2",
                        name: "Речные прогулки",
                        description: "Романтика набережных и мостов",
                        time: 1.5,
                        distance: 2.8,
                        price: 1200,
                        rating: 4.5,
                        reviews: 95,
                        places: [
                            {name: "Кремлевская набережная", description: "Вид на Кремль с воды"},
                            {name: "Большой Каменный мост", description: "Красивые фото с моста"},
                            {name: "Парк Музеон", description: "Арт-пространство для прогулок"}
                        ]
                    },
                    {
                        id: "romantic-center-3",
                        name: "Аллеи любви",
                        description: "Самые живописные парковые аллеи",
                        time: 1.5,
                        distance: 2.5,
                        price: 500,
                        rating: 4.7,
                        reviews: 89,
                        places: [
                            {name: "Парк Горького", description: "Главный парк столицы"},
                            {name: "Нескучный сад", description: "Тихий уголок природы"}
                        ]
                    }
                ]
            },
            parks: {
                name: "Романтика в парках",
                routes: [
                    {
                        id: "romantic-parks-1",
                        name: "Уединенные тропинки",
                        description: "Тихие места для спокойного отдыха",
                        time: 2,
                        distance: 3.5,
                        price: 400,
                        rating: 4.6,
                        reviews: 56,
                        places: [
                            {name: "Ботанический сад", description: "Цветущие аллеи"},
                            {name: "Серебряный бор", description: "Чистый воздух и природа"}
                        ]
                    }
                ]
            }
        }
    },
    historical: {
        title: "Исторические маршруты",
        icon: "fa-landmark",
        color: "#6C5CE7",
        gradient: "linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)",
        districts: {
            center: {
                name: "Сердце Москвы",
                routes: [
                    {
                        id: "historical-center-1",
                        name: "По следам истории",
                        description: "Главные исторические места Москвы",
                        time: 3,
                        distance: 4.5,
                        price: 1200,
                        rating: 4.9,
                        reviews: 215,
                        places: [
                            {name: "Красная площадь", description: "Главная площадь страны"},
                            {name: "Кремль", description: "Символ российской государственности"},
                            {name: "Храм Василия Блаженного", description: "Архитектурный шедевр"}
                        ]
                    },
                    {
                        id: "historical-center-2",
                        name: "Древняя Москва",
                        description: "Места основания города",
                        time: 2.5,
                        distance: 3.8,
                        price: 1000,
                        rating: 4.7,
                        reviews: 156,
                        places: [
                            {name: "Китай-город", description: "Исторический район"},
                            {name: "Зарядье", description: "Место древнего посада"}
                        ]
                    }
                ]
            },
            zamoskvorechye: {
                name: "Замоскворечье",
                routes: [
                    {
                        id: "historical-zamosk-1",
                        name: "Купеческая Москва",
                        description: "История торгового сословия",
                        time: 2,
                        distance: 3.2,
                        price: 900,
                        rating: 4.5,
                        reviews: 87,
                        places: [
                            {name: "Третьяковская галерея", description: "Сокровищница русского искусства"},
                            {name: "Пятницкая улица", description: "Историческая застройка"}
                        ]
                    }
                ]
            }
        }
    },
    gastronomic: {
        title: "Гастрономические маршруты",
        icon: "fa-utensils",
        color: "#00B894",
        gradient: "linear-gradient(135deg, #00B894 0%, #55EFC4 100%)",
        districts: {
            center: {
                name: "Центр гастрономии",
                routes: [
                    {
                        id: "gastro-center-1",
                        name: "Москва ресторанная",
                        description: "Лучшие рестораны центра",
                        time: 3,
                        distance: 2.5,
                        price: 5000,
                        rating: 4.7,
                        reviews: 145,
                        places: [
                            {name: "Кафе Пушкинъ", description: "Легендарное заведение"},
                            {name: "White Rabbit", description: "Ресторан с панорамным видом"},
                            {name: "Twins Garden", description: "Современная русская кухня"}
                        ]
                    },
                    {
                        id: "gastro-center-2",
                        name: "Уличная еда",
                        description: "Вкусно и недорого",
                        time: 1.5,
                        distance: 2.0,
                        price: 1500,
                        rating: 4.4,
                        reviews: 203,
                        places: [
                            {name: "Данпик-плаза", description: "Фудкорт с разной кухней"},
                            {name: "Красный Октябрь", description: "Модные кафе и бары"}
                        ]
                    }
                ]
            }
        }
    },
    premium: {
        title: "Премиум маршруты",
        icon: "fa-crown",
        color: "#FFD700",
        gradient: "linear-gradient(135deg, #FFD700 0%, #FFEAA7 100%)",
        districts: {
            exclusive: {
                name: "Эксклюзивные туры",
                routes: [
                    {
                        id: "premium-exclusive-1",
                        name: "VIP Москва",
                        description: "Элитные места столицы с персональным гидом",
                        time: 4,
                        distance: 15,
                        price: 15000,
                        rating: 4.9,
                        reviews: 56,
                        places: [
                            {name: "Рублевка", description: "Элитный район"},
                            {name: "Барвиха Luxury Village", description: "Бутики класса люкс"},
                            {name: "Кремль с экскурсоводом", description: "Закрытый тур"}
                        ]
                    }
                ]
            }
        }
    }
};

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ШАГГИ: Инициализация приложения...');
    initializeApp();
});

function initializeApp() {
    // Проверяем, запущено ли в Telegram
    checkTelegramEnvironment();
    
    // Загружаем данные пользователя
    loadUserData();
    
    // Загружаем сохраненные настройки
    loadSettings();
    
    // Загружаем избранное
    loadFavorites();
    
    // Инициализируем UI
    setTimeout(() => {
        initUI();
    }, 100);
}

// ===== ИНТЕГРАЦИЯ С TELEGRAM =====
function checkTelegramEnvironment() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            appState.tg = window.Telegram.WebApp;
            appState.isTelegram = true;
            
            console.log('✅ Telegram Web App обнаружен');
            setupTelegramWebApp();
        } else {
            console.log('ℹ️ Запуск в браузере (не Telegram)');
            appState.isTelegram = false;
        }
    } catch (error) {
        console.error('Ошибка проверки Telegram:', error);
        appState.isTelegram = false;
    }
}

function setupTelegramWebApp() {
    if (!appState.tg) return;
    
    // Растягиваем на весь экран
    appState.tg.expand();
    
    // Настраиваем кнопку "Назад"
    appState.tg.BackButton.hide();
    appState.tg.BackButton.onClick(handleTelegramBack);
    
    // Настраиваем основную кнопку (скрываем по умолчанию)
    if (appState.tg.MainButton) {
        appState.tg.MainButton.hide();
    }
    
    // Применяем тему Telegram
    applyTelegramTheme();
    
    // Загружаем данные пользователя из Telegram
    loadTelegramUserData();
    
    // Отправляем событие о запуске
    sendTelegramEvent('app_launched');
}

function applyTelegramTheme() {
    if (!appState.tg) return;
    
    const theme = appState.tg.themeParams;
    const root = document.documentElement;
    
    // Применяем тему Telegram к CSS переменным
    if (theme.bg_color) {
        root.style.setProperty('--telegram-bg', theme.bg_color);
    }
    
    if (theme.text_color) {
        root.style.setProperty('--dark-color', theme.text_color);
        root.style.setProperty('--card-text', theme.text_color);
    }
    
    if (theme.button_color) {
        root.style.setProperty('--primary-color', theme.button_color);
    }
    
    if (theme.button_text_color) {
        root.style.setProperty('--white', theme.button_text_color);
    }
    
    if (theme.hint_color) {
        root.style.setProperty('--light-color', theme.hint_color);
    }
    
    // Применяем темную тему если нужно
    if (appState.tg.colorScheme === 'dark') {
        document.body.classList.add('dark-theme');
        appState.settings.darkMode = true;
    }
}

function loadTelegramUserData() {
    if (!appState.tg || !appState.tg.initDataUnsafe) return;
    
    const user = appState.tg.initDataUnsafe.user;
    if (user) {
        appState.userData = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            languageCode: user.language_code,
            isPremium: user.is_premium || false,
            photoUrl: user.photo_url
        };
        
        console.log('👤 Данные пользователя Telegram:', appState.userData);
        
        // Персонализируем приложение
        if (user.first_name) {
            updateUserGreeting(user.first_name);
        }
    }
}

function handleTelegramBack() {
    if (appState.currentScreen === 'screen1') {
        appState.tg.BackButton.hide();
        return;
    }
    
    // Навигация назад в зависимости от текущего экрана
    const backMap = {
        'categories': 'screen1',
        'districts': 'categories',
        'routes': 'districts',
        'route-details': 'routes',
        'favorites': 'screen1',
        'settings': 'screen1',
        'add-review': 'route-details'
    };
    
    const previousScreen = backMap[appState.currentScreen];
    if (previousScreen) {
        showScreen(previousScreen);
    } else {
        showScreen('screen1');
    }
}

function sendTelegramEvent(eventName, data = {}) {
    if (!appState.isTelegram || !appState.tg) return;
    
    const eventData = {
        event: eventName,
        timestamp: Date.now(),
        user_id: appState.userData?.id,
        screen: appState.currentScreen,
        ...data
    };
    
    console.log(`📤 Telegram событие: ${eventName}`, eventData);
}

// ===== УПРАВЛЕНИЕ ЭКРАНАМИ =====
function showScreen(screenId, params = {}) {
    console.log(`🔄 Переход на экран: ${screenId}`);
    
    // Обновляем историю
    appState.previousScreen = appState.currentScreen;
    appState.currentScreen = screenId;
    
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    
    // Показываем нужный экран
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 10);
        
        // Загружаем контент для экрана
        loadScreenContent(screenId, params);
        
        // Настраиваем кнопку "Назад" в Telegram
        updateTelegramBackButton(screenId);
        
        // Скрываем панель фильтров если она открыта
        if (screenId !== 'routes') {
            const filtersPanel = document.getElementById('filters-panel');
            if (filtersPanel) {
                filtersPanel.classList.remove('active');
                filtersPanel.style.display = 'none';
            }
        }
    }
}

function loadScreenContent(screenId, params) {
    switch(screenId) {
        case 'screen1':
            animateStats();
            break;
        case 'categories':
            loadCategories();
            break;
        case 'districts':
            loadDistricts();
            break;
        case 'routes':
            loadRoutes();
            break;
        case 'route-details':
            loadRouteDetails();
            break;
        case 'favorites':
            loadFavoritesScreen();
            break;
        case 'settings':
            loadSettingsScreen();
            break;
    }
}

function updateTelegramBackButton(screenId) {
    if (!appState.isTelegram || !appState.tg) return;
    
    if (screenId === 'screen1') {
        appState.tg.BackButton.hide();
    } else {
        appState.tg.BackButton.show();
    }
}

function goBack() {
    if (appState.previousScreen) {
        showScreen(appState.previousScreen);
    } else {
        showScreen('screen1');
    }
}

// ===== ЗАГРУЗКА ДАННЫХ И КОНТЕНТА =====
function loadUserData() {
    const savedData = localStorage.getItem('shaggi_user_data');
    if (savedData) {
        try {
            appState.userData = JSON.parse(savedData);
        } catch (e) {
            console.error('Ошибка загрузки данных пользователя:', e);
        }
    }
}

function loadSettings() {
    const savedSettings = localStorage.getItem('shaggi_settings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            appState.settings = {...appState.settings, ...settings};
            
            // Применяем настройки темы
            if (appState.settings.darkMode) {
                document.body.classList.add('dark-theme');
            }
        } catch (e) {
            console.error('Ошибка загрузки настроек:', e);
        }
    }
}

function loadFavorites() {
    const savedFavorites = localStorage.getItem('shaggi_favorites');
    if (savedFavorites) {
        try {
            appState.favorites = JSON.parse(savedFavorites);
        } catch (e) {
            console.error('Ошибка загрузки избранного:', e);
        }
    }
}

function saveSettings() {
    localStorage.setItem('shaggi_settings', JSON.stringify(appState.settings));
    showNotification('Настройки сохранены!');
    showScreen('screen1');
}

function saveFavorites() {
    localStorage.setItem('shaggi_favorites', JSON.stringify(appState.favorites));
}

// ===== ГЛАВНЫЙ ЭКРАН =====
function initUI() {
    // Скрываем экран загрузки
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    // Показываем основное приложение
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.style.display = 'block';
    }
    
    // Создаем экраны приложения
    createAppScreens();
    
    // Показываем стартовый экран
    showScreen('screen1');
}

function createAppScreens() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    
    appContainer.innerHTML = `
        <!-- Экран 1: Стартовый -->
        <div class="screen active" id="screen1">
            <div class="content hero-background">
                <!-- Плавающие элементы -->
                <div class="floating-elements">
                    <div class="floating-icon" style="--delay: 0s;">🏛️</div>
                    <div class="floating-icon" style="--delay: 1s;">🌳</div>
                    <div class="floating-icon" style="--delay: 2s;">☕</div>
                    <div class="floating-icon" style="--delay: 3s;">🎭</div>
                </div>
                
                <!-- Основной контент -->
                <div class="hero-center-container">
                    <!-- Логотип -->
                    <div class="logo-container">
                        <h1 class="logo animated-logo">ШАГГИ</h1>
                        <div class="logo-subtitle">Умные маршруты</div>
                        <div id="user-greeting" class="user-greeting"></div>
                    </div>
                    
                    <!-- Кнопки действий -->
                    <div class="hero-content">
                        <div class="cta-buttons">
                            <button class="btn btn-primary-glow" onclick="showScreen('categories')">
                                <i class="fas fa-shoe-prints"></i> Начать прогулку
                                <span class="btn-pulse"></span>
                            </button>
                            
                            <div class="secondary-buttons">
                                <button class="btn btn-transparent" onclick="showScreen('favorites')">
                                    <i class="fas fa-heart"></i> Избранное
                                    <span id="favorites-count" class="badge"></span>
                                </button>
                                <button class="btn btn-transparent" onclick="showScreen('settings')">
                                    <i class="fas fa-cog"></i> Настройки
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Статистика -->
                    <div class="stats-bar">
                        <div class="stat-item">
                            <div class="stat-content">
                                <div class="stat-icon"><i class="fas fa-route"></i></div>
                                <div class="stat-number" id="total-routes">0</div>
                                <div class="stat-label">маршрутов</div>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-content">
                                <div class="stat-icon"><i class="fas fa-users"></i></div>
                                <div class="stat-number" id="active-users">0</div>
                                <div class="stat-label">активных</div>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-content">
                                <div class="stat-icon"><i class="fas fa-cloud-sun"></i></div>
                                <div class="stat-number" id="weather-temp">--°</div>
                                <div class="stat-label" id="weather-city">Москва</div>
                                <div class="weather-details" id="weather-details">загрузка</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Экран 2: Категории -->
        <div class="screen" id="categories">
            <div class="header">
                <button class="back-btn" onclick="showScreen('screen1')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2>Выберите категорию</h2>
            </div>
            <div class="content" id="categories-content">
                <!-- Категории загружаются динамически -->
            </div>
        </div>

        <!-- Экран 3: Районы -->
        <div class="screen" id="districts">
            <div class="header">
                <button class="back-btn" onclick="showScreen('categories')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2 id="districts-title">Выберите район</h2>
            </div>
            <div class="content" id="districts-content">
                <!-- Районы загружаются динамически -->
            </div>
        </div>

        <!-- Экран 4: Маршруты -->
        <div class="screen" id="routes">
            <div class="header">
                <button class="back-btn" onclick="showScreen('districts')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2 id="routes-title">Выберите маршрут</h2>
                <button class="back-btn filter-btn" onclick="toggleFilters()" style="left: auto; right: 0;">
                    <i class="fas fa-filter"></i>
                </button>
            </div>
            <div class="content" id="routes-content">
                <!-- Панель фильтров (скрыта по умолчанию) -->
                <div class="filters-panel" id="filters-panel">
                    <div class="filter-header">
                        <h3 class="filter-title"><i class="fas fa-filter"></i> Фильтры</h3>
                        <button class="filter-close" onclick="toggleFilters()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="filter-body">
                        <div class="filter-group">
                            <label class="filter-label">
                                <i class="fas fa-clock"></i> До <span id="filter-time-value">2</span> ч
                            </label>
                            <input type="range" class="filter-slider" id="filter-time" 
                                   min="0.5" max="5" step="0.5" value="2"
                                   oninput="updateFilterValue('time', this.value)">
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">
                                <i class="fas fa-route"></i> До <span id="filter-distance-value">3</span> км
                            </label>
                            <input type="range" class="filter-slider" id="filter-distance" 
                                   min="1" max="10" step="0.5" value="3"
                                   oninput="updateFilterValue('distance', this.value)">
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">
                                <i class="fas fa-wallet"></i> До <span id="filter-price-value">2000</span> ₽
                            </label>
                            <input type="range" class="filter-slider" id="filter-price" 
                                   min="0" max="10000" step="500" value="2000"
                                   oninput="updateFilterValue('price', this.value)">
                        </div>
                    </div>
                    
                    <div class="filter-footer">
                        <button class="btn btn-reset" onclick="resetFilters()">
                            <i class="fas fa-redo"></i> Сбросить
                        </button>
                        <button class="btn btn-apply" onclick="applyFilters()">
                            <i class="fas fa-check"></i> Применить
                        </button>
                    </div>
                </div>
                
                <!-- Список маршрутов -->
                <div id="routes-list"></div>
            </div>
        </div>

        <!-- Экран 5: Детали маршрута -->
        <div class="screen" id="route-details">
            <div class="header">
                <button class="back-btn" onclick="showScreen('routes')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2 id="route-details-title">Маршрут</h2>
            </div>
            <div class="content" id="route-details-content">
                <!-- Детали загружаются динамически -->
            </div>
        </div>

        <!-- Экран 6: Избранное -->
        <div class="screen" id="favorites">
            <div class="header">
                <button class="back-btn" onclick="showScreen('screen1')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2>Избранное</h2>
            </div>
            <div class="content" id="favorites-list">
                <!-- Избранное загружается динамически -->
            </div>
        </div>

        <!-- Экран 7: Настройки -->
        <div class="screen" id="settings">
            <div class="header">
                <button class="back-btn" onclick="showScreen('screen1')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2>Настройки</h2>
            </div>
            <div class="content">
                <div class="settings-item">
                    <label><i class="fas fa-moon"></i> Тёмная тема</label>
                    <label class="switch">
                        <input type="checkbox" id="dark-mode" onchange="toggleDarkMode()">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="settings-item">
                    <label><i class="fas fa-bell"></i> Уведомления</label>
                    <label class="switch">
                        <input type="checkbox" id="notifications" checked onchange="toggleSetting('notifications')">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="settings-item">
                    <label><i class="fas fa-volume-up"></i> Звуки</label>
                    <label class="switch">
                        <input type="checkbox" id="sounds" checked onchange="toggleSetting('sounds')">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="settings-item">
                    <label><i class="fas fa-walking"></i> Скорость ходьбы</label>
                    <select id="walking-speed" onchange="changeWalkingSpeed()">
                        <option value="slow">Медленная</option>
                        <option value="normal" selected>Средняя</option>
                        <option value="fast">Быстрая</option>
                    </select>
                </div>
                <button class="btn btn-accent" onclick="saveSettings()">
                    <i class="fas fa-save"></i> Сохранить настройки
                </button>
                <button class="btn btn-secondary" onclick="clearAppData()" style="margin-top: 10px;">
                    <i class="fas fa-trash"></i> Очистить данные
                </button>
            </div>
        </div>
    `;
    
    // Инициализируем фильтры
    initFilters();
    
    // Обновляем счетчик избранного
    updateFavoritesCount();
}

// ===== ФУНКЦИИ ГЛАВНОГО ЭКРАНА =====
function updateUserGreeting(name) {
    const greetingElement = document.getElementById('user-greeting');
    if (greetingElement) {
        const hours = new Date().getHours();
        let greeting = 'Доброй ночи';
        
        if (hours >= 5 && hours < 12) greeting = 'Доброе утро';
        else if (hours >= 12 && hours < 18) greeting = 'Добрый день';
        else if (hours >= 18 && hours < 23) greeting = 'Добрый вечер';
        
        greetingElement.textContent = `${greeting}, ${name}!`;
    }
}

function animateStats() {
    // Подсчитываем общее количество маршрутов
    let totalRoutes = 0;
    for (const category in routeData) {
        for (const district in routeData[category].districts) {
            totalRoutes += routeData[category].districts[district].routes.length;
        }
    }
    
    // Анимируем числа
    animateValue('total-routes', 0, totalRoutes, 1500);
    animateValue('active-users', 0, Math.floor(Math.random() * 5000) + 3000, 2000);
    
    // Обновляем погоду
    updateWeather();
    
    // Обновляем счетчик избранного
    updateFavoritesCount();
}

function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTime = null;
    
    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(start + progress * (end - start));
        
        if (elementId === 'active-users' && value >= 1000) {
            element.textContent = (value / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

function updateWeather() {
    const cities = [
        { name: "Москва", temp: 18, condition: "облачно", icon: "fa-cloud" },
        { name: "Санкт-Петербург", temp: 16, condition: "дождь", icon: "fa-cloud-rain" },
        { name: "Казань", temp: 20, condition: "ясно", icon: "fa-sun" },
        { name: "Сочи", temp: 25, condition: "солнечно", icon: "fa-sun" }
    ];
    
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    document.getElementById('weather-temp').textContent = randomCity.temp + '°';
    document.getElementById('weather-city').textContent = randomCity.name;
    document.getElementById('weather-details').textContent = randomCity.condition;
    
    // Анимируем иконку погоды
    const weatherIcon = document.querySelector('.stat-icon .fa-cloud-sun');
    if (weatherIcon) {
        weatherIcon.className = `fas ${randomCity.icon}`;
    }
}

// ===== КАТЕГОРИИ, РАЙОНЫ И МАРШРУТЫ =====
function loadCategories() {
    const content = document.getElementById('categories-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    let delay = 0.1;
    for (const categoryKey in routeData) {
        const category = routeData[categoryKey];
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-card fade-in';
        categoryElement.style.animationDelay = `${delay}s`;
        categoryElement.onclick = () => selectCategory(categoryKey);
        
        // Подсчет маршрутов в категории
        let routeCount = 0;
        for (const district in category.districts) {
            routeCount += category.districts[district].routes.length;
        }
        
        categoryElement.innerHTML = `
            <div class="category-card-inner" style="background: ${category.gradient}">
                <div class="category-icon">
                    <i class="fas ${category.icon}"></i>
                </div>
                <div class="category-content">
                    <h3>${category.title}</h3>
                    <p class="category-stats">${routeCount} маршрутов • ${Object.keys(category.districts).length} района</p>
                </div>
                <div class="category-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
        
        content.appendChild(categoryElement);
        delay += 0.1;
    }
}

function selectCategory(categoryKey) {
    appState.currentCategory = categoryKey;
    showScreen('districts');
}

function loadDistricts() {
    const title = document.getElementById('districts-title');
    const content = document.getElementById('districts-content');
    
    if (!title || !content || !appState.currentCategory) return;
    
    const category = routeData[appState.currentCategory];
    title.textContent = category.title;
    content.innerHTML = '';
    
    let delay = 0.1;
    for (const districtKey in category.districts) {
        const district = category.districts[districtKey];
        
        const districtElement = document.createElement('div');
        districtElement.className = 'category-card fade-in';
        districtElement.style.animationDelay = `${delay}s`;
        districtElement.onclick = () => selectDistrict(districtKey);
        
        districtElement.innerHTML = `
            <div class="category-card-inner" style="background: ${category.gradient}">
                <div class="category-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="category-content">
                    <h3>${district.name}</h3>
                    <p class="category-stats">${district.routes.length} маршрут${district.routes.length > 1 ? 'а' : ''}</p>
                </div>
                <div class="category-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
        
        content.appendChild(districtElement);
        delay += 0.1;
    }
}

function selectDistrict(districtKey) {
    appState.currentDistrict = districtKey;
    showScreen('routes');
}

function loadRoutes() {
    const title = document.getElementById('routes-title');
    const content = document.getElementById('routes-list');
    
    if (!title || !content || !appState.currentCategory || !appState.currentDistrict) return;
    
    const category = routeData[appState.currentCategory];
    const district = category.districts[appState.currentDistrict];
    
    title.textContent = `${district.name}`;
    content.innerHTML = '';
    
    // Используем сохраненные фильтры или значения по умолчанию
    const filters = appState.filters || { time: 5, distance: 10, price: 10000 };
    const timeFilter = filters.time;
    const distanceFilter = filters.distance;
    const priceFilter = filters.price;
    
    let filteredRoutes = district.routes.filter(route => 
        route.time <= timeFilter && 
        route.distance <= distanceFilter && 
        route.price <= priceFilter
    );
    
    if (filteredRoutes.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-route"></i>
                <p>Маршруты не найдены</p>
                <p>Попробуйте изменить параметры фильтров</p>
                <button class="btn" onclick="resetFilters()">
                    <i class="fas fa-redo"></i> Сбросить фильтры
                </button>
            </div>
        `;
        return;
    }
    
    let delay = 0.1;
    filteredRoutes.forEach(route => {
        const routeElement = document.createElement('div');
        routeElement.className = 'route-card fade-in';
        routeElement.style.animationDelay = `${delay}s`;
        routeElement.onclick = () => selectRoute(route);
        
        // Проверяем, есть ли в избранном
        const isFavorite = appState.favorites.some(fav => fav.id === route.id);
        
        routeElement.innerHTML = `
            <div class="route-card-header">
                <div class="route-title-section">
                    <h3>${route.name}</h3>
                    <span class="route-rating">
                        <i class="fas fa-star"></i> ${route.rating}
                    </span>
                </div>
                ${isFavorite ? '<div class="route-favorite active"><i class="fas fa-heart"></i></div>' : ''}
            </div>
            <p class="route-description">${route.description}</p>
            <div class="route-stats">
                <div class="route-stat">
                    <i class="fas fa-clock"></i>
                    <span>${route.time} ч</span>
                </div>
                <div class="route-stat">
                    <i class="fas fa-route"></i>
                    <span>${route.distance} км</span>
                </div>
                <div class="route-stat">
                    <i class="fas fa-wallet"></i>
                    <span>${route.price} ₽</span>
                </div>
            </div>
        `;
        
        content.appendChild(routeElement);
        delay += 0.1;
    });
}

function selectRoute(route) {
    appState.currentRoute = route;
    showScreen('route-details');
}

function loadRouteDetails() {
    const title = document.getElementById('route-details-title');
    const content = document.getElementById('route-details-content');
    
    if (!title || !content || !appState.currentRoute) return;
    
    const route = appState.currentRoute;
    const isFavorite = appState.favorites.some(fav => fav.id === route.id);
    
    title.textContent = route.name;
    
    content.innerHTML = `
        <div class="route-details-container">
            <div class="route-main-info">
                <div class="route-main-header">
                    <h3>${route.name}</h3>
                    <div class="route-main-rating">
                        <span class="rating-stars">
                            ${getStarRating(route.rating)}
                        </span>
                        <span class="rating-text">${route.rating}/5 (${route.reviews} отзывов)</span>
                    </div>
                </div>
                <p class="route-main-description">${route.description}</p>
                
                <div class="route-details-grid">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Время</span>
                            <span class="detail-value">${route.time} часа</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-route"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Дистанция</span>
                            <span class="detail-value">${route.distance} км</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Бюджет</span>
                            <span class="detail-value">${route.price} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="route-places-section">
                <h3 class="section-title">
                    <i class="fas fa-map-marker-alt"></i>
                    Ключевые точки маршрута
                </h3>
                <div class="places-list">
                    ${route.places.map((place, index) => `
                        <div class="place-item">
                            <div class="place-number">${index + 1}</div>
                            <div class="place-content">
                                <h4 class="place-name">${place.name}</h4>
                                <p class="place-description">${place.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="route-actions-section">
                <button class="btn btn-primary btn-start" onclick="startNavigation()">
                    <i class="fas fa-play"></i>
                    <span>Начать навигацию</span>
                </button>
                <div class="action-buttons">
                    <button class="btn-action ${isFavorite ? 'active' : ''}" onclick="toggleFavorite()">
                        <i class="fas fa-heart"></i>
                        <span>${isFavorite ? 'В избранном' : 'В избранное'}</span>
                    </button>
                    <button class="btn-action" onclick="shareRoute()">
                        <i class="fas fa-share-alt"></i>
                        <span>Поделиться</span>
                    </button>
                </div>
                <button class="btn btn-secondary btn-back" onclick="showScreen('routes')">
                    <i class="fas fa-arrow-left"></i>
                    <span>Назад к маршрутам</span>
                </button>
            </div>
        </div>
    `;
}

function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// ===== ФИЛЬТРЫ =====
function initFilters() {
    // Устанавливаем значения фильтров из состояния
    updateFilterValue('time', appState.filters.time);
    updateFilterValue('distance', appState.filters.distance);
    updateFilterValue('price', appState.filters.price);
    
    // Устанавливаем значения слайдеров
    document.getElementById('filter-time').value = appState.filters.time;
    document.getElementById('filter-distance').value = appState.filters.distance;
    document.getElementById('filter-price').value = appState.filters.price;
}

function toggleFilters() {
    const filtersPanel = document.getElementById('filters-panel');
    if (!filtersPanel) return;
    
    if (filtersPanel.style.display === 'none' || filtersPanel.style.display === '') {
        filtersPanel.style.display = 'block';
        setTimeout(() => {
            filtersPanel.classList.add('active');
        }, 10);
    } else {
        filtersPanel.classList.remove('active');
        setTimeout(() => {
            filtersPanel.style.display = 'none';
        }, 300);
    }
}

function updateFilterValue(type, value) {
    const valueElement = document.getElementById(`filter-${type}-value`);
    if (!valueElement) return;
    
    if (type === 'time') {
        valueElement.textContent = `${value} ч`;
    } else if (type === 'distance') {
        valueElement.textContent = `${value} км`;
    } else if (type === 'price') {
        valueElement.textContent = `${parseInt(value).toLocaleString('ru-RU')} ₽`;
    }
}

function resetFilters() {
    // Сбрасываем фильтры к значениям по умолчанию
    appState.filters = { time: 5, distance: 10, price: 10000 };
    
    // Обновляем UI слайдеров
    document.getElementById('filter-time').value = 5;
    document.getElementById('filter-distance').value = 10;
    document.getElementById('filter-price').value = 10000;
    
    // Обновляем отображаемые значения
    updateFilterValue('time', 5);
    updateFilterValue('distance', 10);
    updateFilterValue('price', 10000);
    
    // Применяем фильтры
    applyFilters();
    
    // Закрываем панель фильтров
    toggleFilters();
    
    showNotification('Фильтры сброшены');
}

function applyFilters() {
    // Сохраняем текущие значения фильтров
    const timeFilter = parseFloat(document.getElementById('filter-time').value);
    const distanceFilter = parseFloat(document.getElementById('filter-distance').value);
    const priceFilter = parseFloat(document.getElementById('filter-price').value);
    
    appState.filters = {
        time: timeFilter,
        distance: distanceFilter,
        price: priceFilter
    };
    
    // Обновляем список маршрутов
    if (appState.currentScreen === 'routes') {
        loadRoutes();
    }
    
    // Закрываем панель фильтров
    toggleFilters();
    
    showNotification(`Применены фильтры: ${timeFilter} ч, ${distanceFilter} км, ${priceFilter} ₽`);
}

// ===== ИЗБРАННОЕ =====
function updateFavoritesCount() {
    const countElement = document.getElementById('favorites-count');
    if (countElement) {
        const count = appState.favorites.length;
        countElement.textContent = count > 0 ? count : '';
        countElement.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

function loadFavoritesScreen() {
    const content = document.getElementById('favorites-list');
    if (!content) return;
    
    if (appState.favorites.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>У вас пока нет избранных маршрутов</p>
                <p>Добавляйте маршруты, нажимая на сердечко</p>
                <button class="btn" onclick="showScreen('categories')">
                    <i class="fas fa-route"></i> Найти маршруты
                </button>
            </div>
        `;
        return;
    }
    
    content.innerHTML = '';
    
    appState.favorites.forEach((route, index) => {
        const routeElement = document.createElement('div');
        routeElement.className = 'route-card fade-in';
        routeElement.style.animationDelay = `${index * 0.1}s`;
        routeElement.onclick = () => {
            appState.currentRoute = route;
            showScreen('route-details');
        };
        
        routeElement.innerHTML = `
            <div class="route-card-header">
                <div class="route-title-section">
                    <h3>${route.name}</h3>
                    <span class="route-rating">
                        <i class="fas fa-star"></i> ${route.rating}
                    </span>
                </div>
                <div class="route-favorite active">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <p class="route-description">${route.description}</p>
            <div class="route-stats">
                <div class="route-stat">
                    <i class="fas fa-clock"></i>
                    <span>${route.time} ч</span>
                </div>
                <div class="route-stat">
                    <i class="fas fa-route"></i>
                    <span>${route.distance} км</span>
                </div>
                <div class="route-stat">
                    <i class="fas fa-wallet"></i>
                    <span>${route.price} ₽</span>
                </div>
            </div>
            <div class="route-actions">
                <button class="btn btn-small btn-remove" onclick="removeFromFavorites('${route.id}', event)">
                    <i class="fas fa-trash"></i>
                    <span>Удалить</span>
                </button>
            </div>
        `;
        
        content.appendChild(routeElement);
    });
}

function toggleFavorite() {
    if (!appState.currentRoute) return;
    
    const route = appState.currentRoute;
    const index = appState.favorites.findIndex(fav => fav.id === route.id);
    
    if (index === -1) {
        // Добавляем в избранное
        appState.favorites.push(route);
        showNotification('Маршрут добавлен в избранное!');
    } else {
        // Удаляем из избранного
        appState.favorites.splice(index, 1);
        showNotification('Маршрут удален из избранного');
    }
    
    // Сохраняем изменения
    saveFavorites();
    
    // Обновляем UI
    updateFavoritesCount();
    
    // Перезагружаем текущий экран
    if (appState.currentScreen === 'route-details') {
        loadRouteDetails();
    } else if (appState.currentScreen === 'favorites') {
        loadFavoritesScreen();
    }
}

function removeFromFavorites(routeId, event) {
    event.stopPropagation(); // Предотвращаем переход на детали маршрута
    
    const index = appState.favorites.findIndex(fav => fav.id === routeId);
    if (index !== -1) {
        appState.favorites.splice(index, 1);
        saveFavorites();
        updateFavoritesCount();
        loadFavoritesScreen();
        showNotification('Маршрут удален из избранного');
    }
}

// ===== НАСТРОЙКИ =====
function loadSettingsScreen() {
    // Устанавливаем значения переключателей
    document.getElementById('dark-mode').checked = appState.settings.darkMode;
    document.getElementById('notifications').checked = appState.settings.notifications;
    document.getElementById('sounds').checked = appState.settings.sounds;
    document.getElementById('walking-speed').value = appState.settings.walkingSpeed;
}

function toggleDarkMode() {
    const isDarkMode = document.getElementById('dark-mode').checked;
    appState.settings.darkMode = isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function toggleSetting(settingName) {
    appState.settings[settingName] = document.getElementById(settingName).checked;
}

function changeWalkingSpeed() {
    appState.settings.walkingSpeed = document.getElementById('walking-speed').value;
}

function clearAppData() {
    if (confirm('Вы уверены, что хотите очистить все данные? Будут удалены настройки и избранное.')) {
        localStorage.removeItem('shaggi_settings');
        localStorage.removeItem('shaggi_favorites');
        localStorage.removeItem('shaggi_user_data');
        
        // Сбрасываем состояние
        appState.settings = {
            darkMode: false,
            notifications: true,
            sounds: true,
            walkingSpeed: 'normal'
        };
        appState.favorites = [];
        
        // Обновляем UI
        showNotification('Данные очищены');
        updateFavoritesCount();
        
        if (appState.currentScreen === 'favorites') {
            loadFavoritesScreen();
        }
        
        if (appState.currentScreen === 'settings') {
            loadSettingsScreen();
        }
    }
}

// ===== ДЕЙСТВИЯ С МАРШРУТАМИ =====
function startNavigation() {
    if (!appState.currentRoute) return;
    
    const route = appState.currentRoute;
    
    // Отправляем событие в Telegram
    sendTelegramEvent('navigation_started', {
        route_id: route.id,
        route_name: route.name
    });
    
    // Показываем уведомление
    showNotification(`Начинаем маршрут "${route.name}"!`);
    
    // Если в Telegram, показываем алерт
    if (appState.isTelegram && appState.tg) {
        appState.tg.showAlert(`Маршрут "${route.name}" начат!\nСледуйте указаниям навигатора.`, {
            title: 'ШАГГИ - Навигация'
        });
    } else {
        // В браузере открываем Google Maps с первой точкой
        if (route.places && route.places.length > 0) {
            const firstPlace = route.places[0].name;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(firstPlace + ' Москва')}`;
            window.open(mapsUrl, '_blank');
        }
    }
}

function shareRoute() {
    if (!appState.currentRoute) return;
    
    const route = appState.currentRoute;
    const shareText = `🚶‍♂️ Нашел отличный маршрут в приложении ШАГГИ!\n\n` +
                     `📍 ${route.name}\n` +
                     `📝 ${route.description}\n` +
                     `⭐ Рейтинг: ${route.rating}/5\n` +
                     `⏱️ Время: ${route.time} ч\n` +
                     `📏 Дистанция: ${route.distance} км\n` +
                     `💰 Бюджет: ${route.price} ₽\n\n` +
                     `Попробуй и ты!`;
    
    // Пытаемся использовать Web Share API
    if (navigator.share) {
        navigator.share({
            title: `ШАГГИ: ${route.name}`,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Копируем в буфер обмена
        navigator.clipboard.writeText(shareText)
            .then(() => showNotification('Текст маршрута скопирован в буфер обмена!'))
            .catch(() => {
                // Fallback: показываем текст для копирования
                prompt('Скопируйте текст для分享:', shareText);
            });
    }
    
    // Отправляем событие в Telegram
    sendTelegramEvent('route_shared', {
        route_id: route.id,
        route_name: route.name
    });
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, duration = 3000) {
    // Удаляем старое уведомление если есть
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
        z-index: 9999;
        animation: notificationSlideIn 0.4s ease forwards;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;
    
    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Удаляем через указанное время
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.4s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, duration);
}

// ===== ГЛОБАЛЬНЫЕ ЭКСПОРТЫ =====
// Делаем функции доступными глобально для использования в onclick
window.showScreen = showScreen;
window.goBack = goBack;
window.toggleFavorite = toggleFavorite;
window.startNavigation = startNavigation;
window.shareRoute = shareRoute;
window.saveSettings = saveSettings;
window.toggleDarkMode = toggleDarkMode;
window.toggleSetting = toggleSetting;
window.changeWalkingSpeed = changeWalkingSpeed;
window.clearAppData = clearAppData;
window.toggleFilters = toggleFilters;
window.resetFilters = resetFilters;
window.applyFilters = applyFilters;
window.removeFromFavorites = removeFromFavorites;
window.updateFilterValue = updateFilterValue;

// Инициализация при загрузке
window.addEventListener('load', function() {
    // Добавляем CSS анимации для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationSlideIn {
            0% {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
            100% {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes notificationSlideOut {
            0% {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ ШАГГИ: Приложение полностью загружено и готово к работе!');
});
