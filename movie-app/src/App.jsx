import React, { useEffect, useMemo, useState } from 'react'
import { discoverMovies, searchMovies, getImageUrl } from './api/tmdb'
import SearchSortBar from './components/SearchSortBar'
import MovieCard from './components/MovieCard'
import Pagination from './components/Pagination'

const PER_PAGE = 20

export default function App() {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('release_date.desc')

  const sortToDiscover = (val) => {
    switch (val) {
      case 'release_date.desc':
      case 'release_date.asc':
      case 'vote_average.desc':
      case 'vote_average.asc':
        return val
      default:
        return 'release_date.desc'
    }
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    ;(async () => {
      try {
        const data = query
          ? await searchMovies(query, page)
          : await discoverMovies({ page, sortBy: sortToDiscover(sort) })
        if (!active) return
        setMovies(data.results || [])
        setTotalPages(Math.max(1, Math.min(data.total_pages || 1, 500)))
      } catch (e) {
        console.error(e)
        if (active) { setMovies([]); setTotalPages(1) }
      } finally {
        active && setLoading(false)
      }
    })()
    return () => { active = false }
  }, [page, query, sort])

  const headerTitle = useMemo(() => 'Movie Explorer', [])

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <h1>{headerTitle}</h1>
          <SearchSortBar
            query={query}
            onSearch={(t) => { setQuery(t.trim()); setPage(1) }}
            sort={sort}
            onSortChange={(v) => { setSort(v); setPage(1) }}
            showSearchButton={false}
          />
        </div>
      </header>

      <main className="container">
        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <>
            <ul className="grid">
              {movies.map((m) => (
                <li key={m.id}>
                  <MovieCard
                    poster={getImageUrl(m.poster_path)}
                    title={m.title}
                    date={m.release_date}
                    rating={m.vote_average}
                  />
                </li>
              ))}
            </ul>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              onGo={(n) => setPage(n)}
            />
          </>
        )}
      </main>
    </div>
  )
}
