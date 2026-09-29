import cardStyles from './CharacterList.module.css'
import styles from './CharacterListSkeleton.module.css'

const CHARACTERS_PER_PAGE = 20

export function CharacterListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Загрузка персонажей"
    >
      <ul
        className={cardStyles.list}
        aria-hidden="true"
      >
        {Array.from({ length: CHARACTERS_PER_PAGE }, (_, index) => (
          <li
            key={index}
            className={`${cardStyles.card} ${styles.pulse}`}
          >
            <div className={cardStyles.image} />
            <div className={cardStyles.body}>
              <div className={styles.name} />
              <div className={styles.meta} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
