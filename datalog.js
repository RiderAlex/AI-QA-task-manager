// datadog-logs.js
// Подключение Datadog Browser Logs через CDN

// Проверяем, что библиотека уже загружена
if (window.datadogLogs) {
    datadogLogs.init({
        clientToken: 'pub4dc5d836dac2063bedb50be0f5a47170',       // сюда вставляешь свой Client Token
        site: 'datadoghq.eu',       // или datadoghq.com
        forwardErrorsToLogs: true,  // ловим JS ошибки автоматически
        sessionSampleRate: 100,     // процент сессий, которые логируем
        service: 'my-web-app',      // имя вашего сайта/сервиса
        env: 'production',          // окружение
        version: '1.0.0'            // версия сайта
    });

    // Пример пользовательского события
    // Можно добавлять любое событие, например клики
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            datadogLogs.logger.info('Button clicked', {
                text: e.target.innerText,
                id: e.target.id || null
            });
        }
    });
} else {
    console.error('Datadog Logs library not loaded');
}