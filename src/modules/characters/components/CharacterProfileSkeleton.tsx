import listSkeletonStyles from './CharacterListSkeleton.module.css'
import profileStyles from './CharacterProfile.module.css'
import styles from './CharacterProfileSkeleton.module.css'

export function CharacterProfileSkeleton() {
  return (
    <div
      className={`${profileStyles.profile} ${listSkeletonStyles.pulse}`}
      role="status"
      aria-label="Загрузка персонажа"
    >
      <div className={styles.image} />
      <div className={profileStyles.info}>
        <div className={styles.title} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  )
}
