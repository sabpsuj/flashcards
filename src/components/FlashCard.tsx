import { useState } from 'react'
import type { Flashcard } from '../types/Flashcard.type'
import './FlashCard.scss'

type FrashCardProps = {
  topic: string
  flashcard: Flashcard
  onClose: () => void
}

export function FlashCard({ flashcard, onClose, topic }: FrashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`flash-card  ${isFlipped ? "flash-card--flipped": ""} flash-card--topic_${topic}`}>
      <div className={"flash-card__side flash-card__side--front"}>
        <p>{flashcard.id}</p>
        <p>{flashcard.question}</p>
        <button onClick={() => setIsFlipped(true)}>Flip</button>
      </div>
      <div className="flash-card__side flash-card__side--back">
        <p>{flashcard.answer}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}