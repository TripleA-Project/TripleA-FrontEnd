import React from 'react'

export default function ButtonContainer({count, isBookmark}) {
  return (
    <div>
      <button>{isBookmark}</button>
      <button>{count}</button>
    </div>
  )
}
