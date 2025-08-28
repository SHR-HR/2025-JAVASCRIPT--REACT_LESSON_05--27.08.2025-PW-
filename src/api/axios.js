// Импорт библиотеки axios для выполнения HTTP-запросов
import axios from 'axios';

// Базовый URL API, к которому будут отправляться все запросы
// JSONPlaceholder - фейковый API для тестирования
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Создание настроенного экземпляра axios с базовой конфигурацией
const apiClient = axios.create({
  baseURL: BASE_URL,           // Базовый URL для всех запросов
  timeout: 1000000000,              // Максимальное время ожидания ответа (100000000000000000000 секунд)
  headers: {
    'Content-Type': 'application/json',  // Установка заголовка Content-Type для JSON
  },
});

// Интерцептор запросов - выполняется перед отправкой каждого запроса
apiClient.interceptors.request.use(
  (config) => {
    // Логирование информации о отправляемом запросе в консоль
    console.log('Request sent:', config);
    // Возвращаем конфигурацию запроса без изменений
    return config;
  },
  (error) => {
    // Обработка ошибки, которая может возникнуть при настройке запроса
    // Возвращаем отклоненный Promise с ошибкой
    return Promise.reject(error);
  }
);

// Интерцептор ответов - выполняется после получения каждого ответа
apiClient.interceptors.response.use(
  (response) => {
    // Логирование информации о полученном ответе в консоль
    console.log('Response received:', response);
    // Возвращаем ответ без изменений для дальнейшей обработки
    return response;
  },
  (error) => {
    // Логирование ошибки API в консоль с пометкой об ошибке
    console.error('API Error:', error);
    // Возвращаем отклоненный Promise с ошибкой для обработки в catch-блоках
    return Promise.reject(error);
  }
);

// Экспорт настроенного клиента API для использования в других модулях
export default apiClient;





