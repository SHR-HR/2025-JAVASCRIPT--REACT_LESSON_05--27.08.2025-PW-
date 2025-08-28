// Импорт необходимых модулей из React
import { useState, useEffect } from 'react';
// Импорт стилей из SCSS модуля
import styles from './Filter.module.scss';

// Компонент Filter для фильтрации данных по ID пользователя
const Filter = ({ selectedUserId, onUserIdChange }) => {
  // Создание состояния для значения input поля
  const [inputValue, setInputValue] = useState(selectedUserId || '');

  // Эффект для синхронизации значения input с внешним состоянием selectedUserId
  useEffect(() => {
    // Устанавливаем значение input равным selectedUserId или пустой строке если undefined/null
    setInputValue(selectedUserId || '');
  }, [selectedUserId]); // Зависимость - selectedUserId, эффект срабатывает при его изменении

  // Обработчик изменения значения в input поле
  const handleInputChange = (e) => {
    // Получаем текущее значение из input поля
    const value = e.target.value;
    // Обновляем состояние inputValue
    setInputValue(value);
    
    // Проверяем, что введенное значение является числом от 1 до 10 или пустой строкой
    if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
      // Вызываем колбэк-функцию onUserIdChange с новым значением
      onUserIdChange(value);
    }
  };

  // Обработчик очистки фильтра
  const handleClear = () => {
    // Сбрасываем значение input поля на пустую строку
    setInputValue('');
    // Вызываем колбэк-функцию с пустой строкой для сброса фильтра
    onUserIdChange('');
  };

  // Создание массива опций пользователей от 1 до 10
  const userOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Возвращаем JSX разметку компонента
  return (
    <div className={styles.filter}>
      {/* Группа основного фильтра */}
      <div className={styles.filterGroup}>
        {/* Лейбл для input поля */}
        <label htmlFor="userId" className={styles.label}>
          Фильтр по пользователю:
        </label>
        {/* Группа input поля с кнопкой очистки */}
        <div className={styles.inputGroup}>
          {/* Input поле для ввода ID пользователя */}
          <input
            type="number"              // Тип поля - число
            id="userId"                // ID для связи с лейблом
            min="1"                    // Минимальное значение
            max="10"                   // Максимальное значение
            value={inputValue}         // Текущее значение из состояния
            onChange={handleInputChange} // Обработчик изменения значения
            placeholder="Введите ID пользователя (1-10)" // Подсказка в пустом поле
            className={styles.input}   // CSS класс для стилизации
          />
          {/* Кнопка очистки, показывается только когда есть значение в input */}
          {inputValue && (
            <button
              type="button"            // Тип кнопки - button (не submit)
              onClick={handleClear}    // Обработчик клика по кнопке
              className={styles.clearButton} // CSS класс для стилизации
              title="Очистить фильтр"  // Всплывающая подсказка
            >
              × {/* Символ крестика для очистки */}
            </button>
          )}
        </div>
      </div>

      {/* Группа быстрых фильтров */}
      <div className={styles.quickFilters}>
        {/* Лейбл для быстрых кнопок */}
        <span className={styles.quickLabel}>Быстрый выбор:</span>
        {/* Контейнер для кнопок быстрого выбора */}
        <div className={styles.quickButtons}>
          {/* Маппинг массива опций пользователей на кнопки */}
          {userOptions.map((userId) => (
            <button
              key={userId}             // Уникальный ключ для React
              onClick={() => {         // Обработчик клика по кнопке
                setInputValue(String(userId)); // Устанавливаем значение input
                onUserIdChange(String(userId)); // Вызываем колбэк с ID пользователя
              }}
              // Динамическое добавление класса active для активной кнопки
              className={`${styles.quickButton} ${
                String(userId) === selectedUserId ? styles.active : ''
              }`}
            >
              {/* Отображение номера пользователя на кнопке */}
              {userId}
            </button>
          ))}
        </div>
      </div>

      {/* Блок активного фильтра, показывается только когда фильтр применен */}
      {selectedUserId && (
        <div className={styles.activeFilter}>
          {/* Текст с информацией о активном фильтре */}
          <span className={styles.activeText}>
            Показаны посты пользователя #{selectedUserId}
          </span>
          {/* Кнопка для сброса фильтра */}
          <button onClick={handleClear} className={styles.removeFilter}>
            Показать все
          </button>
        </div>
      )}
    </div>
  );
};

// Экспорт компонента Filter по умолчанию
export default Filter;







