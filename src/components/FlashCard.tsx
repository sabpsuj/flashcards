import { useEffect, useState, useRef } from 'react'
import type { Flashcard } from '../types/Flashcard.type'
import './FlashCard.scss'

type FrashCardProps = {
  topic: string
  flashcard: Flashcard
  onClose: () => void
  rotate: boolean
}

export function FlashCard({ flashcard, onClose, topic, rotate }: FrashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState(rotate ? (Math.random() * 6 + 5) * (Math.random() > 0.5 ? 1 : -1) : 0)
  const transformOrigin = useRef({
    x: Math.floor(Math.random() * (75 - 25 + 1) + 25),
    y: Math.floor(Math.random() * (75 - 25 + 1) + 25)
  })

  useEffect(() => {
    if (!rotate) {
      setRotation(0)
    }
  }, [rotate])
  return (
    <div
      className={`flash-card  ${isFlipped ? "flash-card--flipped": ""} flash-card--topic_${topic}`} 
      style={{ ...(rotate ? {transform: `rotate(${rotation}deg)`} : {} ), transformOrigin: `${transformOrigin.current.x}% ${transformOrigin.current.y}%` }}
    >
      <div className={"flash-card__side flash-card__side--front"}>
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