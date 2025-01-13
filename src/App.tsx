import { useEffect, useState } from 'react'
import './App.scss'
import flashcardsService  from './services/flashcards.service'
import { FlashCard } from "./components/FlashCard"
import { Flashcard as FlashCardType } from './types/Flashcard.type'
import { Topic } from './types/Topic.type'

function App() {
  const [cards, setCards] = useState<FlashCardType[]>([])
  const [removingCard, setRemovingCard] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<Topic>('js')
  const topics: Topic[] = ['js', 'css', 'ts', 'react']

  useEffect(() => {
    if (!cards.length) {
      setCards(flashcardsService.getRandomFlashcards(currentTopic, 5))
    }
  }, [cards])

  useEffect(() => {
    console.log('currentTopic', currentTopic)
    setCards(flashcardsService.getRandomFlashcards(currentTopic, 5))
  }, [currentTopic])

  const handleFlashCardClose = () => {
    setRemovingCard(true)
    setTimeout(() => {
      const newCards = [
        ...cards.slice(1),
        ...flashcardsService.getRandomFlashcards(currentTopic, 1),
      ]

      setCards(newCards)
      setRemovingCard(false)
    }, 400)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Flashcards - {currentTopic}</h1>
        <select value={currentTopic} onChange={(e) => setCurrentTopic(e.target.value as Topic)}>
          {topics.map((topic) => (
            <option
              key={topic}
              value={topic}
            >
              {topic}
            </option>
          ))}
        </select>
      </header>
      <main className={`app__cards${removingCard ? " app__cards--removing" : ""}`}>
        {cards.map((card, index) => (
          <FlashCard
            key={card.id}
            flashcard={card}
            onClose={handleFlashCardClose}
            topic={currentTopic}
            rotate={!!index}
          />
        ))}
      </main>
      <footer className="app__footer">
        <p>Made with 🐸 by <a href="https://sabinapsuj.dev/" target="_blank">Sabina Psuj</a></p>
      </footer>
    </div>
  )
}

export default App
