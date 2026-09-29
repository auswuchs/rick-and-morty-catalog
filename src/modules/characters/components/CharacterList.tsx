import { Link } from 'react-router'

import { Routes } from '~/enums/Routes'
import { CharacterStatusBadge } from '~/modules/characters/components/CharacterStatusBadge'
import type { Character } from '~/modules/characters/types'
import { FavoriteButton } from '~/modules/favorites/components/FavoriteButton'
import { FROM_APP_STATE } from '~/services/NavigationState'

import styles from './CharacterList.module.css'

export function CharacterList({ characters }: { characters: Character[] }) {
  return (
    <ul className={styles.list}>
      {characters.map((character) => (
        <li
          key={character.id}
          className={styles.card}
        >
          <Link
            className={styles.link}
            to={Routes.CharacterDetail(character.id)}
            state={FROM_APP_STATE}
          >
            <img
              className={styles.image}
              src={character.image}
              alt=""
              width={300}
              height={300}
              loading="lazy"
            />
            <div className={styles.body}>
              <h2 className={styles.name}>{character.name}</h2>
              <p className={styles.status}>
                <CharacterStatusBadge status={character.status} />
              </p>
              <p className={styles.species}>{character.species}</p>
            </div>
          </Link>
          <div className={styles.favorite}>
            <FavoriteButton
              characterId={character.id}
              characterName={character.name}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
