import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoryGame from './components/MemroyGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Jogo da Memória da Itaewon Party</h1>
      <MemoryGame />
    </div>
  );
}

export default App
