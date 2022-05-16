import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv"
import styled from "styled-components";
import HeaderProdutos from "../Layout/HeaderProdutos";

function TelaLivro() {

  dotenv.config();

  const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"
  
    const idLS = localStorage.getItem("id");

    const tokenLS = localStorage.getItem("token");

    const { livroId } = useParams();
    const [livro, setLivro] = useState([]);
    const [preço, setPreço] = useState();
    const navigate = useNavigate();
    const servidorCarrinho = `${URL_ENV}/carrinho`

    useEffect(() => {
        const promise = axios.get(`${URL_ENV}/products/${livroId}`);
        promise.then((response) => {
            const { data } = response;
            setPreço(data.price.replace(".", ","));
            setLivro(data);
            console.log("Id do livro: ", livroId);

        })
        promise.catch(() => console.log("deu ruim renderizar o livro selecionado"));
    }, []);

    function acionarCarrinho() {
        if (tokenLS === null) {
            alert ("Faça login para continuar com a operação");
            // Será que precisa encaminhar pra essa página?
            navigate("/login");
        }
        else {
            navigate("/carrinho");
            const body = {
                title: livro.title,
                author: livro.author,
                price: livro.price,
                image: livro.image,
                id: idLS
            }
            const promise = axios.post(servidorCarrinho, body);
            promise.then(response => {
                console.log(response);
            })
            promise.catch(() => console.log("deu bom em salvar o livro no carrinho"));
        }
    }

    return (
        <>
            <HeaderProdutos />
            <Container>
                <Subcontainer>
                    <Image src={livro.image}></Image>
                    <div>
                        <h1>{livro.title}</h1>
                        <h2>{livro.author}</h2>
                    </div>

                </Subcontainer>
                <Descricao>{livro.description}</Descricao>
            </Container>
            <Footer>
                <Preco>R${preço}</Preco>
                <Add onClick={() => acionarCarrinho()}>Comprar</Add>
            </Footer>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    margin: 0 25px;
    margin-top: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
        font-size: 20px;
        font-weight: bold;
        margin-top: 12px;
    }
`
const Subcontainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    
    h1 {
        font-size: 35px;
        font-weight: bold;
        margin: 10px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 20px;
    }
    
    h2 {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 17px;
    }
`
const Descricao = styled.div`
    font-size: 12px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 636px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 18px;
`
const Image = styled.img`
    width: 129px;
    height: 193px;
`
const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 25px;
    margin-top: 27px;
    max-width: 636px;
`
const Preco = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 18px;
`
const Add = styled.button`
    width: 75px;
    height: 45px;
    border-radius: 5px;
    background-color: #FF6C00;
    border: 1px solid #FF8C00;
    color: #ffffff;

`
export default TelaLivro;