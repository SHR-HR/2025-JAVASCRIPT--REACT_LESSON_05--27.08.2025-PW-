// Импорт функции defineConfig из Vite для типизированной конфигурации
import { defineConfig } from 'vite'

// Импорт плагина React для Vite, который обеспечивает поддержку React
import react from '@vitejs/plugin-react'

// Экспорт конфигурации по умолчанию для Vite
// https://vitejs.dev/config/ - ссылка на документацию по конфигурации Vite
export default defineConfig({
  // Массив плагинов, которые будут использоваться в проекте
  plugins: [
    // Вызов функции react() для создания экземпляра плагина React
    // Этот плагин обеспечивает:
    // - Быстрое обновление без перезагрузки страницы (HMR)
    // - Поддержку JSX
    // - Оптимизацию сборки для React
    react()
  ],
})





