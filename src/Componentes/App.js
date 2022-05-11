import GlobalStyle from "./../globalStyles"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaCadastro from './TelaCadastro'
import UsuarioContext from "./Contextos/UsuarioContext"

function App(){

    return (
        <>
        <GlobalStyle />
        <UsuarioContext.Provider  value={{}} >
        <BrowserRouter>
        <Routes>
            <Route path='/cadastro' element={<TelaCadastro />} />
        </Routes>
        </BrowserRouter>
        </UsuarioContext.Provider>
        </>
    )
}

export default App