import React, { useState, useEffect } from 'react';
import { mirrorEasing, motion } from 'framer-motion';

const cardImages = [
  '🍎', '🍌', '🍉', '🍇', '🍓', '🍒', 
  '🍎', '🍌', '🍉', '🍇', '🍓', '🍒'
];

const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [players, setPlayers] = useState([{ name: 'Doramiga 1', score: 0 }, { name: 'Doramiga 2', score: 0 }]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    setCards(shuffleCards(cardImages));
  }, []);

  const handleCardClick = (index) => {
    if (gameEnded || flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setPlayers((prevPlayers) => {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[currentPlayerIndex].score += 10;
          return updatedPlayers;
        });
      }
      setTimeout(() => {
        setFlippedCards([]);
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      }, 1000);
    }
  };

  const handleRevealAll = () => {
    setFlippedCards([...Array(cards.length).keys()]);
    setGameEnded(true);
  };

  const handleRestartGame = () => {
    setCards(shuffleCards(cardImages));
    setFlippedCards([]);
    setMatchedCards([]);
    setGameEnded(false);
    setPlayers(players.map(player => ({ ...player, score: 0 })));
    setCurrentPlayerIndex(0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Memórias de Itaewon</h2>
      <p>Vez de: <strong>{players[currentPlayerIndex].name}</strong></p>
      <span style={{ fontSize: '3rem'}}>{players[0].score} x {players[1].score}</span>
      <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between',  fontSize: '2.5rem', alignItems: 'center' }}>  
        <span>{players[0].name}</span> <span style={{fontSize: '1rem'}}> vs </span> <span>{players[1].name}</span>          
      </div>
      <div style={{ margin: '10px 0' }}>
        <button onClick={handleRevealAll} disabled={gameEnded} style={{ marginRight: '10px' }}>
          Exibir Todos
        </button>
        <button onClick={handleRestartGame}>
          Reiniciar Jogo
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
          gap: '10px',
          marginTop: '20px',
          justifyContent: 'center'
        }}
      >
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
          return (
            <motion.div
              key={index}
              style={{
                aspectRatio: '2 / 3',
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
