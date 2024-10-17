import React, { useState, useEffect } from 'react';
import { mirrorEasing, motion } from 'framer-motion';
import  Card1 from '../assets/card_1.jpeg'; 
import  Card2 from '../assets/card_2.jpeg';
import  Card3 from '../assets/card_3.jpeg';
import  Card4 from '../assets/card_4.jpeg';
import  Card5 from '../assets/card_5.jpeg';
import  Card6 from '../assets/card_6.jpeg';
import  Card7 from '../assets/card_7.jpeg';
import  Card8 from '../assets/card_8.jpeg';
import  Card9 from '../assets/card_9.jpeg';
import  Card10 from '../assets/card_10.jpeg';
import  Card11 from '../assets/card_11.jpeg';
import  Card12 from '../assets/card_12.jpeg';
import  Card13 from '../assets/card_13.jpeg';
import  Card14 from '../assets/card_14.jpeg';
import  Card15 from '../assets/card_15.jpeg';
import  Card16 from '../assets/card_16.jpeg';
import  Card17 from '../assets/card_17.jpeg';
import  Card18 from '../assets/card_18.jpeg';

const cardImagesDisponiveis = [Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card8, Card9, Card10, Card11, Card12, Card13, Card14, Card15, Card16, Card17, Card18]


const getRandomElements = (arr, count) => {
  if (count > arr.length) {
      throw new Error("O número de elementos solicitados é maior do que o tamanho do array.");
  }
  
  const shuffledArray = arr.sort(() => 0.5 - Math.random()); // Embaralha o array
  return shuffledArray.slice(0, count); // Retorna os primeiros 6 elementos
}
const getImages2Play = () => {
  const randomCardImages = getRandomElements(cardImagesDisponiveis, 6);
  return randomCardImages.concat(randomCardImages);
}


const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [players, setPlayers] = useState([{ name: 'Doramiga 1', score: 0 }, { name: 'Doramiga 2', score: 0 }]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    setCards(shuffleCards(getImages2Play()));
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
    setCards(shuffleCards(getImages2Play()));
    setFlippedCards([]);
    setMatchedCards([]);
    setGameEnded(false);
    setPlayers(players.map(player => ({ ...player, score: 0 })));
    setCurrentPlayerIndex(0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '0 auto' }}>
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
              {isFlipped ? (
                <span style={{ borderRadius: '8px', display: 'block', width:'100%', height: '100%', backgroundImage:`url(${card})`,  backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></span>
              ) : (
                <span style={{ fontSize: '24px', color: '#fff' }}>❓</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
