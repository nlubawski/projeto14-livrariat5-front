import {useState} from "react";
import GlobalStyle from "./../globalStyles"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaCadastro from './TelaCadastro'
import TelaLogin from "./TelaLogin"
import TelaProdutos from './TelaProdutos/'
import TelaLivro from "./TelaLivro"
import TelaCarrinho from "./TelaCarrinho"
import UsuarioContext from "./Contextos/UsuarioContext"
import TelaCheckout from "./TelaCheckout";

function App(){
    const [cliente, setCliente] = useState(null);
    return (
        <>
        <GlobalStyle />
        <UsuarioContext.Provider  value={{cliente, setCliente}} >
        <BrowserRouter>
        <Routes>
            <Route path='/cadastro' element={<TelaCadastro />} />
            <Route path='/login' element={<TelaLogin />} />
            <Route path='/' element={<TelaProdutos />} />
            <Route path="/products/:livroId" element={<TelaLivro />} />
            <Route path='/carrinho' element={<TelaCarrinho />} />
            <Route path='/checkout' element={<TelaCheckout />} />

        </Routes>
        </BrowserRouter>
        </UsuarioContext.Provider>
        </>
    )
}

export default App