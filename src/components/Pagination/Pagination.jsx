// Импорт стилей из SCSS модуля для компонента Pagination
import styles from './Pagination.module.scss';

// Компонент Pagination для отображения и управления пагинацией
const Pagination = ({ 
  currentPage,     // Текущая активная страница (принимается из props)
  totalPosts,      // Общее количество постов (принимается из props)
  postsPerPage,    // Количество постов на одной странице (принимается из props)
  onPageChange     // Функция-колбэк для изменения текущей страницы (принимается из props)
}) => {
  // Вычисление общего количества страниц
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Проверка возможности перехода на предыдущую страницу
  const canGoPrev = currentPage > 1;
  // Проверка возможности перехода на следующую страницу
  const canGoNext = currentPage < totalPages;

  // Обработчик клика по кнопке "Назад"
  const handlePrevClick = () => {
    // Проверяем, можно ли перейти на предыдущую страницу
    if (canGoPrev) {
      // Вызываем колбэк с номером предыдущей страницы
      onPageChange(currentPage - 1);
    }
  };

  // Обработчик клика по кнопке "Вперёд"
  const handleNextClick = () => {
    // Проверяем, можно ли перейти на следующую страницу
    if (canGoNext) {
      // Вызываем колбэк с номером следующей страницы
      onPageChange(currentPage + 1);
    }
  };

  // Если всего одна страница или меньше - не показываем пагинацию
  if (totalPages <= 1) {
    return null;
  }

  // Возвращаем JSX разметку компонента пагинации
  return (
    <div className={styles.pagination}>
      {/* Блок с информацией о текущей странице и общем количестве постов */}
      <div className={styles.info}>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <span>
          Всего постов: {totalPosts}
        </span>
      </div>
      
      {/* Блок управления пагинацией (кнопки и номера страниц) */}
      <div className={styles.controls}>
        {/* Кнопка перехода на предыдущую страницу */}
        <button
          className={`${styles.button} ${styles.prevButton}`} // Комбинируем классы
          onClick={handlePrevClick}                          // Обработчик клика
          disabled={!canGoPrev}                              // Отключаем если нельзя перейти
        >
          ← Назад {/* Стрелка влево и текст */}
        </button>
        
        {/* Блок с номерами страниц */}
        <div className={styles.pageNumbers}>
          {/* Создаем массив страниц и маппим их на кнопки/элементы */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;                       // Номер страницы (начинается с 1)
            const isCurrentPage = pageNum === currentPage;   // Проверка текущей страницы
            // Определяем, нужно ли показывать эту страницу
            const shouldShow = 
              pageNum === 1 ||                               // Всегда показываем первую страницу
              pageNum === totalPages ||                      // Всегда показываем последнюю страницу
              Math.abs(pageNum - currentPage) <= 2;          // Показываем страницы в радиусе 2 от текущей

            // Если страницу не нужно показывать
            if (!shouldShow) {
              // Проверяем, нужно ли вставить многоточие вместо пропущенных страниц
              if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                return <span key={pageNum} className={styles.ellipsis}>...</span>;
              }
              return null; // Не отображаем эту страницу
            }

            // Возвращаем кнопку страницы
            return (
              <button
                key={pageNum}                                // Уникальный ключ для React
                className={`${styles.pageButton} ${isCurrentPage ? styles.active : ''}`} // Классы с условием
                onClick={() => onPageChange(pageNum)}        // Обработчик клика по странице
                disabled={isCurrentPage}                     // Отключаем текущую страницу
              >
                {pageNum}                                    {/* Отображаем номер страницы */}
              </button>
            );
          })}
        </div>
        
        {/* Кнопка перехода на следующую страницу */}
        <button
          className={`${styles.button} ${styles.nextButton}`} // Комбинируем классы
          onClick={handleNextClick}                          // Обработчик клика
          disabled={!canGoNext}                              // Отключаем если нельзя перейти
        >
          Вперёд → {/* Текст и стрелка вправо */}
        </button>
      </div>
    </div>
  );
};

// Экспорт компонента Pagination по умолчанию
export default Pagination;




