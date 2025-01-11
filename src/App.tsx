import { useEffect, useState } from 'react'
import './App.scss'
import flashcardsService  from './services/flashcards.service'
import { FlashCard } from "./components/FlashCard"
import { Flashcard as FlashCardType } from './types/Flashcard.type'

function App() {
  const [cards, setCards] = useState<FlashCardType[]>([])
  const [removingCard, setRemovingCard] = useState(false)

  useEffect(() => {
    if (!cards.length) {
      setCards(flashcardsService.getRandomFlashcards('js', 5))
    }
  }, [cards])

  const handleFlashCardClose = () => {
    setRemovingCard(true)
    setTimeout(() => {
      const newCards = [
        ...cards.slice(1),
        ...flashcardsService.getRandomFlashcards('js', 1),
      ]

      setCards(newCards)
      setRemovingCard(false)
    }, 400)
  }

  return (
    <div className={`app__cards${removingCard ? " app__cards--removing" : ""}`}>
      {cards.map((card, index) => (
        <FlashCard
          key={card.id}
          flashcard={card}
          onClose={handleFlashCardClose}
          topic="js"
          rotate={!!index}
        />
      ))}
    </div>
  )
}

export default App
