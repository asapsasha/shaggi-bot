/**
 * Конфигурация приложения ШАГГИ для Telegram
 * Этот файл содержит все настройки и константы
 */

// Основные настройки приложения
const AppConfig = {
    // Название и версия
    APP_NAME: "ШАГГИ",
    APP_VERSION: "1.0.0",
    
    // Режим отладки (true для разработки, false для продакшена)
    DEBUG_MODE: true,
    
    // Настройки Telegram
    TELEGRAM: {
        // Использовать ли реальный Telegram Web App или эмуляцию
        USE_REAL_TELEGRAM: true,
        
        // Цвета для Telegram (если не использовать тему Telegram)
        DEFAULT_THEME: {
            bg_color: "#18222D",
            text_color: "#ffffff",
            hint_color: "#999999",
            button_color: "#6C5CE7",
            button_text_color: "#ffffff"
        }
    },
    
    // Настройки карт (пока используем заглушки, потом добавим реальный API)
    MAPS: {
        // Режим карт: 'yandex', 'osm', 'static', 'none'
        MODE: 'static',
        
        // Ключ API для Яндекс.Карт (замените на свой)
        YANDEX_API_KEY: '',
        
        // Статические карты (изображения)
        STATIC_MAPS: {
            MOSCOW_CENTER: 'https://static-maps.yandex.ru/1.x/?ll=37.6178,55.7517&z=14&size=650,450&l=map&pt=37.6178,55.7517,pm2rdl',
            PARK_GORKOGO: 'https://static-maps.yandex.ru/1.x/?ll=37.6040,55.7290&z=15&size=650,450&l=map&pt=37.6040,55.7290,pm2rdl'
        }
    },
    
    // Настройки API (если будете подключать бэкенд)
    API: {
        BASE_URL: 'https://ваш-сервер.ru/api',
        TIMEOUT: 10000,
        
        // Заглушки для демо-режима
        USE_MOCK_DATA: true,
        MOCK_DELAY: 1000
    },
    
    // Настройки кеширования
    CACHE: {
        ENABLED: true,
        DURATION: 60 * 60 * 1000, // 1 час в миллисекундах
        VERSION: 'v1'
    },
    
    // Тексты и сообщения
    TEXTS: {
        LOADING: "Загрузка приложения...",
        ERROR_TITLE: "Ошибка",
        CONNECTION_ERROR: "Нет соединения с интернетом",
        RETRY_BUTTON: "Повторить",
        EXIT_BUTTON: "Выйти"
    }
};

// Утилиты для работы с конфигурацией
const ConfigUtils = {
    // Проверка, запущено ли в Telegram
    isInTelegram: function() {
        if (AppConfig.DEBUG_MODE && !AppConfig.TELEGRAM.USE_REAL_TELEGRAM) {
            return false; // Для тестирования в браузере
        }
        return typeof window.Telegram !== 'undefined' && 
               typeof window.Telegram.WebApp !== 'undefined';
    },
    
    // Получение текущей темы
    getTheme: function() {
        if (this.isInTelegram()) {
            const tg = window.Telegram.WebApp;
            return tg.themeParams || AppConfig.TELEGRAM.DEFAULT_THEME;
        }
        return AppConfig.TELEGRAM.DEFAULT_THEME;
    },
    
    // Получение данных пользователя
    getUserData: function() {
        if (this.isInTelegram()) {
            const tg = window.Telegram.WebApp;
            return tg.initDataUnsafe.user || null;
        }
        
        // Демо-данные для тестирования
        return {
            id: 123456789,
            first_name: "Тестовый",
            last_name: "Пользователь",
            username: "test_user",
            language_code: "ru"
        };
    },
    
    // Логирование в консоль (только в debug режиме)
    log: function(message, data = null) {
        if (AppConfig.DEBUG_MODE) {
            console.log(`[ШАГГИ] ${message}`, data || '');
        }
    },
    
    // Логирование ошибок
    error: function(message, error = null) {
        console.error(`[ШАГГИ] ОШИБКА: ${message}`, error || '');
    },
    
    // Генерация уникального ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Экспорт для использования в других файлах
if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
    window.ConfigUtils = ConfigUtils;
}

// Сообщение о загрузке конфигурации
if (AppConfig.DEBUG_MODE) {
    console.log('✅ Конфигурация ШАГГИ загружена');
    console.log('Версия:', AppConfig.APP_VERSION);
    console.log('Режим отладки:', AppConfig.DEBUG_MODE);
}
// В config.js убедитесь, что DEBUG_MODE выключен для продакшена
DEBUG_MODE: false,

// И USE_REAL_TELEGRAM включен
USE_REAL_TELEGRAM: true,