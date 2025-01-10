import { useEffect, useState } from 'react'
import './App.css'
import flashcardsService  from './services/flashcards.service'
import { FlashCard } from "./components/FlashCard"
import { Flashcard as FlashCardType } from './types/Flashcard.type'

function App() {
  const [cards, setCards] = useState<FlashCardType[]>([])

  useEffect(() => {
    if (!cards.length) {
      setCards(flashcardsService.getRandomFlashcards('js', 5))
    }
  }, [cards])

  const handleFlashCardClose = () => {
    const newCards = [
      ...cards.slice(1),
      ...flashcardsService.getRandomFlashcards('js', 1),
    ]

    setCards(newCards)
  }

  return (
    <div>
      {cards.map((card) => (
        <FlashCard
          key={card.id}
          flashcard={card}
          onClose={handleFlashCardClose}
          topic="js"
        />
      ))}
    </div>
  )
}

export default App
