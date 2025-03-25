import './App.css'
import Area from './components/Area';
import { xorGate } from "./lib/tests/data";


function App() {
  const activeGate = xorGate;

  return (
      <Area activeGate={activeGate} />
  )
}

export default App
