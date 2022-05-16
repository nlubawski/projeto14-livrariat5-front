import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { useNavigate, Link } from "react-router-dom";
import HeaderProdutos from "../Layout/HeaderProdutos";
import UsuarioContext from "./../Contextos/UsuarioContext"

function TelaCarrinho() {

    dotenv.config();
    const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"
    
    const idLS = localStorage.getItem("id");
    const tokenLS = localStorage.getItem("token");
    const [carrinho, setCarrinho] = useState([]);
    const URL_CARRINHO = `${URL_ENV}/carrinho`;
    const { cliente } = useContext(UsuarioContext);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }
    useEffect(() => {
        const promise = axios.get(URL_CARRINHO, config);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setCarrinho(data);
        })
        promise.catch(() => console.log("deu ruim :/"));
    }, []);
    let total = 0;
    function calcularTotal() {
        carrinho.forEach(livro => total += parseFloat(livro.price))
        total = total.toFixed(2);
        total = total.replace(".", ", ");
        return total;
    }
    async function finalizar() {
        if (carrinho.length === 0) {
            alert("Escolha algum produto antes de prosseguir");
            navigate("/")
        }
        else {
            navigate("/checkout")
        }
    }

    function deletarLivro(id) {
        console.log("Entrei na função de deletar")
        const servidorDelete = `http://localhost:5000/carrinho/${id}`
        const promise = axios.delete(servidorDelete)
        promise.then(response => {
            const { data } = response;
            console.log(data);
            setTimeout(() => window.location.reload(), 100);
        })
        promise.catch(() => console.log("deu ruim em deletar o endereço"));
    }
    return (
        <>
            <HeaderProdutos />
            <Container>
                <Titulo>Seus Produtos! </Titulo>
                {carrinho.map(livro => {
                    const { title, price, author, _id } = livro;
                    return (
                        <div key={_id}>
                            <Books>
                                <Autor>
                                    <h1>{title}</h1>
                                    <h2>{author}</h2>
                                </Autor>
                                <Box>
                                    <h1>{price}</h1>
                                    <IconDelete onClick={() => deletarLivro(_id)}>
                                        <ion-icon name="close-circle" ></ion-icon>
                                    </IconDelete>
                                </Box>
                            </Books>
                        </div>
                    )
                })
                }
                <Total>
                    <h2>Total: R$ <span>{calcularTotal()}</span></h2>
                </Total>
                <Finalizar onClick={() => finalizar()}>Finalizar Pedido</Finalizar>
                <NavLink to="/">
                    <EscolherMais>Escolher mais livros</EscolherMais>
                </NavLink>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    margin-top: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Titulo = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
`
const Total = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
        h2 {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 20px;
        }
        span{
            font-weight: bold;
        }
`
const Books = styled.div`
    width: 85vw;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-family: 'Roboto', sans-serif;
`
const Autor = styled.div`
    width: 85vw;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 14px;
    flex-direction: column;
    h1{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 15px;
    }
    h2{
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        font-size: 14px;
    }
`
const Finalizar = styled.button`
    height: 45px;
    width: 303px;
    background-color: #FF6C00;
    border: 1px solid #FF8C00;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #fff;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EscolherMais = styled.button`
    height: 25px;
    width: 203px;
    background-color: #FF6C00;
    border: 1px solid #FF8C00;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #fff;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavLink = styled(Link)`
    text-decoration: none;
`;
const IconDelete = styled.button`
    font-size: 22px;
    background-color: none;
    border: 0;
    color: #ff1100;
    background-color: white;
    `
const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40px;
    h1{
        font-weight:bold;
    }
`

export default TelaCarrinho