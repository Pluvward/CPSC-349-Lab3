import React, { useEffect, useRef, useState } from 'react'

export default function SearchSortBar({
  query,
  onSearch,
  sort,
  onSortChange,
  showSearchButton = false
}) {
  const [text, setText] = useState(query || '')
  const inputRef = useRef(null)
  useEffect(() => { setText(query || '') }, [query])

  const submit = (e) => {
    e.preventDefault()
    onSearch(text)
  }

  return (
    <form className="bar" onSubmit={submit} role="search">
      <input
        ref={inputRef}
        className="input"
        type="search"
        placeholder="Search for a movie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Search movies"
      />
      <select
        className="select"
        aria-label="Sort By"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="release_date.desc">Sort By</option>
        <option value="release_date.desc">Release Date (Newest)</option>
        <option value="release_date.asc">Release Date (Oldest)</option>
        <option value="vote_average.desc">Rating (High → Low)</option>
        <option value="vote_average.asc">Rating (Low → High)</option>
      </select>
      {showSearchButton && <button className="btn">Search</button>}
    </form>
  )
}
