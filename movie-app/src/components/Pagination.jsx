import React from 'react'

function PageButton({ children, onClick, disabled, current }) {
  return (
    <button
      className={`page-btn${current ? ' current' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-current={current ? 'page' : undefined}
    >
      {children}
    </button>
  )
}

export default function Pagination({ page, totalPages, onPrev, onNext, onGo }) {
  const windowSize = 3
  const start = Math.max(1, page - windowSize)
  const end = Math.min(totalPages, page + windowSize)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageButton onClick={onPrev} disabled={page <= 1}>Previous</PageButton>
      {start > 1 && (
        <>
          <PageButton onClick={() => onGo(1)} current={page === 1}>1</PageButton>
          {start > 2 && <span style={{opacity:.7}}>…</span>}
        </>
      )}
      {pages.map((n) => (
        <PageButton key={n} onClick={() => onGo(n)} current={n === page}>{n}</PageButton>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{opacity:.7}}>…</span>}
          <PageButton onClick={() => onGo(totalPages)} current={page === totalPages}>
            {totalPages}
          </PageButton>
        </>
      )}
      <PageButton onClick={onNext} disabled={page >= totalPages}>Next</PageButton>
    </nav>
  )
}
