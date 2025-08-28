// Импортируем хук useState из React для управления состоянием компонента
import { useState } from 'react';

// Импортируем компоненты приложения
import PostList from './components/PostList/PostList.jsx'; // Компонент для отображения списка постов
import Pagination from './components/Pagination/Pagination.jsx'; // Компонент пагинации
import Filter from './components/Filter/Filter.jsx'; // Компонент фильтрации
import usePosts from './hooks/usePosts.jsx'; // Кастомный хук для работы с постами
import styles from './App.module.scss'; // Импортируем SCSS модуль для стилей

// Основной компонент приложения
function App() {
  // Состояние для текущей страницы пагинации (начальное значение - 1)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Состояние для ID выбранного пользователя (начальное значение - пустая строка)
  const [selectedUserId, setSelectedUserId] = useState('');
  
  // Константа для количества постов на одной странице
  const postsPerPage = 10;

  // Используем кастомный хук usePosts для получения данных о постах
  // Хук возвращает объект с данными и методами:
  const { 
    posts,         // Массив постов
    loading,       // Флаг загрузки
    error,         // Сообщение об ошибке (если есть)
    totalPosts,    // Общее количество постов
    refetch        // Функция для повторной загрузки данных
  } = usePosts(
    currentPage,     // Текущая страница
    postsPerPage,    // Постов на странице
    selectedUserId   // ID выбранного пользователя для фильтрации
  );

  // Обработчик изменения страницы пагинации
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Устанавливаем новую текущую страницу
    
    // Плавная прокрутка страницы к верху при изменении страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Обработчик изменения фильтра по пользователю
  const handleUserIdChange = (userId) => {
    setSelectedUserId(userId); // Устанавливаем новый ID пользователя
    
    // Сбрасываем текущую страницу на первую при изменении фильтра
    // Это нужно потому что при фильтрации количество страниц может измениться
    setCurrentPage(1);
  };

  // Обработчик обновления данных
  const handleRefresh = () => {
    refetch(); // Вызываем функцию повторной загрузки данных из хука
  };

  // Рендеринг компонента
  return (
    // Основной контейнер приложения
    <div className={styles.app}>
      
      {/* Шапка приложения */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Заголовок приложения с эмодзи */}
          <h1 className={styles.title}>
            📝 Менеджер постов
          </h1>
          
          {/* Подзаголовок с описанием функционала */}
          <p className={styles.subtitle}>
            Просматривайте посты с JSONPlaceholder API с пагинацией и фильтрацией
          </p>
          
          {/* Кнопка обновления данных */}
          <button 
            className={styles.refreshButton} // Стилизованная кнопка
            onClick={handleRefresh}          // Обработчик клика
            disabled={loading}               // Отключаем кнопку во время загрузки
          >
            🔄 Обновить {/* Текст кнопки с эмодзи */}
          </button>
        </div>
      </header>

      {/* Основное содержимое приложения */}
      <main className={styles.main}>
        <div className={styles.container}>
          
          {/* Компонент фильтрации по пользователю */}
          <Filter
            selectedUserId={selectedUserId}     // Текущий выбранный ID пользователя
            onUserIdChange={handleUserIdChange} // Обработчик изменения фильтра
          />

          {/* Компонент списка постов */}
          <PostList
            posts={posts}    // Массив постов для отображения
            loading={loading} // Флаг загрузки
            error={error}    // Сообщение об ошибке
          />

          {/* Компонент пагинации */}
          <Pagination
            currentPage={currentPage}       // Текущая страница
            totalPosts={totalPosts}         // Общее количество постов
            postsPerPage={postsPerPage}     // Постов на странице
            onPageChange={handlePageChange} // Обработчик изменения страницы
          />
        </div>
      </main>

      {/* Подвал приложения */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            Создано с использованием{' '}
            {/* Ссылка на документацию React */}
            <a 
              href="https://react.dev" 
              target="_blank"               // Открывать в новой вкладке
              rel="noopener noreferrer"     // Безопасность для target="_blank"
            >
              React
            </a>
            {' '}и{' '}
            {/* Ссылка на JSONPlaceholder API */}
            <a 
              href="https://jsonplaceholder.typicode.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              JSONPlaceholder API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Экспортируем компонент для использования в других частях приложения
export default App;





