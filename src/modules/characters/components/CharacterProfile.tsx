import { CharacterStatusBadge } from '~/modules/characters/components/CharacterStatusBadge'
import { getGenderLabel } from '~/modules/characters/services/CharacterGenderLabels'
import type { CharacterDetails } from '~/modules/characters/types'
import { FavoriteToggle } from '~/modules/favorites/components/FavoriteToggle'

import styles from './CharacterProfile.module.css'

export function CharacterProfile({ character }: { character: CharacterDetails }) {
  const facts = [
    { term: 'Вид', description: character.species },
    { term: 'Пол', description: getGenderLabel(character.gender) },
    { term: 'Родом из', description: character.origin },
    { term: 'Последняя локация', description: character.location },
    { term: 'Эпизодов', description: String(character.episodesCount) },
  ]

  return (
    <article className={styles.profile}>
      <img
        className={styles.image}
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
      <div className={styles.info}>
        <h1 className={styles.name}>{character.name}</h1>
        <p className={styles.status}>
          <CharacterStatusBadge status={character.status} />
        </p>

        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div
              key={fact.term}
              className={styles.fact}
            >
              <dt className={styles.term}>{fact.term}</dt>
              <dd className={styles.description}>{fact.description}</dd>
            </div>
          ))}
        </dl>
        <FavoriteToggle characterId={character.id} />
      </div>
    </article>
  )
}
