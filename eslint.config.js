// Импорт необходимых модулей для конфигурации ESLint
import js from '@eslint/js' // Базовая конфигурация ESLint от разработчиков
import globals from 'globals' // Пакет для предоставления глобальных переменных различных сред (браузер, node.js и т.д.)
import react from 'eslint-plugin-react' // Плагин ESLint для React
import reactHooks from 'eslint-plugin-react-hooks' // Плагин для правил React Hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Плагин для поддержки React Fast Refresh

// Экспорт конфигурации ESLint по умолчанию
export default [
  // Первый объект конфигурации: настройки игнорирования файлов
  { 
    ignores: ['dist'] // Игнорировать папку 'dist' (обычно содержит собранные для production файлы)
  },
  
  // Второй объект конфигурации: основные настройки для JavaScript и JSX файлов
  {
    // Применять правила ко всем файлам с расширениями .js и .jsx
    files: ['**/*.{js,jsx}'],
    
    // Настройки языка JavaScript
    languageOptions: {
      ecmaVersion: 2020, // Версия ECMAScript (2020 = ES11)
      globals: globals.browser, // Глобальные переменные браузерной среды (window, document и т.д.)
      
      // Настройки парсера
      parserOptions: {
        ecmaVersion: 'latest', // Использовать последнюю версию ECMAScript
        ecmaFeatures: { 
          jsx: true // Включить поддержку JSX
        },
        sourceType: 'module', // Использовать модули ES6 (import/export)
      },
    },
    
    // Настройки для React
    settings: { 
      react: { 
        version: '18.3' // Указание версии React для корректной работы правил линтера
      } 
    },
    
    // Подключаемые плагины
    plugins: {
      react, // Плагин для React
      'react-hooks': reactHooks, // Плагин для React Hooks (правила использования хуков)
      'react-refresh': reactRefresh, // Плагин для React Fast Refresh (горячая перезагрузка)
    },
    
    // Правила ESLint
    rules: {
      // Расширяем базовые рекомендуемые правила ESLint
      ...js.configs.recommended.rules,
      
      // Добавляем рекомендуемые правила для React
      ...react.configs.recommended.rules,
      
      // Добавляем правила для нового JSX-трансформа (начиная с React 17)
      ...react.configs['jsx-runtime'].rules,
      
      // Добавляем рекомендуемые правила для React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // Отключаем правило, запрещающее target="_blank" без rel="noreferrer"
      'react/jsx-no-target-blank': 'off',
      
      // Специальное правило для React Refresh
      'react-refresh/only-export-components': [
        'warn', // Уровень правила: предупреждение (не ошибка)
        { 
          allowConstantExport: true // Разрешать экспорт констант кроме компонентов
        },
      ],
    },
  },
]




