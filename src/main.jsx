// Импорт StrictMode из React - специального компонента для выявления потенциальных проблем в приложении
import { StrictMode } from 'react';

// Импорт функции createRoot из react-dom/client для создания корневого элемента React 18
import { createRoot } from 'react-dom/client';

// Импорт главного компонента приложения
import App from './App.jsx';

// Импорт глобальных стилей для всего приложения
import './index.scss';

// Создание корневого элемента React и его отрисовка в DOM
// document.getElementById('root') - находим HTML-элемент с id="root" в index.html
createRoot(document.getElementById('root')).render(
  // Оборачиваем приложение в StrictMode для дополнительных проверок в режиме разработки
  // StrictMode помогает обнаружить устаревшие API, небезопасные методы жизненного цикла и другие проблемы
  <StrictMode>
    {/* Рендерим главный компонент приложения */}
    <App />
  </StrictMode>,
);


