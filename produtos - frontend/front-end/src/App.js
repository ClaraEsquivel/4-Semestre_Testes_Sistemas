import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulário';
import Tabela from './Tabela';

function App() {

  //Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    marca: ""
  }

  //UseState
  const[btnCadastrar, setBtnCadastrar] = useState(true);
  const[produtos, setProduto] = useState([])
  const[objProduto, setObjProduto] = useState(produto);

  
  //UseEfect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno=>retorno.json())
    .then(retorno_convertido=>setProduto(retorno_convertido));
    
  }, []);
  

  //Obtendo dados do formulário
  const aoDigitar = (e)=>{
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //cadastrar Produto
  const cadastrar = () =>{
    fetch("http://localhost:8080/cadastrar",{
      method:"post",
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !==undefined){
        alert(retorno_convertido.mensagem);
      } else{
        setProduto([...produtos, retorno_convertido]);
        alert("Produto cadastrado com sucesso")
        limparFormulario();
      }
      
    })
  }

  //Limpar Formulário
  const limparFormulario = ()=>{
    setObjProduto(produto);
  }


  //Selecionar Produto
  const selecionarProduto =(indice) =>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(true);
  }

  //Remover Produto
  const remover = ()=> {
    fetch("http://localhost:8080/remover/"+objProduto.codigo,{
      method:"delete",

      headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
      }
    })
    .then(retorno =>retorno.json)
    .then(retorno_convertido=>{

      //mensagem
      alert(retorno_convertido.mensagem);

      //cópia do vetor produtos
      let vetorTemp = [...produtos];

      //indice
      let indice = vetorTemp.findIndex((p)=>{
        return p.codigo===objProduto.codigo;
      });

      //remover produto do vetor
      vetorTemp.slice(indice, 1);

      //atualizar o vetor de produtos
      setProduto(vetorTemp);

      //limpar formulário
      limparFormulario();
    })
  }

  //Alterar Produto
  const alterar = () =>{
    fetch("http://localhost:8080/alterar",{
      method:"put",
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
      }
    })
    .then(retorno =>retorno.json())
    .then(retorno_convertido=>{
      if(retorno_convertido.mensagem !==undefined){
        alert(retorno_convertido.mensagem);
      }else{
        //mensagem
        alert("Produto alterado com sucesso!");

        //cópia do vetor produtos
        let vetorTemp = [...produtos];

        //indice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo===objProduto.codigo;
        });
        //alterar produto do vetor
        vetorTemp[indice] = objProduto;

        //atualizar o vetor de produtos
        setProduto(vetorTemp);

        //limpar formulário
        limparFormulario();
      }
    })

  }

  //Retorno
  return (
    <div>
      <Formulario botao = {btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
  
}

export default App;
