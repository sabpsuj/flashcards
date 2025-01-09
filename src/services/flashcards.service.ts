import type { Flashcard } from '../types/Flashcard.type'
import type { Topic } from '../types/Topic.type'
import jsFlashcards from '../data/js.flashcards.json'

// co tu będzie? 
// będzie przechowywał 10 ostatnich cardów

const flashcards: Record<Topic, Flashcard[]> = {
  js: jsFlashcards,
}

const lastTenCards: Record<Topic, number[]> = {
  js: [],
}

const storeLastTenCards = (topic: Topic, indexes: number[]) => {
  if (indexes.length > 10) {
    throw new Error('Cannot store more than 10 cards')
  }

  if (indexes.length) {
    const availableSpace = 10 - lastTenCards[topic].length

    if (indexes.length > availableSpace) {
      lastTenCards[topic] = [
        ...lastTenCards[topic].slice(indexes.length - availableSpace, indexes.length),
        ...indexes,
      ]
    } else {
      lastTenCards[topic] = [...lastTenCards[topic], ...indexes]
    }
  }
}

const getRandomFlashcard = (topic: Topic): Flashcard => {
  const randomIndex = Math.floor(Math.random() * flashcards[topic].length)

  if (lastTenCards[topic].includes(randomIndex)) {
    return getRandomFlashcard(topic)
  }

  storeLastTenCards(topic, [randomIndex])

  return flashcards[topic][randomIndex]
}

const getRandomFlashcards = (topic: Topic, amount: number): Flashcard[] => {
  const randomFlashcards: Flashcard[] = []

  for (let i = 0; i < amount; i++) {
    randomFlashcards.push(getRandomFlashcard(topic))
  }

  return randomFlashcards
}

export default {
  getRandomFlashcards,
}
