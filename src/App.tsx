import { useState } from 'react'
import './App.css'
import flashcardsService  from './services/flashcards.service'

function App() {
  const [cards, setCards] = useState(flashcardsService.getRandomFlashcards('js', 6))
  const [cardFlipped, setCardFlipped] = useState(false)

  const handleButtonClick = () => {
    if (!cardFlipped) {
      setCardFlipped(true)
    } else {
      const newCards = [
        ...cards.slice(1),
        ...flashcardsService.getRandomFlashcards('js', 1),
      ]
      setCards(newCards)
      setCardFlipped(false)
    }
  }

  return (
    <>
      {cards.map((card, index) => (
        <div key={index}>
          {cardFlipped && index === 0 ? (<p>{card.answer}</p> ) : (<h2>{card.question}</h2>)}
          
          {index === 0 && (
            <button onClick={() => handleButtonClick()}>
              {cardFlipped ? 'Next' : 'Flip'}
            </button>
          )}
        </div>
      ))}
    </>
  )
}

export default App
