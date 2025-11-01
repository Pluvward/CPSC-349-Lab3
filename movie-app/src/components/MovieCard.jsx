import React from 'react'

export default function MovieCard({ poster, title, date, rating }) {
  const year = date ? new Date(date).getFullYear() : null
  const prettyDate = date || '—'
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : '—'

  return (
    <article className="card">
      <img className="poster" src={poster} alt={`${title} poster`} loading="lazy" />
      <div className="info">
        <h3 className="title">{title}</h3>
        <div className="meta">
          <div>Release Date: {prettyDate}</div>
          <div>Rating: {displayRating}</div>
        </div>
      </div>
    </article>
  )
}
