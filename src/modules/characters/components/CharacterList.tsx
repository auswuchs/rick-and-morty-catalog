import { STATUS_LABELS } from '~/modules/characters/services/CharacterStatusLabels'
import type { Character } from '~/modules/characters/types'

import styles from './CharacterList.module.css'

export function CharacterList({ characters }: { characters: Character[] }) {
  return (
    <ul className={styles.list}>
      {characters.map((character) => (
        <li
          key={character.id}
          className={styles.card}
        >
          <img
            className={styles.image}
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            loading="lazy"
          />
          <div className={styles.body}>
            <h2 className={styles.name}>{character.name}</h2>
            <p className={styles.status}>
              <span
                className={`${styles.dot} ${styles[character.status]}`}
                aria-hidden="true"
              />
              {STATUS_LABELS[character.status]}
            </p>
            <p className={styles.species}>{character.species}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
