import GlobalStyle from "./../globalStyles"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaCadastro from './TelaCadastro'
import TelaProdutos from './TelaProdutos/'
import TelaLivro from "./TelaLivro"
import TelaCarrinho from "./TelaCarrinho"
import UsuarioContext from "./Contextos/UsuarioContext"

function App(){

    return (
        <>
        <GlobalStyle />
        <UsuarioContext.Provider  value={{}} >
        <BrowserRouter>
        <Routes>
            <Route path='/cadastro' element={<TelaCadastro />} />
            <Route path='/' element={<TelaProdutos />} />
            <Route path="/products/:livroId" element={<TelaLivro />} />
            <Route path='/carrinho' element={<TelaCarrinho />} />
        </Routes>
        </BrowserRouter>
        </UsuarioContext.Provider>
        </>
    )
}

export default App