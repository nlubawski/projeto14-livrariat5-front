import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Layout/Header";
import RenderizarLivro from "./RenderizarLivro";

function TelaProdutos() {

    const [produtos, setProdutos] = useState([]);

    const servidor = "http://localhost:5000/products";

    // Rever no live coding como usar o try catch dentro do use effect
    useEffect(() => {
        const promise = axios.get(servidor);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setProdutos(data);
        })
        promise.catch(() => console.log("deu ruim"));
    }, []);

    return (
        <>
            <Header />
            <Container>
                <Section>
                    <h2>Categoria de livro</h2>
                </Section>
                <Books>
                    {produtos.map(produto => {
                        const { titulo, imagem, preco, id, _id } = produto;
                        return (
                            <RenderizarLivro key={id} imagem={imagem}
                                preco={preco} titulo={titulo} id={_id}/>
                        )
                    })}
                </Books>
            </Container>

        </>
    )
}

const Container = styled.div`
    margin-top: 67px;
`
const Section = styled.div`
    width: 374px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;

        h2 {
            font-weight: 400;
            font-size: 24px;
            color: var(--cor-texto);
        }
`
const Books = styled.div`
    width: 374px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

export default TelaProdutos