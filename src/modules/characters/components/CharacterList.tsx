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
            loading="lazy"
          />
          <h2 className={styles.name}>{character.name}</h2>
          <p className={styles.meta}>
            {character.status}
            {' '}
            ·
            {' '}
            {character.species}
          </p>
        </li>
      ))}
    </ul>
  )
}
