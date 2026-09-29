import { useSearchParams } from 'react-router'

export const PAGE_PARAM = 'page'
const FIRST_PAGE = 1

export function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams()

  const parsed = Number(searchParams.get(PAGE_PARAM))
  const page = Number.isInteger(parsed) && parsed >= FIRST_PAGE ? parsed : FIRST_PAGE

  function setPage(next: number) {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous)

      if (next === FIRST_PAGE) {
        params.delete(PAGE_PARAM)
      } else {
        params.set(PAGE_PARAM, String(next))
      }

      return params
    })
  }

  return [page, setPage] as const
}
