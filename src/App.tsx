import { useEffect, useState } from 'react'
import './App.scss'
import flashcardsService  from './services/flashcards.service'
import { FlashCard } from "./components/FlashCard"
import { Flashcard as FlashCardType } from './types/Flashcard.type'
import { Topic } from './types/Topic.type'

const topicsOptions: { value: Topic, label: string }[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'react', label: 'React' },
  { value: 'ts', label: 'TypeScript' }
]

function App() {
  const [cards, setCards] = useState<FlashCardType[]>([])
  const [removingCard, setRemovingCard] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<Topic>('js')

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
        <h1 className={`app__title app__title-${currentTopic}`}><span className="app__special-letter">F</span>lashcards</h1>
        <select className='app__select' value={currentTopic} onChange={(e) => setCurrentTopic(e.target.value as Topic)}>
          {topicsOptions.map(({value, label}) => (
            <option
              key={value}
              value={value}
            >
              {label}
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
