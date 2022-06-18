import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import SingleCard from './component/SingleCard'
const cardImages = [
  { src: '/images/img1.png', matched: false },
  { src: '/images/img2.png', matched: false },
  { src: '/images/img3.png', matched: false },
  { src: '/images/img4.png', matched: false },
  { src: '/images/img5.png', matched: false },
  { src: '/images/img6.png', matched: false },
  { src: '/images/img7.jpg', matched: false },
  { src: '/images/img8.png', matched: false },
  { src: '/images/img9.png', matched: false },
  { src: '/images/img10.png', matched: false },
]

export default function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  //shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compire two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('matched')
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              console.log('matched')
              return { ...card, matched: true }
            } else {
              return card
              console.log('not matched')
            }
          }),
        )
        resetTurn()
      } else {
        console.log('not matched')

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)

  //reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  )
}
