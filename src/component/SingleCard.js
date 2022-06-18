import React from 'react'
import '../App.css'

export default function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />
        <img
          src="/images/cover.jpg"
          alt="card back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
