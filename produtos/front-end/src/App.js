import logo from './logo.svg';
import './App.css';
import Formulario from './Formulário';
import Tabela from './Tabela';
import { useState } from 'react';

function App() {
  const[bntCadastrar, setBntCadastrar] = useState(true);
  return (
    <div>
      <Formulario botao = {bntCadastrar}/>
      <Tabela/>
    </div>
  );
}

export default App;
