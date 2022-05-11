import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaProdutos from "./Componentes/TelaProdutos"

function App () {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaProdutos />} />
            </Routes>
        </BrowserRouter>
    </>
    )

}

export default App;