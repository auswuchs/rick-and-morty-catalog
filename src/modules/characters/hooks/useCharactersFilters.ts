import { useSearchParams } from 'react-router'

import { PAGE_PARAM } from '~/hooks/usePageParam'
import { parseCharacterStatus } from '~/modules/characters/services/CharacterFilterParser'
import type { CharactersFilters, SetCharactersFilter } from '~/modules/characters/types'

const FILTER_PARAMS = ['name', 'species', 'status'] as const

export function useCharactersFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: CharactersFilters = {
    name: searchParams.get('name') ?? '',
    species: searchParams.get('species') ?? '',
    status: parseCharacterStatus(searchParams.get('status')),
  }

  const setFilter: SetCharactersFilter = (key, value) => {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous)

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      params.delete(PAGE_PARAM)
      return params
    }, { replace: true })
  }

  function resetFilters() {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous)

      for (const param of [...FILTER_PARAMS, PAGE_PARAM]) {
        params.delete(param)
      }

      return params
    }, { replace: true })
  }

  return [filters, setFilter, resetFilters] as const
}
