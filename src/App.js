import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaProdutos from "./Componentes/TelaProdutos"
import TelaLivro from "./Componentes/TelaLivro"

function App () {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaProdutos />} />
                <Route path="/products/:livroId" element={<TelaLivro />} />
            </Routes>
        </BrowserRouter>
    </>
    )

}

export default App;