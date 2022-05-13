import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function TelaLivro() {

    const { livroId } = useParams();

    const [livro, setLivro] = useState([]);

    const [preço, setPreço] = useState();

    const navigate = useNavigate();

    const servidorCarrinho = "http://localhost:5000/carrinho"

    useEffect(() => {
        const promise = axios.get(`http://localhost:5000/products/${livroId}`);
        promise.then((response) => {
            const { data } = response;
            setPreço(data.price.replace(".",","));
            setLivro(data);
            console.log("Id do livro: ",livroId);

        })
        promise.catch(() => console.log("deu ruim renderizar o livro selecionado"));
    }, []);

    /* 
    Criar um botão para enviar o produto ao database do carrinho
    Talvez criar um contador para o usuario escolher quantos produtos quer comprar
    */

    function acionarCarrinho () {
        navigate("/carrinho");
        // const informações = {
        //     id: livroId,
        //     quantity: "1"
        // }
        const promise = axios.post(servidorCarrinho, livro);
        promise.then(response => {
            console.log(response);
        })
        promise.catch(() => console.log("deu salvar o livro no carrinho"));
        //  ENVIAR AS INFORMAÇÕES DE COMPRA NO AXIOS POST (_id e a quantidade comprada)
    }

    return (
        <>
            <p>Sou as informações de um livro</p>
            <Container>
                <Subcontainer>
                    <Image src={livro.image}></Image>
                    <div>
                        <h1>{livro.title}</h1>
                        <h2>{livro.author}</h2>
                    </div>
                </Subcontainer>
                <p>{livro.description}</p>
                <Footer>
                    <h3>R${preço}</h3>
                    <Add onClick={() => acionarCarrinho()}>Comprar</Add>
                </Footer>
            </Container>

        </>
    )
}

const Container = styled.div`
    width: 374px;
    margin-left: 25px;
    margin-top: 67px;

    p {
        font-size: 12px;
        text-align: left;    
    }

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
    }
    
    h2 {
        font-size: 15px;
        color: blue;
    }
`

const Image = styled.img`
    width: 129px;
    height: 193px;
`

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`

const Add = styled.button`
    width: 75px;
    height: 45px;
    border-radius: 5px;
`
export default TelaLivro;