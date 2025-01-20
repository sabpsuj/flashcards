import { useEffect, useState, useRef } from 'react'
import type { Flashcard } from '../types/Flashcard.type'
import './FlashCard.scss'
import FlipIcon from '../assets/flip.svg?react';
import CloseIcon from '../assets/close.svg?react';

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
        <p className="flash-card__question">{flashcard.question}</p>
        <button className="flash-card__button" onClick={() => setIsFlipped(true)}><FlipIcon /></button>
      </div>
      <div className="flash-card__side flash-card__side--back">
        <p className="flash-card__answer">{flashcard.answer}</p>
        <button className="flash-card__button" onClick={onClose}><CloseIcon /></button>
      </div>
    </div>
  )
}