// Импортируем необходимые хуки из React
import { useState, useEffect, useCallback } from 'react';

// Импортируем настроенный экземпляр axios для HTTP-запросов
import apiClient from '../api/axios.js';

// Создаем кастомный хук usePosts для управления состоянием постов
// Хук принимает параметры:
// currentPage - текущая страница пагинации (по умолчанию 1)
// postsPerPage - количество постов на странице (по умолчанию 10)
// selectedUserId - ID выбранного пользователя для фильтрации (по умолчанию пустая строка)
const usePosts = (currentPage = 1, postsPerPage = 10, selectedUserId = '') => {
  
  // Состояние для хранения массива постов
  const [posts, setPosts] = useState([]);
  
  // Состояние для отслеживания процесса загрузки
  const [loading, setLoading] = useState(false);
  
  // Состояние для хранения ошибок, если они возникают
  const [error, setError] = useState(null);
  
  // Состояние для хранения общего количества постов (для пагинации)
  const [totalPosts, setTotalPosts] = useState(0);

  // Создаем мемоизированную функцию для получения постов
  // useCallback предотвращает повторное создание функции при каждом рендере
  const fetchPosts = useCallback(async () => {
    // Устанавливаем состояние загрузки в true
    setLoading(true);
    
    // Сбрасываем ошибки перед новым запросом
    setError(null);

    try {
      // Подготавливаем параметры запроса
      const params = {
        // Вычисляем начальный индекс для пагинации
        _start: (currentPage - 1) * postsPerPage,
        
        // Устанавливаем лимит постов на странице
        _limit: postsPerPage,
      };

      // Если выбран конкретный пользователь, добавляем фильтр по userId
      if (selectedUserId) {
        params.userId = selectedUserId;
      }

      // Выполняем GET-запрос к API для получения постов
      const response = await apiClient.get('/posts', { params });
      
      // Обновляем состояние с полученными постами
      setPosts(response.data);
      
      // Получаем общее количество постов для корректной работы пагинации
      if (selectedUserId) {
        // Если фильтр по пользователю применен, получаем общее количество постов этого пользователя
        const totalResponse = await apiClient.get('/posts', {
          params: { userId: selectedUserId }
        });
        setTotalPosts(totalResponse.data.length);
      } else {
        // JSONPlaceholder имеет фиксированное количество постов - 100
        setTotalPosts(100);
      }
    } catch (err) {
      // В случае ошибки устанавливаем сообщение об ошибке
      setError(err.message || 'Произошла ошибка при загрузке постов');
      
      // Сбрасываем посты и общее количество
      setPosts([]);
      setTotalPosts(0);
    } finally {
      // В любом случае (успех или ошибка) снимаем флаг загрузки
      setLoading(false);
    }
  }, [currentPage, postsPerPage, selectedUserId]); // Зависимости для useCallback

  // Используем useEffect для автоматического вызова fetchPosts при изменении зависимостей
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // Зависимость - мемоизированная функция fetchPosts

  // Функция для ручного обновления постов
  const refetch = () => {
    fetchPosts();
  };

  // Возвращаем объект с состояниями и функциями для использования в компонентах
  return {
    posts,        // Массив постов
    loading,      // Флаг загрузки
    error,        // Сообщение об ошибке
    totalPosts,   // Общее количество постов
    refetch,      // Функция для принудительного обновления данных
  };
};

// Экспортируем хук для использования в других компонентах
export default usePosts;








