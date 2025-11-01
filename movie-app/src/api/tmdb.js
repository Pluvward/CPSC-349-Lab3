const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB error ${res.status}`)
  return res.json()
}

export const discoverMovies = async ({ page = 1, sortBy = 'popularity.desc' } = {}) => {
  const url = `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${encodeURIComponent(
    sortBy
  )}&include_adult=false&include_video=false&page=${page}`
  return fetcher(url)
}

export const searchMovies = async (query, page = 1) => {
  const url = `${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
    query
  )}&include_adult=false&page=${page}`
  return fetcher(url)
}

export const getImageUrl = (path, size = 'w342') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-poster.svg'
