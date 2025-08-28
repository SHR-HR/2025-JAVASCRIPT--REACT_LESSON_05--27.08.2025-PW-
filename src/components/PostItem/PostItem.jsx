// Импорт стилей из SCSS модуля для компонента PostItem
import styles from './PostItem.module.scss';

// Компонент PostItem для отображения отдельного поста
const PostItem = ({ post }) => {
  // Возвращаем JSX разметку компонента поста
  return (
    // Основной контейнер поста
    <div className={styles.postItem}>
      {/* Шапка поста с заголовком и информацией о пользователе */}
      <div className={styles.header}>
        {/* Заголовок поста */}
        <h3 className={styles.title}>{post.title}</h3>
        {/* Блок с идентификатором пользователя */}
        <span className={styles.userId}>Пользователь: {post.userId}</span>
      </div>
      {/* Текст тела поста */}
      <p className={styles.body}>{post.body}</p>
    </div>
  );
};

// Экспорт компонента PostItem по умолчанию
export default PostItem;





