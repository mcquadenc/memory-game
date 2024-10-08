import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cardImages = [
  '🍎', '🍌', '🍉', '🍇', '🍓', '🍒', 
  '🍎', '🍌', '🍉', '🍇', '🍓', '🍒'
];

const shuffleCards = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  // Carregar a pontuação do localStorage ao iniciar o jogo
  useEffect(() => {
    const storedScore = localStorage.getItem('memoryGameScore');
    setScore(storedScore ? parseInt(storedScore) : 0);
    setCards(shuffleCards(cardImages));
  }, []);

  useEffect(() => {
    localStorage.setItem('memoryGameScore', score);
  }, [score]);

  const handleCardClick = (index) => {
    if (gameEnded || flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setScore((prevScore) => prevScore + 10);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const handleRevealAll = () => {
    setFlippedCards([...Array(cards.length).keys()]); // Revela todos os cards
    setGameEnded(true);
  };

  const handleRestartGame = () => {
    setCards(shuffleCards(cardImages));
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setGameEnded(false);
    localStorage.setItem('memoryGameScore', 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pontuação: {score}</h2>
      <div style={{ margin: '10px 0' }}>
        <button onClick={handleRevealAll} disabled={gameEnded} style={{ marginRight: '10px' }}>
          Exibir Todos
        </button>
        <button onClick={handleRestartGame}>
          Reiniciar Jogo
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px', marginTop: '20px' }}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
          return (
            <motion.div
              key={index}
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                backgroundColor: isFlipped ? '#fff' : '#333',
                color: isFlipped ? '#000' : '#333',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => handleCardClick(index)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isFlipped ? card : '❓'}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
